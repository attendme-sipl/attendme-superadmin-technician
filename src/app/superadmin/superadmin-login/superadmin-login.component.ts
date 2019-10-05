import { Component, OnInit,ViewChild } from '@angular/core';
import { AppComponent } from '../../app.component';
import { UtilServicesService } from '../../util-services.service';
import { SALoginModel } from './salogin-model';
import { NgModel, FormsModule, NgForm, FormGroup , FormBuilder, Validators,FormControl} from '@angular/forms';
import *as md5 from 'md5';
import { SuperadminLoginService } from '../../superadmin-login.service';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { first, sample } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';



@Component({
  selector: 'app-superadmin-login',
  templateUrl: './superadmin-login.component.html',
  styleUrls: ['./superadmin-login.component.css']
})

export class SuperadminLoginComponent implements OnInit  {

  //loginForm: FormGroup;
  //submitted = false;

  password:string;
  
  
  constructor(
    util:UtilServicesService,
    private formBuilder: FormBuilder,
    private saModel:SALoginModel,
    private loginApi:SuperadminLoginService,
    private router:Router
)
     {
  util.setTitle("Superadmin - Login | Attendme");
  
   if (localStorage.getItem('currentUser') != null)
   {
     this.router.navigate(['superadmin','portal','dashboard']);
   }
  
  }

  logout()
  {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/superadmin/login'])
  }
  
  ngOnInit() {



    /*this.loginForm = this.formBuilder.group({
      emailId: ['', Validators.required],
      password:['',Validators.required]
  });*/
  
   
  }

 /* get f()
 {
   return this.loginForm.controls;
 } */

 

 /*onSubmit()
 {

  this.submitted=true;
   
  //if (this.loginForm.invalid) {
    //return;
//}



  this.loginApi.checkLogin(this.f.emailId.value,md5(this.f.password.value))
  .pipe(first())
  .subscribe(
    (data=this.saModel) => {
      
      if (data.userId == 0)
      {
       //this.loginForm.invalid;
       this.loginForm.setErrors({ 'invalid': true });
       console.log("invalid");
      }
      else {
        console.log("valid login");
      }

    },
    error => {
      console.log("error");
    }
  )

 } */

  dispMessage:boolean=false;
  dispMesageStr:string;

  emailId:string;
  pwd:string;

 CheckLogin(loginForm:NgForm):void{ 

  if (loginForm.invalid)
  {
    return;
  }

  //console.log(btoa("chandan:sparkonix"));

  this.emailId=loginForm.value.emailId;
   this.pwd= md5(loginForm.value.password);

  this.loginApi.checkLogin(this.emailId,this.pwd)
  .pipe(first())
  .subscribe(
   
    (data = this.saModel) => {
     
      if (data.userId == 0)
      {
        this.dispMessage=true;
        this.dispMesageStr="Please enter correct email id or password"
       console.log("invalid");
      }
      else {
      
        this.router.navigate(['superadmin/portal/dashboard'])
      }

    },
    error => {
      this.dispMessage=true;
      this.dispMesageStr="There was an error";
      console.log(error);
    }
  )

 }

 setValue(){
   
  this.dispMessage=false;}


  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }
  
}
