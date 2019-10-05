import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { Router } from '@angular/router';
import { LegalentityComplaintsService, IComplaintBodyStruct, IComplaintReportStruct } from '../../services/legalentity-complaints.service';
import { LegalentityBranch } from '../../model/legalentity-branch';
import { LegalentityLogin } from '../../model/legalentity-login';
import { parse } from 'querystring';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort , MatIconRegistry} from '@angular/material';
import { LegalentityAssignTechnicianComponent } from '../../legalentity-assign-technician/legalentity-assign-technician.component';
import { IConfirmAlertStruct, LegalentityConfirmAlertComponent } from '../../legalentity-confirm-alert/legalentity-confirm-alert.component';
import { DomSanitizer } from '@angular/platform-browser';
import { LegalentityIndivComplaintRptComponent } from '../legalentity-indiv-complaint-rpt/legalentity-indiv-complaint-rpt.component';
import * as moment from 'moment';
import { first } from 'rxjs/operators';

export interface IAssingTechnicianDialogData{
 complaintId: number,
 complaintStatus: string,
 complaintAssignStatus: boolean,
 complaintMenuName: string,
 technicianMenuName: string,
 equipmentMenuName: string,
 complaintNumber: string,
 technicianId:number
};

export interface IComplaintIdStruct{
  complaintId:number,
  complaintNumber: string,
  equipmentMenuName: string,
  technicianMenuName:string,
  complaintMenuName:string,
  errorOccured: boolean
};


@Component({
  selector: 'app-legalentity-open-complaint-rpt',
  templateUrl: './legalentity-open-complaint-rpt.component.html',
  styleUrls: ['./legalentity-open-complaint-rpt.component.css']
})
export class LegalentityOpenComplaintRptComponent implements OnInit {

  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort

  legalEntityId:number;
  branchId:number;
  userId:number;

  equptMenuName: string;
  technicianMenuName:string;
  complaintMenuName:string;

  legalEntityMenuObj:string[];

  openComplaintDataObj:IComplaintBodyStruct[]; 

  complaintResponse:IComplaintReportStruct[];

  dataSource;

  enableProgressBar:boolean;

  complaintRecordCount:number;
  pageSize:number = 10;
  pageSizeOption:number[] = [5,10,25,50,100];
 
  displayedColumns:string[] =[
    'srNo',
    'complaintNumber',
    'equipmentName',
    'equipmentModel',
    'equipmentSerial',
    'complaintOpenDateTime',
    'assignTechnician'
  ];

  currentDateTime: string;
  testDateTime: string;

  constructor(
    private util:UtilServicesService,
    private router:Router,
    private complaintServices:LegalentityComplaintsService,
    private branchModel:LegalentityBranch,
    private legalEntityUserModel: LegalentityLogin,
    private toastService: ToastrService,
    private dialog:MatDialog,
    private iconRegistry:MatIconRegistry,
    sanitizer:DomSanitizer
  ) { 

    iconRegistry.addSvgIcon(
      "refresh-panel",
    sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg_icons/baseline-refresh-24px.svg'));

  }

  popOpenComplaintsGrid():void
  {

    this.enableProgressBar = true;

    let complaintInitialDataObj:IComplaintBodyStruct ={
      allBranch:true,
      branchId:this.branchId,
      complaintStatus:'open',
      fromDate:null,
      toDate:null,
      legalEntityId: this.legalEntityId
    };


    this.complaintServices.getComplaintsRpt(complaintInitialDataObj)
    .subscribe(data => {
     if (data['errorOccured'] == true)
     {
      this.toastService.error("Something went wrong while loading complaints, please try again later","");
      this.enableProgressBar = false;
      return false;
     }

     this.complaintResponse = data['complaintList'];

     this.complaintRecordCount = this.complaintResponse.length;
     
     this.dataSource = new MatTableDataSource(this.complaintResponse);

     this.dataSource.paginator  = this.paginator;

     this.dataSource.sort = this.sort;

     this.enableProgressBar = false;

     //console.log(this.paginator);

    }, error => {
      this.toastService.error("Something went wrong while loading complaints, please try again later","");
      this.enableProgressBar = false;
    });
    

  }

  applyFilter(filterValue: string)
  {
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openDialog(complaintId: number):void {



    const complaintDetailsResponseObj = this.complaintResponse.map((value,index) => value? {
      complaintId: value['complaintId'],
      complaintNumber: value['complaintNumber']
    }: null)
    .filter((value) => value.complaintId == complaintId);

   
    let complaintNumber: string = complaintDetailsResponseObj[0]['complaintNumber'];

    let complaintDetailsData: IAssingTechnicianDialogData = {
      complaintStatus: 'assigned',
      complaintAssignStatus: true,
      complaintId: complaintId,
      complaintMenuName: this.complaintMenuName,
      equipmentMenuName: this.equptMenuName,
      technicianMenuName: this.technicianMenuName,
      complaintNumber: complaintNumber,
      technicianId:null
    };

    const dialogRef = this.dialog.open(LegalentityAssignTechnicianComponent, {
      data: complaintDetailsData,
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (complaintDetailsData.technicianId  != null)
      {

        let confirmAlertData:IConfirmAlertStruct = {
         alertMessage: "Are you sure you want to asssign " + this.technicianMenuName + " to a " + this.complaintMenuName,
         confirmBit:false
        };

        const alertDialogRef = this.dialog.open(LegalentityConfirmAlertComponent,{
          data:confirmAlertData,
          panelClass: 'custom-dialog-container'
        });

        alertDialogRef.afterClosed().subscribe(result =>{
         
          if (confirmAlertData.confirmBit)
          {
            //console.log(complaintDetailsData);
            this.enableProgressBar = true;
            this.complaintServices.assignTechnicianToComplaint(complaintDetailsData)
            .subscribe(data => {
              if (data['errorOccured'])
              {
                this.toastService.error("Something went wrong while assigning " + this.technicianMenuName + " to " + this.complaintMenuName,"");
                this.enableProgressBar = false;
                return false;
              }

              this.popOpenComplaintsGrid();
              this.toastService.success(this.technicianMenuName + " assinged to a " + this.complaintMenuName + " successfully","");

            }, error => {
              this.toastService.error("Something went wrong while assigning " + this.technicianMenuName + " to " + this.complaintMenuName,"");
              this.enableProgressBar = false;
            });
          }

        });

      }
    });

  }

  openComplaintDetailsDialog(complaintId:number):void{

    const complaintDetailsResponseObj = this.complaintResponse.map((value,index) => value? {
      complaintId: value['complaintId'],
      complaintNumber: value['complaintNumber']
    }: null)
    .filter((value) => value.complaintId == complaintId);

   
    let complaintNumber: string = complaintDetailsResponseObj[0]['complaintNumber'];


    let complaintStructObj: IComplaintIdStruct = {
      complaintId: complaintId,
      equipmentMenuName: this.equptMenuName,
      complaintMenuName: this.complaintMenuName,
      technicianMenuName: this.technicianMenuName,
      complaintNumber: complaintNumber,
      errorOccured: false
    };

    const complaintDialogRef = this.dialog.open(LegalentityIndivComplaintRptComponent,{
      data: complaintStructObj
    });

    complaintDialogRef.afterClosed().subscribe(result => {
      if (result['errorOccured'])
      {
        this.toastService.error("Something went wrong while showing complaint details. Please try after some time");
      }
    })


   // let complaintDialogRef = this.dialog.open(LegalentityComplaintRptComponent, {
    //  data: complaintStructObj,
    //  panelClass: 'custom-dialog-container'
    //});

  }

  isComplaintInLeadTime(complaintDate:string):any{
    
    let currentDateFormatted: moment.Moment = moment(moment().format());
    let complaintDateFormatted: moment.Moment = moment(complaintDate);

    let durationTime = moment.duration(currentDateFormatted.diff(complaintDateFormatted)).asDays();

    if (durationTime > 7)
    {
      return true;
    }  
    else
    {
      return false;
    }

  }

  ngOnInit() {

    if (localStorage.getItem('legalEntityUser') != null)
    {

      this.legalEntityUserModel = JSON.parse(localStorage.getItem('legalEntityUser'));
      
      this.legalEntityId = this.legalEntityUserModel.legalEntityId;
      this.userId = this.legalEntityUserModel.userId;

      if (localStorage.getItem('legalEntityBranch') != null)
      {
        this.branchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));
        
        this.branchId = this.branchModel.branchId;
      }
      else
      {
        this.router.navigate(['/legalentity/login']);    
      }
    } 
    else
    {
      this.router.navigate(['/legalentity/login']);
    }

  // console.log(this.isComplaintInLeadTime('2017-01-28T05:09:32.465+0000'));
  

    this.enableProgressBar = false;

    this.legalEntityMenuObj =  JSON.parse(localStorage.getItem('leMenuPreference'));

    const equptMenuNameObj = this.legalEntityMenuObj.map((value,index) => value? {
      menuName: value['menuName'],
      ngModelPropName: value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == 'equipment');

    this.equptMenuName = (equptMenuNameObj.length != 0?equptMenuNameObj[0]['menuName']:'');
    

    const technicianMenuNameObj = this.legalEntityMenuObj.map((value,index) =>value? {
     menuName: value['menuName'],
     ngModelPropName: value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == 'technician');

    this.technicianMenuName = (technicianMenuNameObj.length != 0)?technicianMenuNameObj[0]['menuName']:'';

    
    const complaintMenuNameObj = this.legalEntityMenuObj.map((value,index) => value? {
      menuName: value['menuName'],
      ngModelPropName: value['ngModelPropName']
    }: null)
    .filter((value) => value.ngModelPropName == 'complaints');

    this.complaintMenuName = (complaintMenuNameObj.length != 0)? complaintMenuNameObj[0]['menuName']:'';

    this.util.setTitle('Legal Entity - ' + this.equptMenuName + " | Attendme");

    this.popOpenComplaintsGrid();
 
    

  }

}
