import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { Router } from '@angular/router';
import { ToastrService, Toast } from 'ngx-toastr';
import { LegalentityLogin } from '../../model/legalentity-login';
import { LegalentityBranch } from '../../model/legalentity-branch';
import { LegalentityBranchService } from '../../services/legalentity-branch.service';
import {MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import { LegalentityAllotQrComponent } from '../../legalentity-allot-qr/legalentity-allot-qr.component';


export interface IBranchDetailsRpt{
  branchId: number,
  branchHeadOffice: boolean,
  branchName: string,
  branchContactPersonName: string,
  branchContactMobile: string,
  branchEmail: string,
  branchAddress: string,
  allotedQRIdCount: string,
  branchActiveStatus: boolean
}

@Component({
  selector: 'app-legalentity-branch-rpt',
  templateUrl: './legalentity-branch-rpt.component.html',
  styleUrls: ['./legalentity-branch-rpt.component.css']
})



export class LegalentityBranchRptComponent implements OnInit {

  legalEntityId: number;
  branchId: number;

  legalEntityMenuPrefObj: string[];

  branchMenuName: string;

  dataSource;

  branchDetailsRptObject:IBranchDetailsRpt[];

  displayedColumns:string[] =[
    'srNo',
    'branchName',
    'branchContactPersonNm',
    'contactMobile',
    'contactEmail',
    'allotedQRIdCount',
    'allotQrId' 
  ];
  

  constructor(
    private util:UtilServicesService,
    private router: Router,
    private toast:ToastrService,
    private legalEntityModel:LegalentityLogin,
    private legalEntityBranchModel:LegalentityBranch,
    private legalEntityBranchAPI:LegalentityBranchService,
    public dialog:MatDialog
  ) { }

  popBranchReport()
     {
      this.legalEntityBranchAPI.getAllBranchReport(this.legalEntityId)
      .subscribe(data => {
       
       if (data['errorOccured'] == true)
       {
         this.toast.error("Something went wrong while loading " + this.branchMenuName + " details.","");
         return false;
       }

       this.branchDetailsRptObject = data['branchDetailsList'];

       this.branchDetailsRptObject.sort(function(leftSide,rightSide){
         if (leftSide.branchId < rightSide.branchId)
         return -1;
         if (leftSide.branchId > rightSide.branchId)
         return 1;
       });

       

       this.dataSource = new MatTableDataSource(this.branchDetailsRptObject);

      }, error => {
        this.toast.error("Something went wrong while loading " + this.branchMenuName + " details.","");
      });
     }

     openDialog(branchId:number, branchName:string):void
     {
      const dialogRef = this.dialog.open(LegalentityAllotQrComponent, {
        width:'250px'});
     }

  ngOnInit() {

    if (localStorage.getItem('legalEntityUser') != null)
    {
     this.legalEntityModel = JSON.parse(localStorage.getItem('legalEntityUser'));

     this.legalEntityId = this.legalEntityModel.legalEntityId;

     if (localStorage.getItem('legalEntityBranch') != null)
     {
       this.legalEntityBranchModel = JSON.parse(localStorage.getItem('legalEntityBranch'));

       this.branchId = this.legalEntityBranchModel.branchId;
     }

    }
    else{
      this.router.navigate(['/legalentity/login']);
    }

    this.legalEntityMenuPrefObj = JSON.parse(localStorage.getItem('leMenuPreference'));

    const branchMenuObj = this.legalEntityMenuPrefObj.map((value,index) => value? {
      menuName:value['menuName'],
      ngModelPropName:value['ngModelPropName']
    }:null)
    .filter((value) => value.ngModelPropName == "branch");

    this.branchMenuName = branchMenuObj[0]['menuName'];

    this.util.setTitle("Legal Entity - " + this.branchMenuName + " Report | Attendme");

    this.popBranchReport();
  }

}
