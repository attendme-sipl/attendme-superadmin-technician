import { Component, OnInit } from '@angular/core';
import { LegalentityBranch } from '../model/legalentity-branch';
import { UtilServicesService } from 'src/app/util-services.service';
import { LegalentityLogin } from '../model/legalentity-login';
import { Router } from '@angular/router';
import {NgForm} from "@angular/forms"
import {ToastrService} from 'ngx-toastr'
import { LegalentityMainService } from '../services/legalentity-main.service';
import { first } from 'rxjs/operators';
import * as md5 from 'md5';

@Component({
  selector: 'app-legalentity-reset-password',
  templateUrl: './legalentity-reset-password.component.html',
  styleUrls: ['./legalentity-reset-password.component.css']
})
export class LegalentityResetPasswordComponent implements OnInit {

  legalEntityId:number;
  userName:string;
  userId:number;
  userRole:string;

  newPassword:string;
  reenterNewPassword:string;
  btnDisable:boolean;
  progressBarBit:boolean;

  newMd5Password:string;

  constructor(
    private util:UtilServicesService,
    private legalEntityBranchModel:LegalentityBranch,
    private legalEntityLoginModel:LegalentityLogin,
    private router:Router,
    private toastService:ToastrService,
    private legalEntityMainServiceAPI:LegalentityMainService
  ) {

    if (localStorage.getItem('legalEntityUser') != null)
    {
      legalEntityLoginModel = JSON.parse(localStorage.getItem('legalEntityUser'));

      this.userId = legalEntityLoginModel.userId;
      this.userName = legalEntityLoginModel.userFullName;

      util.setTitle("Legal Entity - Add Head Office | Attendme")

    }
    else{
      this.router.navigate(['/legalentity/login']);
    }

   
   }

   resetPassword(resetPasswordForm:NgForm)
   {
     if (resetPasswordForm.invalid)
     {
       return;
     }
     else
     {
       if (this.newPassword != this.reenterNewPassword)
       {
         this.toastService.error("Password does not match the confirm password","");
       }
       else
       {

        this.btnDisable=true;
        this.progressBarBit=true;

        this.newMd5Password = md5(this.newPassword);

         this.legalEntityMainServiceAPI.resetPassword(this.userId,this.newMd5Password,true)
         .pipe(first())
         .subscribe((data => {
           
           if (data.passwordReset == true)
           {
            this.btnDisable=false;
            this.progressBarBit=false;
            this.logout();
           }
           else
           {
             this.btnDisable=false;
             this.progressBarBit=false;
             
             this.toastService.error("There was an error while resetting password");
           }
         }),
         error => {
           this.btnDisable=false;
           this.progressBarBit=false;
          this.toastService.error("There was an error while resetting password");
         })
       }
     }

  
   }

   logout()
  {
    localStorage.removeItem('legalEntityUser');
   // localStorage.removeItem('legalEntityBranch');
    this.router.navigate(['/legalentity/login']);
  }

  ngOnInit() {
  }

}
