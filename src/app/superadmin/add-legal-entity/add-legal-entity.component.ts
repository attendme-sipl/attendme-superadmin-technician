import { Component, OnInit, SimpleChange } from '@angular/core';
import { SALoginModel } from '../superadmin-login/salogin-model';
import { UtilServicesService } from '../../util-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LegalEntity } from '../model/legal-entity';
import { AddLegalentityService } from '../services/add-legalentity.service';
import { first } from 'rxjs/operators';
import { NgModel, FormsModule, NgForm, FormGroup , FormBuilder, Validators,FormControl,NgControl} from '@angular/forms';
import { DatePipe, formatDate } from '@angular/common';
import {NgbDatepicker, NgbCalendar, NgbDateStruct, NgbDatepickerConfig} from '@ng-bootstrap/ng-bootstrap'
import { format } from 'url';
import * as moment from 'moment';
import {OrderPipe } from 'ngx-order-pipe'


@Component({
  selector: 'app-add-legal-entity',
  templateUrl: './add-legal-entity.component.html',
  styleUrls: ['./add-legal-entity.component.css']
})



export class AddLegalEntityComponent implements OnInit {

  userNm:string;
  user:SALoginModel;


  comptStages = 0;
  countryCode =91;
  subscriptionType=0;

  loading:boolean=false;
  btnDisable:boolean=false;

  subsStartDate:NgbDateStruct ;
  subsEndDate:NgbDateStruct;

  LeName:string;
  LeType:string;
  LeRbBrachQty:string;
  LeRbQRQty:number;
  LeAdminNm:string;
  LeAdminMobile:string;
  LeEmailId:string;
  unreslovedDaysCount: number;

  model:any={};
  
   MY_DATA =[
    {placeholder:'Equipment',name:'equptNm', modelPropName:'equptNm', ngModelProp:'equptModel'},
    {placeholder:'Branch',name:'branchNm', modelPropName:'branchNm', ngModelProp:'branchModel'},
    {placeholder:'Technician',name:'techNm', modelPropName:'techNm', ngModelProp:'techModel'}
  ]

  constructor(private router:Router,
    private util:UtilServicesService,
  private legalEntityModel:LegalEntity,
private legalEntityApi:AddLegalentityService,
private DatePipe:DatePipe) {

    util.setTitle("Superadmin - Add legal entity | Attendme");
  

     
    

    if (localStorage.getItem('currentUser') != null)
    {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.userNm= this.user.fullName;
    }
    else
    {
      console.log("in blank");
      this.router.navigate(['/superadmin/login']);
    }
   
    
    
  
   }

   
   complaintStageArr: LegalEntity[];


   getLegalEntityComptStages()
   {
     this.legalEntityApi.getRBComplaintStages()
     .pipe(first())
     .subscribe((data:any) => {
      this.complaintStageArr = data;
       
    },
     error => {
       console.log("error");
     }
    )

   }

   menuParametersArr:LegalEntity[];

   popPreferenceMenuTextFields(){

    this.legalEntityApi.getMenuParameters()
    .pipe(first())
    .subscribe(
      (data:any) =>
      {
        this.menuParametersArr = data;
        //console.log(this.menuParametersArr);
      },

      error => {
        console.log(error);
      }
    )

   }
 
   public UpdateEndDate() {

      let StartDateFormat = new Date(this.subsStartDate.year + "-" + this.subsStartDate.month + "-" + this.subsStartDate.day);

      let StartDate = moment(StartDateFormat.toUTCString());

      let EndDate = moment(StartDate.add(1,"year"));

      let SubsEndDateYear:number = parseInt(EndDate.format('YYYY'));
      let SubsEndDateMonth:number = parseInt(EndDate.format('MM'));
      let SubsEndDateDay:number = parseInt(EndDate.format('DD'));

      this.subsEndDate = {year:SubsEndDateYear,month:SubsEndDateMonth,day:SubsEndDateDay};

    }

    subscriptionTypeArr:LegalEntity[];

    populateSubscriptionTypes()
    {
      this.legalEntityApi.getSubscriptionTypes()
      .pipe(first())
      .subscribe((data:any)=> {
       
        this.subscriptionTypeArr = data;
  
      },
     error => {
       console.log(error);
     }
    )
    }


   getCurrentDate() {
    
  
    this.legalEntityApi.getCurrDate()
    .pipe(first())
    .subscribe((data:any) =>{

         let StartDateStr = moment(data.currentDate);

         let subsStartDateYear:number = parseInt(StartDateStr.format("YYYY")) 
         let subsStartDateMonth:number = parseInt(StartDateStr.format("MM")) 
         let subsStartDateDay:number = parseInt(StartDateStr.format("DD")) 

       this.subsStartDate = {year:subsStartDateYear,month:subsStartDateMonth,day:subsStartDateDay};

        let EndDateStr = StartDateStr.add(1,'year');

        let subsEndDateYear:number = parseInt(EndDateStr.format("YYYY"));
        let subsEndDateMonth:number = parseInt(EndDateStr.format("MM"));
        let subsEndDateDay:number = parseInt(EndDateStr.format("DD"));

        this.subsEndDate = {year:subsEndDateYear,month:subsEndDateMonth,day:subsEndDateDay};

        let now = moment(this.subsEndDate);

        let newEndDateTime:string;
        newEndDateTime = now.year() + "-" + now.month() + "-" + now.date();



        let newEndDateTimeUpdate = moment();
       
        newEndDateTimeUpdate.year(now.year());
        newEndDateTimeUpdate.month(now.month());
        newEndDateTimeUpdate.day(now.day());
        newEndDateTimeUpdate.hour(0);
        newEndDateTimeUpdate.minute(0);
        newEndDateTimeUpdate.second(1);
       
       

      //  console.log(newEndDateTimeUpdate.format());

    },
    error => {
      console.log(error);
    }
  

  )


   }


    //menuItemArr:Array<{menuId:number,userDefMenuNm:string}> = [];
    menuItemArr:Array<listOfMenu> = [];
    subsArr:Array<legalEntitySubscription>=[];

   // empList: Array<{name: string, empoloyeeID: number}> = []; 

   alertClass:string;
   alertMessage:string;

   dispErrorDiv:boolean=false;

   AddLegalEntity(LegalEntitForm:NgForm):void
   {

   // console.log(this.menuParametersArr);

    if (LegalEntitForm.invalid)
  {
    return;
  }

  this.btnDisable=true;

  this.dispErrorDiv = false;

  this.loading = true;

    this.menuItemArr =[];

    this.menuParametersArr.forEach(element=>{

     // console.log(LegalEntitForm.value);

      let menuPramNm:string = LegalEntitForm.value[element['ngModelPropName']]; //element['menuParamName'];
     let MenuParamId:number = element['menuParamId'];

     this.menuItemArr.push({menuId:MenuParamId,userDefMenuNm:menuPramNm});

    });

    let legalEntityRbComptStageId:number = LegalEntitForm.value.comptStages;
    let legalEntityNm:string = LegalEntitForm.value.LeName;
    let legalEntityAdminMobile:string =  LegalEntitForm.value.LeAdminMobile;     
    let legalEntityAdminName:string = LegalEntitForm.value.LeAdminNm;    
    let legalEntityAdminEmail:string = LegalEntitForm.value.LeEmailId;
    let legalEntityRbBranchQty:number = LegalEntitForm.value.LeRbBrachQty;
    let legalEntityRbQRQty:number = LegalEntitForm.value.LeRbQRQty;
    let legalEntityType:string = LegalEntitForm.value.LeType;
    let legalEntityAdminTelCode:string = LegalEntitForm.value.countryCode;

    let SubscriptionId:number = LegalEntitForm.value.subscriptionType;

    let subsStartDateEntered = new Date(this.subsStartDate.year + "-" + this.subsStartDate.month + "-" + this.subsStartDate.day + " 00:00:01");

  
  let subsStartDateMoment = moment(subsStartDateEntered);

  let subsEndDateEntered = new Date(this.subsEndDate.year + "-" + this.subsEndDate.month + "-" + this.subsEndDate.day + " 23:59:59");

  
  let subsEndDateMoment = moment(subsEndDateEntered);

  this.subsArr =[];

  console.log(LegalEntitForm.value);
  
  this.subsArr.push({subsId:SubscriptionId,startDate:subsEndDateMoment.format(),endDate:subsEndDateMoment.format()})

     this.legalEntityApi.AddLegalEntityService(
        legalEntityNm,
      legalEntityAdminMobile,
      legalEntityAdminName,
      legalEntityAdminEmail,
      legalEntityRbBranchQty,
      legalEntityRbQRQty,
      legalEntityType,
      this.menuItemArr,
      this.subsArr,
      legalEntityAdminTelCode,
      legalEntityRbComptStageId,
      this.unreslovedDaysCount
     )
     .pipe((first()))
     .subscribe( data => {
      this.loading=false;
       console.log(data);

       console.log(data);
       if (data.recordExist == true)
       {
        this.dispErrorDiv = true;
        this.alertClass ="alert alert-danger";
        this.alertMessage="Entered legal entity admin email id already exists";
        this.btnDisable=false;
       }
       else
       {

        if (data.legalEntityCreation == true)
        { 
          this.reset(LegalEntitForm);
          this.dispErrorDiv = true;
          this.alertClass ="alert alert-success";
          this.alertMessage="New legal entity added successfully";
          this.btnDisable=false;
        }
        else{
          this.dispErrorDiv = true;
          this.alertClass ="alert alert-danger";
          this.alertMessage="There was an error, please contact administrator";
          this.btnDisable =false;
        }


       }


     },
    error => {
      console.log(error);
      this.alertClass ="alert alert-danger";
      this.alertMessage="There was an error, please contact administrator";
      this.btnDisable = false;
    })
 
   }


   UpdateMenuPreferenceControl()
   {
   
     let selComptStageId = this.comptStages;
     let techEnableStatus:boolean;

     this.menuParametersArr = new Array;

     this.legalEntityApi.getMenuParameters()
     .subscribe((data:any) =>{
       this.menuParametersArr=data;
       //console.log(this.menuParametersArr);
//console.log(data);

       this.complaintStageArr.forEach(element =>{

        if ( selComptStageId == element['qrCompId'])
        {
          techEnableStatus = element['technicianEnable'];
          
        }
  
        if (techEnableStatus == false)
        {
          //this.menuParametersArr.splice(3,2);
          let updateMenuParamArray: any[];
          updateMenuParamArray = this.menuParametersArr.map((value,index) => value ? {
            menuParamId: value['menuParamId'],
            menuPlaceholder: value['menuPlaceholder'],
            ngModelPropName: value['ngModelPropName']
          } : null)
          .filter(value => value.ngModelPropName != 'technician');

          this.menuParametersArr = updateMenuParamArray;
        }

       
  
       });

     })

    /* this.complaintStageArr.forEach(element =>{

      if ( selComptStageId == element['qrComptId'])
      {
        techEnableStatus = element['technicianEnable'];
        
      }

      if (techEnableStatus == false)
      {
        this.menuParametersArr.splice(3,1);
      }

     }); */
   }

  ngOnInit() {

    
    this.getLegalEntityComptStages();
    this.popPreferenceMenuTextFields();
    this.populateSubscriptionTypes();
    this.getCurrentDate();
  
  }

  reset(legalEntityForm:NgForm){
 
 //    if (legalEntityForm.valid)
   //  {

    this.dispErrorDiv = false;
      legalEntityForm.resetForm({

        comptStages:0,
        countryCode:91,
        subscriptionType:0,
        subsStartDate: {year:2018,month:9,day:22},
        subsEndDate:{year:2019,month:9,day:22}
      });   
     //}

   //  this.getLegalEntityComptStages();
    //this.popPreferenceMenuTextFields();
    //this.populateSubscriptionTypes()
    //this.getCurrentDate();

  }

}

export class listOfMenu {
  menuId:number;
  userDefMenuNm:string;
}

export class legalEntitySubscription
{
  subsId:number;
  startDate:string;
  endDate:string;
}
