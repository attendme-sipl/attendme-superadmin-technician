import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CountryCallingCode } from './model/country-calling-code';
import { HttpClient } from '@angular/common/http';
import { LegalentityMaster } from './model/legalentity-master';

export interface IlegalEntityMenuPref{
  menuPrefArray: [{
    legalEntityMenuId:number,
    menuParamId: number,
    legalEntityId: number,
    menuName:string,
    menuParameterName:string,
    menuParameterPath: string,
    menuPlaceholder: string,
    enableToBranch:boolean
    ngModelPropName:string,
    ngmodelProp:string
  }]
}

@Injectable({
  providedIn: 'root'
})
export class UtilServicesService {

  constructor(
    private titleService: Title,
    private httpClient:HttpClient
  ) {}

   api_url=environment.apiUrl;
   legalEntityAPI_URL = environment.legalEntityAPIUrl;
   mobileRestAPI = environment.mobileRestAPI;

  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }

  public getCountryList():Observable<any>
  {
    return this.httpClient.get(this.legalEntityAPI_URL + "/getCountryCallingCode");
  }

  public getLegalEntityList():Observable<LegalentityMaster>
  {
    return this.httpClient.get<LegalentityMaster>(this.api_url + "/getMasterData")
  }

  public getMenuName(legalEntityId:number,menuId:number):Observable<any>
  {
    return this.httpClient.post(this.legalEntityAPI_URL + "/getEntityMenuPreffName", {
      legalEntityId:legalEntityId,
      entityMenuId:menuId
    });
  }

  public getLegalEntityMenuPreference(legalEntityId:number):Observable<any>
  {
    return this.httpClient.post(this.legalEntityAPI_URL + "/getEntityMenuList",{
      legalEntityId:legalEntityId
    });
  }

}
