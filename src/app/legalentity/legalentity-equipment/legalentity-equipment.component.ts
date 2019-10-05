import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from '../../util-services.service';
import { LegalEntity } from '../../superadmin/model/legal-entity';
import { LegalentityLogin } from '../model/legalentity-login';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';
import { LegalentityEquipmentService } from '../services/legalentity-equipment.service';
import {pipe} from 'rxjs'
import {first, subscribeOn} from 'rxjs/operators'
import {NgForm} from '@angular/forms'
import { LegalentityBranch } from '../model/legalentity-branch';
import { LegalentityEquipment } from '../model/legalentity-equipment';
import { LegalentityMainService } from '../services/legalentity-main.service';
import { LegalentityEquipmentName } from '../model/legalentity-equipment-name';
import { LegalentityEquipmentModel } from '../model/legalentity-equipment-model';
import { LegalentityEquipmentManuf } from '../model/legalentity-equipment-manuf';
import { LegalentityEquipmentServiceProvider } from '../model/legalentity-equipment-service-provider';
import { LegalentityEquipmentOwner } from '../model/legalentity-equipment-owner';
import { LegalentityEquipmentOwnerContact } from '../model/legalentity-equipment-owner-contact';

@Component({
  selector: 'app-legalentity-equipment',
  templateUrl: './legalentity-equipment.component.html',
  styleUrls: ['./legalentity-equipment.component.css']
})
export class LegalentityEquipmentComponent implements OnInit {

  
  legalEntityId: number;
  legalEntityMenuId: number;
  legalEntituMenuName:string;
  
  branchId:number;
  userId:number;

  qrIdModel=0;

  errorBit:boolean = false;
  errorMessage:string;

  successBit:boolean =false;
  successMessage:string;

  loading:boolean =false; 
  disableBtn:boolean=false;
  

  constructor(
    private util:UtilServicesService,
    private legalEntityLoginModel:LegalentityLogin,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private equipService:LegalentityEquipmentService,
    public legalEntityBranchModel:LegalentityBranch,
    public legalEntityEquptModel:LegalentityEquipment,
    public legalEntityMainService:LegalentityMainService,
    public legalEntityEquptNameModel:LegalentityEquipmentName,
    public legalEntityEquptModelNm:LegalentityEquipmentModel,
    public legalEntityEquptManufModel:LegalentityEquipmentManuf,
    public legalEntityEquptServiceProviderModel:LegalentityEquipmentServiceProvider,
    public legalEntityEquptOwnerInforModel:LegalentityEquipmentOwner,
    public legalEntityEquptOwnerContactModel:LegalentityEquipmentOwnerContact
  ) { 


    

    if (localStorage.getItem('legalEntityUser') != null)
    {
      legalEntityLoginModel = JSON.parse(localStorage.getItem('legalEntityUser'));
      this.legalEntityId = legalEntityLoginModel.legalEntityId;
   
     // this.legalEntityId = legalEntityLoginModel.legalEntityId;

     this.userId=legalEntityLoginModel.userId;

    

      //if (localStorage.getItem('legalEntityBranch') != null)
     // {

      //  legalEntityBranchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));

     //   this.branchId=legalEntityBranchModel.branchId;
      //  console.log(this.branchId);
    //  }
     

    }
    else
    {
      //console.log("in blank");
      this.router.navigate(['/legalentity/login'])
    }
  }

  getMenuName(legalEntityId:number,legalEntityMenuId:number):void {

    this.equipService.getLegalEntityMenuName(legalEntityId,legalEntityMenuId)
    .pipe(first())
    .subscribe((data:any) =>{

      this.legalEntituMenuName= data.prefMenuName;
    
    });
  

  }

  qrIdArr:QRClass[];

  popQrId(legalEntityId:number)
  {
    this.equipService.getLegalEntityQrId(legalEntityId)
    .pipe(first())
    .subscribe((data:any) =>{
   
      this.qrIdArr = data;
    });
  }

  AddEquptDetails(equptForm:NgForm)
  {

    this.disableBtn=true;
    this.loading=true;

    this.legalEntityEquptModel.branchId = this.branchId;
    this.legalEntityEquptModel.adminApprove = true;
    this.legalEntityEquptModel.equptActiveStatus =true;
    this.legalEntityEquptModel.addedByUserId= this.userId;

    this.legalEntityEquptModel.legalEntityId = this.legalEntityId;

    this.equipService.addEqupt(this.legalEntityEquptModel)
    .pipe(first())
    .subscribe((data) =>{

      
      //this.legalEntityEquptModel = data;

      this.legalEntityEquptModel.equptId = data.equptId;
      this.legalEntityEquptModel.qRIdAlreadyAssigned = data.qRIdAlreadyAssigned;

      if (this.legalEntityEquptModel.qRIdAlreadyAssigned == false)
      {

       
        if (this.legalEntityEquptModel.equptId !=0)
        {    
          
         if (this.legalEntityEquptNameModel.equptName != undefined || this.legalEntityEquptNameModel.equptName != null)
         {
           this.addEquipmentNameDetails(this.legalEntityEquptModel.equptId);
         }

         if (this.legalEntityEquptModelNm.equptModel != undefined || this.legalEntityEquptModelNm.equptModel != null)
         {
           this.addEquipmentModelDetails(this.legalEntityEquptModel.equptId);
         }

         if (
             (this.legalEntityEquptManufModel.manufName != undefined || this.legalEntityEquptManufModel.manufName != null)
              ||
             (this.legalEntityEquptManufModel.contactPersonName != undefined || this.legalEntityEquptManufModel.contactPersonName != null)
              ||
             (this.legalEntityEquptManufModel.contactMobile != undefined || this.legalEntityEquptManufModel.contactMobile != null) 
              ||
              (this.legalEntityEquptManufModel.contactEmail != undefined || this.legalEntityEquptManufModel.contactEmail != null) 
            )
            {
              this.addEquptmentManuf(this.legalEntityEquptModel.equptId);
            }

          if(
            (this.legalEntityEquptServiceProviderModel.serviceProviderName != undefined || this.legalEntityEquptServiceProviderModel.serviceProviderName != null)
            ||
            (this.legalEntityEquptServiceProviderModel.contactPersonName != undefined || this.legalEntityEquptServiceProviderModel.contactPersonName != null)
            ||
            (this.legalEntityEquptServiceProviderModel.contactMobile != undefined || this.legalEntityEquptServiceProviderModel.contactMobile != null)
            ||
            (this.legalEntityEquptServiceProviderModel.contactEmail != undefined || this.legalEntityEquptServiceProviderModel.contactEmail != null)
          ) 
          {
            this.addEquptServiceProviderDetails(this.legalEntityEquptModel.equptId);
          }
          
          
          if (
            (this.legalEntityEquptOwnerInforModel.ownerName != undefined || this.legalEntityEquptOwnerInforModel.ownerName != null)
            ||
            (this.legalEntityEquptOwnerInforModel.ownerAddress != undefined || this.legalEntityEquptOwnerInforModel.ownerAddress != null)
          )
          {
            this.addEquptOwnerInfo(this.legalEntityEquptModel.equptId);
          }
          else
          {

            if(
              (this.legalEntityEquptOwnerContactModel.contactPersonName != undefined || this.legalEntityEquptOwnerContactModel.contactPersonName != null)
              ||
              (this.legalEntityEquptOwnerContactModel.contactMobile != undefined || this.legalEntityEquptOwnerContactModel.contactMobile != null)
              ||
              (this.legalEntityEquptOwnerContactModel.contactEmail != undefined || this.legalEntityEquptOwnerContactModel.contactEmail != null)
            )
            {
              this.addEquptOwnerInfo(this.legalEntityEquptModel.equptId);
            }

          }

          this.resetFunction(equptForm);

        }

        

      }
      else
      {
      this.errorBit=true;
      this.errorMessage = "QR Code Id already assinged. Please select another QR Id";

      this.disableBtn=false;
        this.loading=false;

      }

      this.disableBtn=false;
        this.loading=false;

        this.successBit=true;
        this.successMessage = this.legalEntituMenuName + " added successfully";
    },
  error => {
    this.disableBtn=false;
    this.loading=false;

    this.errorBit=true;
    this.errorMessage = "There was an error !!";
  }
) 

  }

  addEquipmentNameDetails(equptId:number)
  {
    this.legalEntityEquptNameModel.equptId = equptId;
    this.legalEntityEquptNameModel.branchId = this.legalEntityEquptModel.branchId;
    this.legalEntityEquptNameModel.addedByUserId = this.legalEntityEquptModel.addedByUserId;
    this.legalEntityEquptNameModel.equptNameActiveStatus = true;
    this.legalEntityEquptNameModel.adminApprove = true;
    this.legalEntityEquptNameModel.legalEntityId = this.legalEntityId;

    this.equipService.addEquptNameCatalogue(this.legalEntityEquptNameModel)
    .pipe(first())
    .subscribe((data => {
      this.legalEntityEquptNameModel.equptNameAddded = data.equptNameAddded;

    } ) )

  }

  addEquipmentModelDetails(equptId:number)
  {

    this.legalEntityEquptModelNm.equptId = equptId;
    this.legalEntityEquptModelNm.legalEntityId = this.legalEntityId;
    this.legalEntityEquptModelNm.branchId = this.branchId;
    this.legalEntityEquptModelNm.addedByUserId = this.userId;
    this.legalEntityEquptModelNm.equptModelActiveStatus = true;
    this.legalEntityEquptModelNm.adminApprove = false;

    this.equipService.addEquptModelCatalogue(this.legalEntityEquptModelNm)
    .pipe(first())
    .subscribe((data => {

      this.legalEntityEquptModelNm.EquptModelAdded = data.EquptModelAdded;

    }))

  }

  addEquptmentManuf(equptId:number)
  {

    this.legalEntityEquptManufModel.equptId=equptId;
    this.legalEntityEquptManufModel.legalEntityId=this.legalEntityId;
    this.legalEntityEquptManufModel.branchId=this.branchId;
    this.legalEntityEquptManufModel.addedByUserId=this.userId;
    this.legalEntityEquptManufModel.manufActiveStatus=true;

    this.equipService.addEquptManuf(this.legalEntityEquptManufModel)
    .pipe(first())
    .subscribe((data => {
console.log(data);
      this.legalEntityEquptManufModel.manufAdded = data.manufAdded;

    }));

  }

  addEquptServiceProviderDetails(equptId:number)
  {
    this.legalEntityEquptServiceProviderModel.branchId = this.branchId;
    this.legalEntityEquptServiceProviderModel.serviceProviderActiveStatus = true;
    this.legalEntityEquptServiceProviderModel.addedByUserId = this.userId;
    this.legalEntityEquptServiceProviderModel.legalEntityId = this.legalEntityId;
    this.legalEntityEquptServiceProviderModel.equptId = equptId;

    this.equipService.addEquptServiceProvider(this.legalEntityEquptServiceProviderModel)
    .pipe(first())
    .subscribe((data => {
      console.log(data);
      this.legalEntityEquptServiceProviderModel.serviceProviderAdded = data.serviceProviderAdded;
    }))

  }

  addEquptOwnerInfo(equptId:number)
  {
    this.legalEntityEquptOwnerInforModel.equptId=equptId;
    this.legalEntityEquptOwnerInforModel.branchId = this.branchId;
    this.legalEntityEquptOwnerInforModel.ownerActiveStatus=true;
    this.legalEntityEquptOwnerInforModel.addedByUserId=this.userId;
    this.legalEntityEquptOwnerInforModel.legalEntityId=this.legalEntityId;

    this.equipService.addEquptOwnerInfo(this.legalEntityEquptOwnerInforModel)
    .pipe(first())
    .subscribe((data => {

      this.legalEntityEquptOwnerInforModel.equptOwnerAdded = data.equptOwnerAdded;
      this.legalEntityEquptOwnerInforModel.equptOwnerId = data.equptOwnerId;

      if(this.legalEntityEquptOwnerInforModel.equptOwnerId != undefined)
      {

        if(
          (this.legalEntityEquptOwnerContactModel.contactPersonName != undefined || this.legalEntityEquptOwnerContactModel.contactPersonName != null)
          ||
          (this.legalEntityEquptOwnerContactModel.contactMobile != undefined || this.legalEntityEquptOwnerContactModel.contactMobile != null)
          ||
          (this.legalEntityEquptOwnerContactModel.contactEmail != undefined || this.legalEntityEquptOwnerContactModel.contactEmail != null)
        )
        {
          this.addEquptOwnerContactDetails(this.legalEntityEquptOwnerInforModel.equptOwnerId);
        }

      }

      
     

    }))
   

  }


  addEquptOwnerContactDetails(ownerId:number)
  {
    this.legalEntityEquptOwnerContactModel.equptOwnerId = ownerId;
    this.legalEntityEquptOwnerContactModel.contactActiveStatus=true;
    this.legalEntityEquptOwnerContactModel.addedByUserId=this.userId;
    this.legalEntityEquptOwnerContactModel.legalEntityId=this.legalEntityId;

    this.equipService.addEquptOwnerContactInfo(this.legalEntityEquptOwnerContactModel)
    .pipe(first())
    .subscribe((data => {

      this.legalEntityEquptOwnerContactModel.ownerContactAdded = data.ownerContactAdded;
    
    }),error => {
      
    });

  }

  AddEquipment(equipmentForm:NgForm)
  {
    this.errorBit=false;
    this.successBit=false;

    this.errorMessage = '';
    this.successMessage='';

   if (equipmentForm.invalid)
    {
     return;
    }
  
    this.AddEquptDetails(equipmentForm);

   //this.resetFunction(equipmentForm);
   
  }



  ngOnInit() {

    this.getBranchDetails();

    this.legalEntityMenuId = this.activeRoute.snapshot.params['leMenuId'];
    
    this.getMenuName(this.legalEntityId,this.legalEntityMenuId);

    this.util.setTitle("Legal Entity - Add " + this.legalEntituMenuName + " | Attendme");

    this.legalEntityEquptModel.qrCodeId=0;

    this.popQrId(this.legalEntityId);
 
 
  }

  getBranchDetails()
  {
    if (localStorage.getItem('legalEntityBranch') == null)
    {
      this.legalEntityMainService.StoreBranchDetails(this.legalEntityBranchModel)
      .pipe(first())
      .subscribe((data =>{

        this.legalEntityBranchModel = data;

        this.branchId = this.legalEntityBranchModel.branchId;

      }))
    }

    else
    {
      this.legalEntityBranchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));

      this.branchId=this.legalEntityBranchModel.branchId;
    }
  }

  resetFunction(equptForm:NgForm)
  {
    this.errorBit = false;
    this.errorMessage ='';
  
    this.successBit =false;
    this.successMessage='';
  
    this.loading =false; 
    this.disableBtn=false;

    
     this.popQrId(this.legalEntityId);

    

equptForm.reset({
  qrCodeId:0
});
    
//this.legalEntityEquptModel.qrCodeId =0;
    
  }

}



 class QRClass
{
  qrCodeId:number;
  qrId:string;
}
