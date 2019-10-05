import { Component, OnInit, Inject } from '@angular/core';
import { LegalentityLogin } from '../../model/legalentity-login';
import { LegalentityBranch } from '../../model/legalentity-branch';
import { Router } from '@angular/router';
import { IComplaintIdStruct } from '../legalentity-open-complaint-rpt/legalentity-open-complaint-rpt.component';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LegalentityComplaintsService, IComplaintReportStruct, IindivComplaintDetailsRtp } from '../../services/legalentity-complaints.service';

@Component({
  selector: 'app-legalentity-indiv-complaint-rpt',
  templateUrl: './legalentity-indiv-complaint-rpt.component.html',
  styleUrls: ['./legalentity-indiv-complaint-rpt.component.css']
})
export class LegalentityIndivComplaintRptComponent implements OnInit {

  legalEntityId: number;
  branchId: number;
  userId: number;

  complaintId: number;
  complaintNumber: string;

  equipmentMenuName: string;
  technicianMenuName: string;
  complaintMenuName: string;

  qrId: string;
  equipmentNm:string;
  equipmentModel: string;
  complaintStatus:string;

  enableProgressBar: boolean;

  complaintData: IindivComplaintDetailsRtp = {
    ImageData:null,
    actionTaken: null,
    assignTechnicianContactNumber: null,
    assignedDate: null,
    assingTechnicianName: null,
    closedDate: null,
    complaintDate: null,
    complaintDescription:null,
    complaintNumber: null,
    complaintStatus: null,
    equipmentInstallDate: null,
    equipmentModel: null,
    equipmentName: null,
    equipmentOwnerLocation: null,
    equipmentOwnerName: null,
    equptSerialNumber: null,
    errorOccured: null,
    failureReason: null,
    inprogressDate: null,
    manufacturer: null,
    operatorContactNumber: null,
    operatorName: null,
    qrCodeId: null,
    qrId: null
  };

  constructor(
    private legalEntityModel:LegalentityLogin,
    private branchModel: LegalentityBranch,
    private router: Router,
    public dialogRef: MatDialogRef<LegalentityIndivComplaintRptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IComplaintIdStruct,
    private complaintServiceAPI: LegalentityComplaintsService
  ) { 

    this.complaintId = data.complaintId;
    this.complaintNumber = data.complaintNumber;

    this.equipmentMenuName = data.equipmentMenuName;
    this.technicianMenuName = data.technicianMenuName;
    this.complaintMenuName = data.complaintMenuName;

    dialogRef.disableClose = true;

  }

  popCompliantDetails():void{

    this.enableProgressBar = true;

    this.complaintServiceAPI.getIndivComplaintDetails(this.complaintId)
    .subscribe((data:IindivComplaintDetailsRtp) => {
      if (data.errorOccured)
      {
        this.enableProgressBar = false;
        this.data.errorOccured = true;
        this.dialogRef.close();
        return false;
      }
     
      this.complaintData = data;

      this.enableProgressBar = false;

    }, error => {
      this.enableProgressBar = false;
      this.data.errorOccured = true;
      this.dialogRef.close()
    })
   }

  ngOnInit() {

    if (localStorage.getItem('legalEntityUser') != null)
    {
      this.legalEntityModel = JSON.parse(localStorage.getItem('legalEntityUser'));
      
      this.legalEntityId = this.legalEntityModel.legalEntityId;
      this.userId = this.legalEntityModel.userId;

      if (localStorage.getItem('legalEntityBranch') != null)
      {
        this.branchModel = JSON.parse(localStorage.getItem('legalEntityBranch'))
        this.branchId = this.branchModel.branchId;
      }

    }
    else
    {
     this.router.navigate(['/legalentity/login']);
    }

    this.enableProgressBar = false;

    this.popCompliantDetails();

  }

}
