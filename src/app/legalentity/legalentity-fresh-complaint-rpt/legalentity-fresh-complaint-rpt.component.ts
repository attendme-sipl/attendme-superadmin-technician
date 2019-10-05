import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { LegalentityLogin } from '../model/legalentity-login';
import { Router } from '@angular/router';
import { LegalentityComplaintsService ,complaintsBodyInterface} from '../services/legalentity-complaints.service';
import { LegalentityBranch } from '../model/legalentity-branch';
import { LegalentityModule } from '../legalentity.module';
import { ToastrService, Toast } from 'ngx-toastr';
import {MatPaginator, MatTableDataSource, MatSort, MatDialog} from '@angular/material';
import * as moment from 'moment';
import { LegalentityBranchService } from '../services/legalentity-branch.service';
import { LegalentityIndivComplaintRptComponent } from '../legalentity-rpt/legalentity-indiv-complaint-rpt/legalentity-indiv-complaint-rpt.component';
import { IComplaintIdStruct, IAssingTechnicianDialogData } from '../legalentity-rpt/legalentity-open-complaint-rpt/legalentity-open-complaint-rpt.component';
import { LegalentityAssignTechnicianComponent } from '../legalentity-assign-technician/legalentity-assign-technician.component';
import { IConfirmAlertStruct, LegalentityConfirmAlertComponent } from '../legalentity-confirm-alert/legalentity-confirm-alert.component';

export interface IfreshComplaint {
  complaintId: number,
  complaintNumber: string,
  complaintOpenDateTime: string,
  equipmentName: string,
  equipmentModel: string,
  equipmentSerial: string
}

@Component({
  selector: 'app-legalentity-fresh-complaint-rpt',
  templateUrl: './legalentity-fresh-complaint-rpt.component.html',
  styleUrls: ['./legalentity-fresh-complaint-rpt.component.css']
})
export class LegalentityFreshComplaintRptComponent implements OnInit {
 
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort

  legalEntityId:number;
  branchId:number;
  legalEntityMenuPrefObj:string[];

  complaintMenuName:string;
  equipmentMenuName:string;
  technicianMenuName:string;

  currentLoginDateTime:string;
  lastLoginDateTime:string;

  enableProgressBar:boolean;

  complaintListArr:IfreshComplaint[];

  complaintStage: number;

 // complaintRecordCount:number;

  complaintRecordCount:number;
  pageSize:number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  dataSource;
  
  displayedColumns:string[] = [
    'srNo',
    'complaintNumber',
    'equipmentName',
    'equipmentModel',
    'equipmentSerial',
    'complaintOpenDateTime',
    'complaintId'
  ];


  constructor(private util:UtilServicesService,
    private legalEntityModel:LegalentityLogin,
    private router:Router,
    private complaintService:LegalentityComplaintsService,
    private legalEntityBranchModel:LegalentityBranch,
    private toast:ToastrService,
    private dialog: MatDialog) {
     }

     popFreshComplaintGrid()
     {

      this.enableProgressBar = true;

      const complaintsBodyData:complaintsBodyInterface = {
        allBranchRecords:true,
        branchId:this.branchId,
        complaintStatus:["open"],
        currentLoginDateTime: this.legalEntityModel.currentLoginDateTime,
        lastLoginDateTime: this.legalEntityModel.lastUpdateDateTime,
        legalEntityId:this.legalEntityId
      };

      this.complaintService.getFreshComplaints(complaintsBodyData)
      .subscribe(data => {
         
        if (data['errorOccured'] == true)
        {
          this.toast.error("Something went wrong while loading " + this.complaintMenuName + " list","");
          this.enableProgressBar = false;
          return false;
        }

        this.complaintListArr = data['complaintList']

        this.dataSource = new MatTableDataSource(this.complaintListArr);

        this.complaintRecordCount = this.complaintListArr.length;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.enableProgressBar = false;
        
      }, error => {
        this.enableProgressBar =false;
        this.toast.error("Something went wrong while loading " + this.complaintMenuName + " list","");
      });

       
     }
     

  ngOnInit() {
  

    if (localStorage.getItem("legalEntityUser") != null)
    {
      this.legalEntityModel = JSON.parse(localStorage.getItem("legalEntityUser"));

      this.legalEntityId = this.legalEntityModel.legalEntityId

      if (localStorage.getItem("legalEntityBranch") != null)
      {
        this.legalEntityBranchModel = JSON.parse(localStorage.getItem("legalEntityBranch"));

        this.branchId = this.legalEntityBranchModel.branchId;

        this.complaintStage = this.legalEntityBranchModel.complaintStageCount;
      }
    }
    else{
      this.router.navigate(['/legalentity/login']);
    }
    
    this.legalEntityMenuPrefObj = JSON.parse(localStorage.getItem("leMenuPreference"));
      // console.log(this.legalEntityMenuPrefObj);
    const menuName = this.legalEntityMenuPrefObj.map((value,index) => value? {
      menuName: value['menuName'],
      ngModelPropName: value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == "complaints" );

    const EquptMenuNameObj = this.legalEntityMenuPrefObj.map((value,index) => value? {
      menuName:value['menuName'],
      ngModelPropName:value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == "equipment");

    const technicianMenuNameObj = this.legalEntityMenuPrefObj.map((value,index) => value? {
      menuName:value['menuName'],
      ngModelPropName:value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == "technician");

    this.complaintMenuName = (menuName.length != 0)? menuName[0]['menuName']:'';
    this.equipmentMenuName = (EquptMenuNameObj.length != 0)? EquptMenuNameObj[0]['menuName']:'';
    this.technicianMenuName = (technicianMenuNameObj.length!= 0)? technicianMenuNameObj[0]['menuName']:'';

    this.util.setTitle("Legal Entity - " + this.complaintMenuName + " | Attendme");

   this.popFreshComplaintGrid();

  }

  openComplaintDetailsDialog(complaintId: number): void {

    const freshComplaintResponseObj = this.complaintListArr.map((value,index) => value? {
      complaintId: value['complaintId'],
      complaintNumber: value['complaintNumber']
    }: null)
    .filter(value => value.complaintId == complaintId);

    let complaintNumber:string = freshComplaintResponseObj[0]['complaintNumber'];

    const complaintDialogReqObj: IComplaintIdStruct = {
      complaintId: complaintId,
      complaintMenuName: this.complaintMenuName,
      complaintNumber: complaintNumber,
      equipmentMenuName: this.equipmentMenuName,
      errorOccured: false,
      technicianMenuName: this.technicianMenuName
    };

    const complaintDetailsDialogRef = this.dialog.open(LegalentityIndivComplaintRptComponent, {
      data: complaintDialogReqObj
    });

    complaintDetailsDialogRef.afterClosed().subscribe(result => {

      if (result['errorOccured'])
      {
        this.toast.error("Something went worg while loading " + this.complaintMenuName + " details");
        return false;
      }

    });

  }

  openAssingComplaintDialog(complaintId: number):void {

    const complaintNumberObj = this.complaintListArr.map((value,index) => value? {
      complaintId: value['complaintId'],
      complaintNumber: value['complaintNumber']
    }: null)
    .filter(value => value.complaintId == complaintId);

    let complaintNumber: string = complaintNumberObj[0]['complaintNumber'];

    const assingComplaintDialogReqObj: IAssingTechnicianDialogData = {
      complaintAssignStatus: true,
      complaintId: complaintId,
      complaintMenuName: this.complaintMenuName,
      complaintNumber: complaintNumber,
      complaintStatus: 'assigned',
      equipmentMenuName: this.equipmentMenuName,
      technicianId: null,
      technicianMenuName: this.technicianMenuName
    };

    const assingTechnicianDialogRef = this.dialog.open(LegalentityAssignTechnicianComponent, {
      data: assingComplaintDialogReqObj,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
   
    assingTechnicianDialogRef.afterClosed().subscribe(result => {

      if (assingComplaintDialogReqObj.technicianId != null)
      {

        const confirmDialogReqObj: IConfirmAlertStruct = {
          alertMessage: 'Are you sure you want to assgin selected ' + this.technicianMenuName + " to " + this.complaintMenuName,
          confirmBit: false
        };

        const confirmDialogRef = this.dialog.open(LegalentityConfirmAlertComponent, {
          data: confirmDialogReqObj,
          panelClass: 'custom-dialog-container'
        });

        confirmDialogRef.afterClosed().subscribe(data => {
         if (confirmDialogReqObj.confirmBit)
         {
           this.enableProgressBar = true;

           this.complaintService.assignTechnicianToComplaint(assingComplaintDialogReqObj)
           .subscribe(data => {

            if(data['errorOccured'])
            {
              this.toast.error("Something went wrong while assingning " + this.technicianMenuName + " to " + this.complaintMenuName);
              this.enableProgressBar = false;
              return false;
            }

           this.toast.success(this.technicianMenuName + " assinged to " + this.complaintMenuName + " successfully"); 
           this.popFreshComplaintGrid();

           this.enableProgressBar =false;

           }, error => {
            this.toast.error("Something went wrong while assingning " + this.technicianMenuName + " to " + this.complaintMenuName);
            this.enableProgressBar = false;
           }) 
         }
        });

      }

    })
  

  }


  applyFilter(filterValue: string)
  {
   /// const dataSource = new MatTableDataSource(this.complaintListArr);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    

  }

  

}
