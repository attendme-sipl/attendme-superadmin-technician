import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { LegalentityLogin } from '../model/legalentity-login';
import { Router, ActivatedRoute } from '@angular/router';
import { LegalentityEquipmentService } from '../services/legalentity-equipment.service';
import { first } from 'rxjs/operators';
import { ToastrService, Toast } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators , AbstractControl} from '@angular/forms';
import { LegalentityBranch } from '../model/legalentity-branch';
import { CountryCallingCode } from 'src/app/model/country-calling-code';
import { LegalEntityAddEquptNewService } from '../services/legal-entity-add-equpt-new.service';
import * as moment from 'moment';

@Component({
  selector: 'app-legalentity-equpt-new',
  templateUrl: './legalentity-equpt-new.component.html',
  styleUrls: ['./legalentity-equpt-new.component.css']
})
export class LegalentityEquptNewComponent implements OnInit {

  legalEntityId:number;
  userId:number;
  equptMenuName: string;
  equptMenuId:number;

  equptForm:FormGroup;
  branchId:number;

  equptId:number;

  equptOwnerId:number;

  callingCodeArr:number[];
  callingCode:number;

  disableBtn:boolean;
  loading:boolean;

  branchName:string;
  branchUserName:string;
  branchMobileNumber:string;
  branchEmailId:string;
  branchUserFullName:string;

  branchUserCountryCallingCode:string;
  branchUserMobileNumber:string;

  equptOwnerContactCallingCode:number;

  monthArr:number[] =[];

 

  constructor(
    private util:UtilServicesService,
    private legalEntityLoginModel:LegalentityLogin,
    private router:Router,
    private activeRoute: ActivatedRoute,
    private equptServiceAPI:LegalentityEquipmentService,
    private toastService:ToastrService,
    private equptFormBuilder:FormBuilder,
    private branchModel:LegalentityBranch,
    private equptserviceAPI:LegalEntityAddEquptNewService
  ) { 

    if (localStorage.getItem('legalEntityUser') != null)
    {
      legalEntityLoginModel = JSON.parse(localStorage.getItem('legalEntityUser'));

      this.legalEntityId = legalEntityLoginModel.legalEntityId;
      this.userId = legalEntityLoginModel.userId;

      this.branchMobileNumber = legalEntityLoginModel.userMobileNumer;
      this.branchEmailId = legalEntityLoginModel.userEmailId;
      this.branchUserFullName = legalEntityLoginModel.userFullName;

      if (localStorage.getItem("legalEntityBranch") != null)
      {
        branchModel = JSON.parse(localStorage.getItem("legalEntityBranch"));
        
        this.branchId = branchModel.branchId;
        this.branchName = branchModel.branchName;
        

      }
    }
    else{
      this.router.navigate(['/legalentity/login']);
    }

  }

    qrIdSelectListValidator(control:AbstractControl)  {
    if (control.value != undefined && control.value != null && control.value !=0 )
    {
      return {"validStatus":true};
    }
    else {return {"validStatus":false}};

  }

  popCountryCallingCode()
     {
      
        this.util.getCountryList()
        .subscribe((data:any) => {
       console.log(data);
        this.callingCodeArr = data;
        this.callingCode =91;
        // console.log(data);
         
        },
      error => {
        this.toastService.error("Something went wrong while loading page","");
      })
     }

  getMenuName(legalEntityId:number,equtpMenuId:number){

    this.equptServiceAPI.getLegalEntityMenuName(legalEntityId,equtpMenuId)
    .pipe(first())
    .subscribe((data:any) => {
       
      this.equptMenuName = data.prefMenuName;

      this.util.setTitle("Legal Entity - " + this.equptMenuName + " | Attendme")
     
    }),
    error => {
      this.toastService.error("Something went wrong while loading page");
    }
   
  }

   qrIdArr:Array<{qrCodeId:number,qrId:number}>;

  popQRId(legalEntityId:number)
    {
      this.equptServiceAPI.getLegalEntityQrId(legalEntityId)
      .pipe(first())
      .subscribe((data:any) => {
        this.qrIdArr = data;
      })
    }

    popBrachWiseQRId(branchId:number)
    {
      this.equptServiceAPI.getBranchWiseQrId(branchId,false,true)
      .subscribe(data => {
        if (data['errorOccured'] == true)
        {
          this.toastService.error("Something went wrong while loading QR Id","");
          return false;
        }
        
        this.qrIdArr = data['qrIdList'];

      }, error => {
        this.toastService.error("Something went wrong while loading QR Id","");
      });
    }

    get serviceProviderForm(){
      return this.equptForm.get('serviceProvider') as FormArray;
    }

    addServiceProvider()
    {
      const serviceProviderData = this.equptFormBuilder.group({
        branchId:[this.branchId],
        serviceProviderName:[],
        contactPersonName:[],
        contactMobile:[],
        contactEmail:[],
        serviceProviderActiveStatus:[true],
        addedByUserId:[this.userId],
        legalEntityId:[this.legalEntityId],
        equptId:[this.equptId],
        countryCallingCode:[91]
       });

       this.serviceProviderForm.push(serviceProviderData);
    }

    deleteServiceProvider(i:number){
      this.serviceProviderForm.removeAt(i);
    }


   get equptOwnerContactForm()
   {
    return this.equptForm.get('ownerContactDetails') as FormArray;
     
   }

   addEquptOwnerContacts(){

    const equptOwnerContactData = this.equptFormBuilder.group({
      addedByUserId: [this.userId], 
   contactActiveStatus: [true],
   contactEmail: [],
    contactMobile: [],
    contactPersonName: [],
    countryCallingCode: [91],
    equptOwnerId: [this.equptOwnerId],
    legalEntityId: [this.legalEntityId]
    
    });

    this.equptOwnerContactForm.push(equptOwnerContactData);
   
   }

   deleteEquptOwnerContact(j:number)
   {
     this.equptOwnerContactForm.removeAt(j);
   }

  //  QrIdSelectListValidator(control: AbstractControl):boolean {

   //}

    
  addEqupt()
  {
    this.disableBtn = true
    this.loading = true;
   


    if (this.equptForm.value.equptDetails.qrCodeId == 0 || this.equptForm.value.equptDetails.qrCodeId == undefined ||this.equptForm.value.equptDetails.qrCodeId == null)
    {
      this.toastService.error("Please select QR code id from the list","");
      this.disableBtn=false;
      this.loading=false;
      return;
    }

   // console.log(this.equptForm.value);
    
 /* if (this.equptForm.value['equptManufDetails']['manufName'] == null)
  {
    this.equptForm.patchValue({
      equptManufDetails:{
        manufName:''
      }
    });
  }

   let equptManufContactMobile = this.equptForm.value['equptManufDetails']['contactMobile'];

   if (equptManufContactMobile == null || equptManufContactMobile == '')
   {
     this.equptForm.patchValue({
      equptManufDetails: {
        countryCallingCode:'',
        contactMobile: ''
      }
     });
   }

   let equptManufContactEmail = this.equptForm.value['equptManufDetails']['contactEmail'];

   if (equptManufContactEmail == '')
   {
    this.equptForm.patchValue({
      equptManufDetails: {
        contactEmail: ''
      }
     });
   }

   */

  this.equptForm.patchValue({
    equptManufDetails: {
      manufName: (this.equptForm.value['equptManufDetails']['manufName'] == '')? null: this.equptForm.value['equptManufDetails']['manufName'],
      contactPersonName: (this.equptForm.value['equptManufDetails']['contactPersonName'] == '')? null: this.equptForm.value['equptManufDetails']['contactPersonName'],
      contactMobile: (this.equptForm.value['equptManufDetails']['contactMobile'] == '')? null: this.equptForm.value['equptManufDetails']['contactMobile'],
      contactEmail: (this.equptForm.value['equptManufDetails']['contactEmail'] == '')? null: this.equptForm.value['equptManufDetails']['contactEmail']
    }
   });

   
    for (let i = 0; i<= this.serviceProviderForm.value.length-1; i++)
     {
      
     // let serviceProviderMobile = this.serviceProviderForm.value[i]['contactMobile'];

      this.serviceProviderForm.at(i).patchValue({
        serviceProviderName: (this.serviceProviderForm.value[i]['serviceProviderName'] == '')? null: this.serviceProviderForm.value[i]['serviceProviderName'],
        contactPersonName: (this.serviceProviderForm.value[i]['contactPersonName'] == '')? null: this.serviceProviderForm.value[i]['contactPersonName'],
        countryCallingCode: (this.serviceProviderForm.value[i]['countryCallingCode'] == '')? null: this.serviceProviderForm.value[i]['countryCallingCode'],
        contactMobile: (this.serviceProviderForm.value[i]['contactMobile'] == '')? null: this.serviceProviderForm.value[i]['contactMobile'],
        contactEmail: (this.serviceProviderForm.value[i]['contactEmail'] == '')? null: this.serviceProviderForm.value[i]['contactEmail']
      });

   /*   if (serviceProviderMobile == null || serviceProviderMobile == '' )
      {
        this.serviceProviderForm.at(i).patchValue({
          countryCallingCode:null,
          contactMobile:null
        });
    
      }

      let serviceProviderEmail = this.serviceProviderForm.value[i]['contactEmail'];

      if (serviceProviderEmail == null || serviceProviderEmail == '')
      {
        this.serviceProviderForm.at(i).patchValue({
          contactEmail:null
        });
      } 
      */
       
     }


     this.equptForm.patchValue({
      equptOwnerDetails: {
        ownerName: (this.equptForm.value['equptOwnerDetails']['ownerName'] == '')? null: this.equptForm.value['equptOwnerDetails']['ownerName'],
        ownerAddress: (this.equptForm.value['equptOwnerDetails']['ownerAddress'] == '')? null: this.equptForm.value['equptOwnerDetails']['ownerAddress']
      }
     });
     

      
     for (let j=0; j<= this.equptOwnerContactForm.value.length -1; j++)
     {
        //let ownerContactMobile = this.equptOwnerContactForm.value[j]['contactMobile'];

        this.equptOwnerContactForm.at(j).patchValue({
          contactPersonName: (this.equptOwnerContactForm.value[j]['contactPersonName'] == '')? null: this.equptOwnerContactForm.value[j]['contactPersonName'],
          countryCallingCode: (this.equptOwnerContactForm.value[j]['countryCallingCode'] == '')? null: this.equptOwnerContactForm.value[j]['countryCallingCode'],
          contactMobile: (this.equptOwnerContactForm.value[j]['contactMobile'] == '')? null: this.equptOwnerContactForm.value[j]['contactMobile'],
          contactEmail: (this.equptOwnerContactForm.value[j]['contactEmail'] == '')? null: this.equptOwnerContactForm.value[j]['contactEmail']
        });

       /* if (ownerContactMobile == null || ownerContactMobile == '')
        {
          this.equptOwnerContactForm.at(j).patchValue({
            countryCallingCode:null,
            contactMobile:null
          });
        }

        let ownerContactEmail = this.equptOwnerContactForm.value[j]['contactEmail'];

        if (ownerContactEmail == null || ownerContactEmail == '')
        {
          this.equptOwnerContactForm.at(j).patchValue({
            contactEmail:null
          });
        } */
     }

     this.equptserviceAPI.addEquipmentAllDetails(this.equptForm.value)
     .pipe(first())
     .subscribe((data => {
    
       if (data.qrIdAlreadyExist == true)
       {
         this.toastService.error("Selected QR Code Id already assinged. Please select another QR Code Id","");
         this.disableBtn=false;
         this.loading=false;
         return;
        }

        if (data.errorOccurred == true)
        {
          this.toastService.error("Something went wrong while adding equipment details","");
          this.disableBtn=false;
          this.loading=false;
          return;    
        }

        if (data.equptAdded == true)
        {
          this.toastService.success( this.equptMenuName +  " added successfully","");
          this.disableBtn=false;
          this.loading=false;
          this.formReset();
          return;
        }
        else{
          this.toastService.error("Something went wrong while adding equipment details","");
          this.disableBtn=false;
          this.loading=false;
          return;
        }
 

        

     }), error => {
      this.toastService.error("Something went wrong while adding equipment details","");
      this.disableBtn=false;
      this.loading=false;
      return;
     }); 
   
     
   //console.log(this.equptForm.value.ownerContactDetails);
  }
  
  formReset()
  {

    let obj = JSON.parse(localStorage.getItem('legalEntityBranch'));
  
    if (obj['branchHeadOffice'] == true)
    {
      this.popQRId(this.legalEntityId);
    }
    else
    {
      this.popBrachWiseQRId(this.branchId);
    }

    this.popQRId(this.legalEntityId);
    
    this.equptForm.reset({
      equptDetails: {
        qrCodeId : 0,
        installMonth:0,
        branchId: this.branchId,
        addedByUserId: this.userId,
        adminApprove: true,
        equptActiveStatus: true,

        equptNameDetails:{

          equptId:this.equptId,
          branchId: this.branchId,
          legalEntityId: this.legalEntityId,
          addedByUserId: this.userId,
          equptNameActiveStatus:true,
          adminApprove: true
        },

        equptModelDetails: {
          equptId: this.equptId,
          branchId: this.branchId,
          legalEntityId: this.legalEntityId,
          addedByUserId: this.userId,
          equptModelActiveStatus: true,
          adminApprove: true
        }
      },

      equptManufDetails: {
        equptId: this.equptId,
        legalEntityId: this.legalEntityId,
        branchId: this.branchId,
        addedByUserId: this.userId,
        manufActiveStatus: true,
        countryCallingCode: 91
      },

      serviceProvider: [
        {
          branchId: this.branchId,
          serviceProviderActiveStatus: true,
          addedByUserId: this.userId,
          legalEntityId: this.legalEntityId,
          equptId: this.equptId,
          countryCallingCode: 91
          
        }
      ],

      equptOwnerDetails: {
        equptId: this.equptId,
        branchId: this.branchId,
        ownerActiveStatus: true,
        addedByUserId: this.userId,
        legalEntityId: this.legalEntityId
      },

      ownerContactDetails:[
        {
          addedByUserId: this.userId, 
   contactActiveStatus: true,
   countryCallingCode: 91,
    equptOwnerId: this.equptOwnerId,
    legalEntityId: this.legalEntityId
        }
      ]
      
    });
    


  }

  monthArrNew:string[];

  ngOnInit() {

    this.equptMenuId = this.activeRoute.snapshot.params['leMenuId'];

    this.getMenuName(this.legalEntityId,this.equptMenuId);

    this.popCountryCallingCode();

   this.monthArrNew = [];

   this.monthArrNew = moment.months();
  
    //console.log(moment.months());
  
    for (let i:number=1;i<=12;i++)
    {
      this.monthArr.push(i);
    }
    
    this.loading = false;
    
    this.equptForm = this.equptFormBuilder.group({
      equptDetails: new FormGroup({
        qrCodeId: new FormControl(0,[this.qrIdSelectListValidator]),
        equptNameDetails: this.equptFormBuilder.group({
          equptId:new FormControl(this.equptId),
          equptName: new FormControl(),
          branchId: new FormControl(this.branchId),
          legalEntityId: new FormControl(this.legalEntityId),
          addedByUserId: new FormControl(this.userId),
          equptNameActiveStatus:new FormControl(true),
          adminApprove: new FormControl(true)
        }),

        equptModelDetails: this.equptFormBuilder.group({
          equptId:new FormControl(this.equptId),
          equptModel:new FormControl(),
          branchId:new FormControl(this.branchId),
          legalEntityId:new FormControl(this.legalEntityId),
          addedByUserId: new FormControl(this.userId),
          equptModelActiveStatus:new FormControl(true),
          adminApprove:new FormControl(true)
        }),

        serialNumber: new FormControl(),
        installMonth: new FormControl(0),
        installYear: new FormControl(),
        equptDesc: new FormControl(),
        branchId: new FormControl(this.branchId),
        addedByUserId: new FormControl(this.userId),
        adminApprove: new FormControl(true),
        equptActiveStatus: new FormControl(true)
      }),

      equptManufDetails: this.equptFormBuilder.group({
        equptId: new FormControl(this.equptId),
        legalEntityId: new FormControl(this.legalEntityId),
        branchId: new FormControl(this.branchId),
        addedByUserId: new FormControl(this.userId),
        manufName: new FormControl(),
        contactPersonName: new FormControl(),
        contactMobile: new FormControl(),
        contactEmail: new FormControl(),
        manufActiveStatus: new FormControl(true),
        countryCallingCode: new FormControl(91)
      }),
      
      serviceProvider: this.equptFormBuilder.array([]),
    
      equptOwnerDetails: this.equptFormBuilder.group({
        equptId: new FormControl(this.equptId),
        branchId: new FormControl(this.branchId),
        ownerName: new FormControl(),
        ownerAddress: new FormControl(),
        ownerActiveStatus: new FormControl(true),
        addedByUserId: new FormControl(this.userId),
        legalEntityId: new FormControl(this.legalEntityId)

      }),

      ownerContactDetails: this.equptFormBuilder.array([])
       
    })

    this.addServiceProvider();


    let branchUserMobileArr:string[];

    branchUserMobileArr = this.branchMobileNumber.split("-");
    
    this.branchUserCountryCallingCode = branchUserMobileArr[0];
    this.branchMobileNumber = branchUserMobileArr[1];

    this.equptForm.controls['serviceProvider'].patchValue(
      [
        {
          serviceProviderName:this.branchName,
          contactPersonName:this.branchUserFullName,
          countryCallingCode:this.branchUserCountryCallingCode,
          contactMobile:this.branchMobileNumber,
          contactEmail:this.branchEmailId
        }
      ]
      );

    this.addEquptOwnerContacts();

    //this.popQRId(this.legalEntityId);

    let obj = JSON.parse(localStorage.getItem('legalEntityBranch'));

    if (obj['branchHeadOffice'] == true)
    {
      this.popQRId(this.legalEntityId);
    }
    else
    {
      this.popBrachWiseQRId(this.branchId);
    }

    
  }

}
