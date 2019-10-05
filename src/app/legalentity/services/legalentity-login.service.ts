import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilServicesService } from '../../util-services.service';
import { Observable } from 'rxjs';
import { LegalentityLogin } from '../model/legalentity-login';
import { ReturnStatement } from '@angular/compiler';
import { map } from 'rxjs/operators';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Headers } from '@angular/http';
import * as moment from 'moment';
import { LegalentityLoginComponent } from '../legalentity-login/legalentity-login.component';


@Injectable({
  providedIn: 'root'
})
export class LegalentityLoginService {

  
  headers: any;
  options:any;

  constructor(
    private httpClient:HttpClient,
    private util:UtilServicesService,
    private legalEntityLoginModel:LegalentityLogin
  ) {

    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Authorization':'Basic cHVzaGthcmFqOnNwYXJrb25peA==',
      'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  'Access-Control-Allow-Headers': '*'
    });
   this.options = new RequestOptions( {headers:this.headers} );
   }

  le:LegalentityLogin;

  CheclLogin(legalEntityLoginModel):Observable<LegalentityLogin>
  {
  

   return this.httpClient.post<LegalentityLogin>(this.util.legalEntityAPI_URL + "/checkLoginPortal",legalEntityLoginModel)
   .pipe(map(user => {

    if (user){
 
      localStorage.setItem('legalEntityUser',JSON.stringify(user));
    }

    return user;

 }))

  }

  getclientIP():Observable<LegalentityLogin>
  {
    return this.httpClient.get<LegalentityLogin>("https://jsonip.com/");
  }
}
