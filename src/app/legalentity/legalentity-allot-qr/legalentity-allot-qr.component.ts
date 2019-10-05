import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface IbranchData{
  branchId: number,
  branchName: string
}

@Component({
  selector: 'app-legalentity-allot-qr',
  templateUrl: './legalentity-allot-qr.component.html',
  styleUrls: ['./legalentity-allot-qr.component.css']
})
export class LegalentityAllotQrComponent implements OnInit {

  constructor(
    public dialogRef:MatDialogRef<LegalentityAllotQrComponent>,
    @Inject(MAT_DIALOG_DATA) public data:IbranchData
  ) { }

  ngOnInit() {
  }

}
