import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SALoginModel } from './superadmin/superadmin-login/salogin-model';
import { UtilServicesService } from './util-services.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {RequestOptions, Request, RequestMethod, Headers} from '@angular/http';
import { post } from 'selenium-webdriver/http';



@Injectable({
  providedIn: 'root'
})

export class SuperadminLoginService {


  header:any;
options:any;

  constructor(
    private http:HttpClient,
    private saModel:SALoginModel,
    private util:UtilServicesService
  ) { 

 /* this.header = new Headers ({

      'Content-Type':'application/json',
      'cookie': 'JSESSIONID=4BCE53C49B7C6D3571FD6DEBF0038107',
      'Authorization': 'Basic cHVzaGthcmFqOnNwYXJrb25peA=='
    });

    this.options = new RequestOptions(
      {
        headers:this.header,
        
      })  */
      
  }




  //getLoginDetails(saModel)
  //{

    //this.http.post(this.util.api_url + "/checkLogin",saModel)
  //.subscribe(
    //  data => {
      //    console.log("POST Request is successful ", data);
     // },
      //error => {
        //  console.log("Error", error);
      //}
  //);
// }


 //GetUserLoginDetails(saModel)
 //{
   //return this.http
   //.post(this.util.api_url + '/checkLogin',saModel);
 //}
 
    
  

  checkLogin(userEamil:string,userPassword:string)
  {

    //var tokenHeader = new Headers({
      //"Content-Type":"application/json", "Authorization":"Basic cHVzaGthcmFqOnNwYXJrb25peA=="
    //});
    //tokenHeader.append('token', 'somevalue');
    

   

   return this.http.post<any>(this.util.api_url + '/checkLogin', 
  {
    emailId:userEamil, password:userPassword
  }
) 
  .pipe(map(user => {

     if (user){
       
       localStorage.setItem('currentUser',JSON.stringify(user));
     }

     return user;

  })) 
  }
  

  }
  


