import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { first } from 'rxjs/operators';
import { LegalentityMaster } from 'src/app/model/legalentity-master';
import { NgForm } from '@angular/forms';
import { SuperadminQridGenerateService } from '../services/superadmin-qrid-generate.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-superadmin-generate-qr',
  templateUrl: './superadmin-generate-qr.component.html',
  styleUrls: ['./superadmin-generate-qr.component.css']
})
export class SuperadminGenerateQRComponent implements OnInit {

  selLegalEntity:number;
  numOfQrId:number;
  loadingBit:boolean;
  btnDisable:boolean;

  constructor(
    private util:UtilServicesService,
    private getQrIDAPI:SuperadminQridGenerateService,
    private toaster:ToastrService
  ) { 

    util.setTitle('Superadmin - Generate QR Id Batch | AttendMe');

  }

   

  legalEntityMasterArr:LegalentityMaster[];

  popLegalEntityList()
  {
    this.util.getLegalEntityList()
    .pipe(first())
    .subscribe((data:any) => {
      this.legalEntityMasterArr =data;
    }),
    error => {
      this.toaster.error("Some error occured while loading legal entity list","");
    }
  }

  generateQRId(genQRIdForm:NgForm)
  {

    if (genQRIdForm.invalid)
    {
      return;
    }

    this.loadingBit =true;
    this.btnDisable =true;

    this.getQrIDAPI.generateQrIdForEntity(this.selLegalEntity,this.numOfQrId,false)
    .pipe(first())
    .subscribe((data => {

      if (data.errorOccured == true)
      {
        this.toaster.error("An error occured while generating QR Ids","");

      }

      if (data.qrQtyExceed == true)
      {
        this.toaster.error("Number of QR Id quantity exceeds as per the rule book","");
        
      }
      else
      {
        this.toaster.success("QR Id generated successfully","");

        genQRIdForm.reset({
          selLegalEntity:0
        });
      }

      this.loadingBit = false;
      this.btnDisable = false;

    }), error => {
      this.toaster.error("Some error occured","");
    });

   
  }

  ngOnInit() {
    this.loadingBit=false;
    this.btnDisable=false;
    this.popLegalEntityList();
    
    this.selLegalEntity = 0;

  }

}
