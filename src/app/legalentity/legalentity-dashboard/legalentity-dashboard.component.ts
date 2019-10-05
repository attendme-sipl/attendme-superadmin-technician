import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from '../../util-services.service';
import { Router } from '@angular/router';
import { LegalentityBranch } from '../model/legalentity-branch';
import { stringify } from '@angular/core/src/util';
import { parse } from 'path';
import {LegalentityQrusage} from '../model/legalentity-qrusage'
import { LegalentityDashboardService , IcomplaintConciseRpt} from '../services/legalentity-dashboard.service';
import { first, map, filter } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { LegalentityModule } from '../legalentity.module';
import { LegalentityLogin } from '../model/legalentity-login';
import { ToastrService, ToastRef } from 'ngx-toastr';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { LegalentityBranchService } from '../services/legalentity-branch.service';


@Component({
  selector: 'app-legalentity-dashboard',
  templateUrl: './legalentity-dashboard.component.html',
  styleUrls: ['./legalentity-dashboard.component.css']
})
export class LegalentityDashboardComponent implements OnInit {

  legalEntityId:number;
  complaintsMenuName:string;
  lastLoginDateTime:string;
  tierLevel:boolean;

  freshComplaintCount:number;
  openComplaintCount:number;
  assignedComplaintCount:number;
  inprogressComplaintCount:number;
  closedComplaintCount:number;
  leadTimeComplaintCount:number;

  complaintConciseProgressBar:boolean;
  QRUsageConciseProgressBar:boolean;
  branchConciseProgressBar: boolean;

  branchMenuName:string;

  totalBranchCount:number;

  enableDiableBranchConciseRpt:boolean;

  branchHeadOffice:boolean;

  constructor(
    private util:UtilServicesService,
    private router:Router,
    public branchModel:LegalentityBranch,
    public qrUsageModel:LegalentityQrusage,
    private dashBoardServiceAPI:LegalentityDashboardService,
    private fb:FormBuilder,
    private legalEntityUserModel: LegalentityLogin,
    private toastService:ToastrService,
    private iconRegistry:MatIconRegistry,
    sanitizer:DomSanitizer,
    private toasterService:ToastrService,
    private legalEntityBranchServiceAPI: LegalentityBranchService
  ) {

   util.setTitle("Legal Entity - Dashboard | Attendme");

    //if(localStorage.getItem('legalEntityUser') != null)
    //{
     
    
      
     // if (localStorage.getItem('legalEntityBranch') != null)
     // {
    //    this.branchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));
//
   //   localStorage.getItem('legalEntityBranch');
      
     // this.lastLoginDateTime = legalEntityUserModel.lastUpdateDateTime;
      
      
    //  }
      
      
   // }
  //  else{
 //     this.router.navigate(['/legalentity/login'])
 //   }

    iconRegistry.addSvgIcon(
      "refresh-panel",
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg_icons/baseline-refresh-24px.svg')
      );

   }

   getQRUsageDetails()
   {
     
   
    this.QRUsageConciseProgressBar = true;

     
     if (this.branchModel.branchHeadOffice == true)
     {
      this.dashBoardServiceAPI.getQRUsageStats(this.legalEntityId)
      .pipe(first())
      .subscribe((data => {
       //console.log(data);
       this.QRUsageConciseProgressBar = false;
       this.qrUsageModel = data;
 
      }),
     error => {
       this.QRUsageConciseProgressBar = false;
       this.toasterService.error("Something went wrong while loading QR ID usage details","");  
     })
 
     }
     else{

      this.QRUsageConciseProgressBar = true;
   
    this.dashBoardServiceAPI.getBranchWiseQRUsage(this.branchModel.branchId)
      .subscribe(data => {
       
        if (data['errorOccured'] == true)
        {
          this.QRUsageConciseProgressBar = false;
          this.toasterService.error("Something went wrong while loading QR ID usage details","");
          return;
        }

        this.qrUsageModel.totalQRIdAlloted = data['qrIdIssuedCount'];
        this.qrUsageModel.totalQRIdAssigned = data['qrIdAssignedCount'];
        this.qrUsageModel.totalPendingQRId = data['qrIdRemaining'];
        
        this.QRUsageConciseProgressBar = false;
       
      }, error => {
        this.toasterService.error("Something went wrong while loading QR ID usage details","");
        this.QRUsageConciseProgressBar = false;
      });

     }
    
      
   

    // this.QRUsageConciseProgressBar = true;
    //console.log(this.legalEntityId);
     
 
  }

  

  popComplaintConciseRpt()
  {

    this.complaintConciseProgressBar = true;

    let complaintRptObj:IcomplaintConciseRpt;

    if (this.branchModel.branchHeadOffice == true)
    {
      complaintRptObj = {
        allBranch:true,
        branchId: this.branchModel.branchId,
        legalEntityId: this.legalEntityId,
        userLastLoginDateTime:this.legalEntityUserModel.lastUpdateDateTime,
        userLoginDateTime: this.legalEntityUserModel.currentLoginDateTime,
        legalTimeDays: 7
      };  
    }
    else{
      complaintRptObj = {
        allBranch:false,
        branchId: this.branchModel.branchId,
        legalEntityId: this.legalEntityId,
        userLastLoginDateTime:this.legalEntityUserModel.lastUpdateDateTime,
        userLoginDateTime: this.legalEntityUserModel.currentLoginDateTime,
        legalTimeDays: 7
      };  
    }


   
    this.dashBoardServiceAPI.getComplaintConciseReport(
     complaintRptObj)
      .pipe(first())
      .subscribe(data => {
        
       if (data['errorOccured'] == true)
       {
         this.complaintConciseProgressBar = false;
         this.toastService.error("Something went wrong while loading" + this.complaintsMenuName + " details.","");
         return false;
       }

       this.freshComplaintCount = data['freshComplaintCount'];

       this.openComplaintCount = (data['openComplaintCount'] != null)?data['openComplaintCount']:0;
       this.assignedComplaintCount = (data['assingedComplaintCount'] != null)?data['assingedComplaintCount']:0;
       this.inprogressComplaintCount = (data['inprogressComplaintCount'] != null)?data['inprogressComplaintCount']:0;
       this.closedComplaintCount = (data['closedComplaintCount'] != null)?data['closedComplaintCount']:0;
       this.leadTimeComplaintCount = (data['leadTimeComplaintCount'] != null)?data['leadTimeComplaintCount']:0;

       this.complaintConciseProgressBar = false;

      }, error => {
        this.complaintConciseProgressBar = false;
        this.toasterService.error("Something went wrong while loading complaint details.","");
      }); 

  }

  popBranchDetails()
  {
    this.branchConciseProgressBar = true;

    this.legalEntityBranchServiceAPI.getTotalBranchCount(this.legalEntityId,true)
    .subscribe(data => {

      if (data['errorOccured'] == true)
      {
        this.toasterService.error("Something went wrong while loading "+ this.branchMenuName + " details.","");
        this.branchConciseProgressBar = false;
        return false;
      }

       this.totalBranchCount = data['branchTotalCount'];
       this.branchConciseProgressBar = false;
    }, error => {
      this.toasterService.error("Something went wrong while loading "+ this.branchMenuName + " details.","");
        this.branchConciseProgressBar = false;
        return false;
    });
  }

  popLegalentityBranchConciseRtp()
  {
    this.legalEntityBranchServiceAPI.getlegalEntityBranchConciseRpt(this.legalEntityId,true)
    .subscribe(data => {
     console.log(data);
    });
  }
  

  ngOnInit() {


    if(localStorage.getItem('legalEntityUser') != null)
    {
     
      this.legalEntityUserModel = JSON.parse(localStorage.getItem('legalEntityUser'));
      
      if (localStorage.getItem('legalEntityBranch') != null)
      {
        this.branchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));

        this.branchHeadOffice = this.branchModel.branchHeadOffice;

    

     // localStorage.getItem('legalEntityBranch');
      
      this.lastLoginDateTime = this.legalEntityUserModel.lastUpdateDateTime;
      
      
      }
      
      
    }
    else{
      this.router.navigate(['/legalentity/login'])
    }
 
    
    this.qrUsageModel = JSON.parse(localStorage.getItem('legalEntityUser'))
    this.legalEntityId = this.qrUsageModel.legalEntityId;

    let obj = JSON.parse(localStorage.getItem('legalEntityBranch'));
   
   // if (obj['branchHeadOffice'] == true)
  //  {
      this.getQRUsageDetails();
   // }
  //  else
   // {
   //   this.popBranchWiseQRUsage(this.branchModel.branchId);
  //  }

    

    this.tierLevel = true;

    this.util.getLegalEntityMenuPreference(this.legalEntityId)
    .pipe(first())
    .subscribe(data => {
     
       
       const techMenuNAme = data.map((value,index) => value? {
         menuName: value['menuName'],
         menuNgPropName: value['ngModelPropName']
       }:null)
      .filter((value) => value.menuNgPropName == 'complaints' );
       

       this.complaintsMenuName = (techMenuNAme.length != 0)? techMenuNAme[0]['menuName']:'';

       const branchMenuNameObj = data.map((value,index) => value? {
        menuName: value['menuName'],
        menuNgPropName: value['ngModelPropName']
       }: null)
       .filter((value) => value.menuNgPropName == 'branch');
       
       this.branchMenuName = (branchMenuNameObj.length != 0)? branchMenuNameObj[0]['menuName']:'';
      
       this.popComplaintConciseRpt();

       //this.popLegalentityBranchConciseRtp();

    
       if (this.branchModel.branchHeadOffice == true)
       {
        this.enableDiableBranchConciseRpt = true;
        this.popBranchDetails();
       }
       else{
         this.enableDiableBranchConciseRpt=false;
       }

       
             
    });



 
  }

  

}
