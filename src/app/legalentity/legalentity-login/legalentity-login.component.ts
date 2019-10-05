import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from '../../util-services.service';
import {NgForm} from '@angular/forms'
import *as md5 from 'md5';
import { LegalentityLogin } from '../model/legalentity-login';
import {LegalentityLoginService} from "../services/legalentity-login.service"
import { first, sample } from 'rxjs/operators';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-legalentity-login',
  templateUrl: './legalentity-login.component.html',
  styleUrls: ['./legalentity-login.component.css']
})
export class LegalentityLoginComponent implements OnInit {

  dispMesageStr:string;
  password:string;

  constructor(
    private util:UtilServicesService,
    public legalEntityLoginModel:LegalentityLogin,
    private entityLoginAPI:LegalentityLoginService,
    private router:Router
  ) { 

    util.setTitle("Legal Entity - Login | Attendme");

  }

  CheckLogin(entityLoginForm:NgForm) {

    localStorage.removeItem('legalEntityUser');
    localStorage.removeItem('legalEntityBranch');
    
console.log( md5(this.legalEntityLoginModel.userPassword));
   this.legalEntityLoginModel.userPassword = md5(this.legalEntityLoginModel.userPassword)

 //console.log(this.legalEntityLoginModel.userPassword);

   this.legalEntityLoginModel.loginActivity="login";
this.legalEntityLoginModel.deviceIpAddress= "192.168.0.7";

this.legalEntityLoginModel.userActiveStatus=true;

this.entityLoginAPI.getclientIP()
.pipe(first())
.subscribe((data => {
  this.legalEntityLoginModel.deviceIpAddress = data.ip;

  this.entityLoginAPI.CheclLogin(this.legalEntityLoginModel)
    .pipe(first())
    .subscribe(
      (data= this.legalEntityLoginModel) =>
      {
         console.log(data);
       // console.log(localStorage.getItem("legalEntityUser"));
           
        if (data.userId != 0)
        {
          if (data.userRole == 'admin')
          {
            this.router.navigate(['legalentity/portal/dashboard']);
          }
          else if (data.userRole == 'branch')
          {
            this.router.navigate(['legalentity/portal/dashboard']);
          }

          
        }
        else
        {
          this.dispMessage=true;
          this.dispMesageStr="Please enter correct email id or password";
        }
      },
     error => 
     {
       //console.log(error);

       this.dispMessage=true;
        this.dispMesageStr="There was an error !"
     }
    );
  
}), error => {

  this.entityLoginAPI.CheclLogin(this.legalEntityLoginModel)
    .pipe(first())
    .subscribe(
      (data= this.legalEntityLoginModel) =>
      {
        
       // console.log(localStorage.getItem("legalEntityUser"));

        if (data.userId != 0)
        {
          this.router.navigate(['legalentity/portal'])
        }
        else
        {
          this.dispMessage=true;
          this.dispMesageStr="Please enter correct email id or password";
        }
      },
     error => 
     {
       //console.log(error);

       this.dispMessage=true;
        this.dispMesageStr="There was an error !"
     }
    );

  this.dispMessage=true;
        this.dispMesageStr="There was an error !"
})

    

  }

  dispMessage:boolean=false;

  setValue(){
   
    this.dispMessage=false;
  
  }
  
  

  ngOnInit() {

    localStorage.removeItem('legalEntityUser');

  }

}
