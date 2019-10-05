import { Component, OnInit, ViewChild } from '@angular/core';
import { LegalentityLogin } from '../../model/legalentity-login';
import { LegalentityBranch } from '../../model/legalentity-branch';
import { UtilServicesService, IlegalEntityMenuPref } from 'src/app/util-services.service';
import { Router, UrlSerializer } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { LegalentityComplaintsService, ILeadTimeComplaintResponseStruct } from '../../services/legalentity-complaints.service';
import { ToastrService } from 'ngx-toastr';
import { IComplaintIdStruct, IAssingTechnicianDialogData } from '../legalentity-open-complaint-rpt/legalentity-open-complaint-rpt.component';
import { LegalentityIndivComplaintRptComponent } from '../legalentity-indiv-complaint-rpt/legalentity-indiv-complaint-rpt.component';
import { LegalentityAssignTechnicianComponent } from '../../legalentity-assign-technician/legalentity-assign-technician.component';
import { IConfirmAlertStruct, LegalentityConfirmAlertComponent } from '../../legalentity-confirm-alert/legalentity-confirm-alert.component';

export interface IleadComplaintRequestStruct{
   allBranch: boolean,
   branchId: number,
   legalEntityId: number,
   leadTimeDays: number,
   fromDate: string,
   toDate: string
}

@Component({
  selector: 'app-legalentity-leadtime-comp-rpt',
  templateUrl: './legalentity-leadtime-comp-rpt.component.html',
  styleUrls: ['./legalentity-leadtime-comp-rpt.component.css']
})
export class LegalentityLeadtimeCompRptComponent implements OnInit {

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort

  legalEntityId: number;
  userId: number;
  branchId: number;

  equipmentMenuName: string;
  technicianMenuName: string;
  complaintMenuName: string;

  branchHeadOffice: boolean;

  complaintRecordCount:number;
  pageSize:number = 10;
  pageSizeOption:number[] = [5,10,25,50,100];

  dataSource;

  complaintResponse: ILeadTimeComplaintResponseStruct;

  enableProgressBar:boolean;

  displayedColumn:string[] = [
    "srNo",
    "complaintNumber",
    "complaintOpenDateTime",
    "equipmentName",
    "equipmentModel",
    "equipmentSerial",
    "complaintStatus"
  ];

  constructor(
    private legaEntityModel: LegalentityLogin,
    private branchModel: LegalentityBranch,
    private util: UtilServicesService,
    private router: Router,
    private iconRegistry:MatIconRegistry,
    private complaintServiceAPI: LegalentityComplaintsService,
    private dialog: MatDialog,
    private toastService: ToastrService,
    sanitizer:DomSanitizer
  ) { 
    iconRegistry.addSvgIcon(
      "refresh-panel",
    sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg_icons/baseline-refresh-24px.svg'));
  }

  popLegalComplaintGrid(){

    this.enableProgressBar = true;

    let legadComplaintRequestObj: IleadComplaintRequestStruct = {
      allBranch: this.branchHeadOffice,
      branchId: this.branchId,
      fromDate: null,
      toDate: null,
      leadTimeDays: 7,
      legalEntityId: this.legalEntityId
    };
    
    this.complaintServiceAPI.getLeadTimeComplaintRpt(legadComplaintRequestObj)
    .subscribe((data: ILeadTimeComplaintResponseStruct) => {
    
      if (data.errorOccured){
        this.toastService.error("Something went worong while loading lead time " + this.complaintMenuName);
        this.enableProgressBar = false;
        return false; 
      }

      this.complaintRecordCount = data.complaintList.length;
      this.complaintResponse = data;
      this.dataSource = new MatTableDataSource(data.complaintList);
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;

      this.enableProgressBar = false;

    }, error => {
      this.enableProgressBar = false;
      this.toastService.error("Something went worong while loading lead time " + this.complaintMenuName);
    });

  }

  openComplaintDetailsDialog(complaintId: number):void{
    
    const complaintDetailsObject = this.complaintResponse.complaintList.map((value,index) => value? {
      complaintId: value['complaintId'],
      complaintNumber: value['complaintNumber']
    }: null)
    .filter(value => value.complaintId == complaintId);

    let complaintNumber: string = complaintDetailsObject[0]['complaintNumber'];

    let complaintReqStructObj:IComplaintIdStruct ={
      complaintId: complaintId,
      complaintMenuName: this.complaintMenuName,
      complaintNumber: complaintNumber,
      equipmentMenuName: this.equipmentMenuName,
      errorOccured: false,
      technicianMenuName: this.technicianMenuName
    };

    let complaintDetailsDialog = this.dialog.open(LegalentityIndivComplaintRptComponent,{
      data: complaintReqStructObj
    });

    complaintDetailsDialog.afterClosed().subscribe(result => {

      if (result['errorOccured']) {
        this.toastService.error("Something went wrong while loading lead time " + this.complaintMenuName);
        return false;
      }
    });

  }

  openAssingComplaintDialog(complaintId: number):void{

    const complaintNumberObj = this.complaintResponse.complaintList.map((value,index) => value? {
      complaintId: value['complaintId'],
      complaintNumber: value['complaintNumber']
    }: null)
    .filter(value => value.complaintId == complaintId);

    let complaintNumber: string = complaintNumberObj[0]['complaintNumber'];

    let assignComplaintDialogReqObj: IAssingTechnicianDialogData = {
      complaintAssignStatus: true,
      complaintId: complaintId,
      complaintMenuName: this.complaintMenuName,
      complaintNumber: complaintNumber,
      complaintStatus: 'assigned',
      equipmentMenuName: this.equipmentMenuName,
      technicianId: null,
      technicianMenuName: this.technicianMenuName
    };

    const assignTechnicianDialogRef = this.dialog.open(LegalentityAssignTechnicianComponent, {
      data: assignComplaintDialogReqObj,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    assignTechnicianDialogRef.afterClosed().subscribe(result => {

      if (assignComplaintDialogReqObj.technicianId != null)
      {

        let confirmAlertData:IConfirmAlertStruct = {
          alertMessage: "Are you sure you want to asssign " + this.technicianMenuName + " to a " + this.complaintMenuName,
          confirmBit:false
         };
    
         const alertDialogRef = this.dialog.open(LegalentityConfirmAlertComponent,{
          data:confirmAlertData,
          panelClass: 'custom-dialog-container'
        });

        alertDialogRef.afterClosed().subscribe(result => {

          if (confirmAlertData.confirmBit)
          {
            this.enableProgressBar = true;
    
            this.complaintServiceAPI.assignTechnicianToComplaint(assignComplaintDialogReqObj)
            .subscribe(data => {
              if (data['errorOccured'])
              {
                this.enableProgressBar = false;
                this.toastService.error("Something went wrong while assigning " + this.technicianMenuName + " to " + this.complaintMenuName);
                return false;
              }
    
              this.popLegalComplaintGrid();
              this.toastService.success(this.technicianMenuName + " assinged to " + this.complaintMenuName + " successfully");
    
            }, error => {
              this.toastService.error("Something went wrong while assigning " + this.technicianMenuName + " to " + this.complaintMenuName);
              this.enableProgressBar = false;
            })
          }
    
         })

      }

    });

  

  }

  applyFilter(filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  ngOnInit() {

    if (localStorage.getItem('legalEntityUser') != null)
    {
     this.legaEntityModel = JSON.parse(localStorage.getItem('legalEntityUser'));

     this.legalEntityId = this.legaEntityModel.legalEntityId;
     this.userId = this.legaEntityModel.userId;

     if (localStorage.getItem('legalEntityBranch') != null){
      
      this.branchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));

      this.branchId = this.branchModel.branchId;
      this.branchHeadOffice = this.branchModel.branchHeadOffice;

     }
     else {
      this.router.navigate(['/legalentity/login']); 
     }
    }
    else {
      this.router.navigate(['/legalentity/login']);
    }
    

    let legalEntityMenuPref: IlegalEntityMenuPref = {
      menuPrefArray: JSON.parse(localStorage.getItem('leMenuPreference'))
    };

    const equipmentMenuNameObj = legalEntityMenuPref.menuPrefArray.map((value,index) => value? {
      menuName: value['menuName'],
      ngModelPropName: value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == "equipment");

    this.equipmentMenuName = equipmentMenuNameObj[0]['menuName'];

    const technicianMenuNameObj = legalEntityMenuPref.menuPrefArray.map((value,index) => value? {
      menuName: value['menuName'],
      ngModelPropName: value['ngModelPropName']
    }: null)
    .filter((value) => value.ngModelPropName == "technician");

    this.technicianMenuName = technicianMenuNameObj[0]['menuName'];

    const complaintMenuNameObj = legalEntityMenuPref.menuPrefArray.map((value,index) => value? {
      menuName: value['menuName'],
      ngModelPropName: value['ngModelPropName']
    }: null)
    .filter((value) => value.ngModelPropName == "complaints");
 
    this.complaintMenuName = complaintMenuNameObj[0]['menuName'];

    this.util.setTitle("Legal Entity - Lead Time " + this.complaintMenuName + " Report | Attendme");
    
    this.popLegalComplaintGrid();

  }

}
