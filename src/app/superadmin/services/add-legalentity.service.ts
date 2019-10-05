import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilServicesService } from '../../util-services.service';
import { map } from 'rxjs/operators';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AddLegalentityService {

  constructor(
    private util:UtilServicesService,
    private http:HttpClient) {
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

    headers: any;
    options:any;

    getRBComplaintStages()
    {
      //this.http.get<any>(this.util.api_url + "/getComplaintStages")
      //.pipe(map(complaintStages => {
         
        //return complaintStages;

      //} ))

      

     
      return this.http.get(this.util.api_url + "/getComplaintStages",this.options);
    }

    getCurrDate()
    {
      return this.http.get(this.util.api_url + "/getDate",this.options);

    
    }

    getSubscriptionTypes()
    {
      return this.http.get(this.util.api_url+"/getSubscription",this.options)
    }

    getMenuParameters()
    {
      return this.http.get(this.util.api_url + "/getMenuParamList",this.options);
    }

    AddLegalEntityService(
      legalEntityNm:string,
      legalEntityAdminMobile:string,
      legalEntityAdminName:string,
      legalEntityAdminEmail:string,
      legalEntityRbBranchQty:number,
      legalEntityRbQRQty:number,
      legalEntityType:string,
      menuItemArr:listOfMenu[],
      subsArr:legalEntitySubscription[],
      legalEntityAdminTelCode:string,
      legalEntityRbComptStage:number,
      unreslovedDaysCount: number
    )
    {

      //console.log(menuItemArr);
       
      return this.http.post<any>(this.util.api_url + "/addLegalEntity",
      {
        entityName:legalEntityNm,
        entityType:legalEntityType,
        userRole:'admin',
        branchRuleBook: legalEntityRbBranchQty,
        numQRIdRuleBook:legalEntityRbQRQty,
        comptStageRuleBook: legalEntityRbComptStage,
        adminName:legalEntityAdminName,
        adminEmail:legalEntityAdminEmail,
        countryCode:legalEntityAdminTelCode,
        adminMobileNo:legalEntityAdminMobile,
        passwordChange:false,
        entityActiveStatus:true,
        adminUserActiveStatus:true,
        listOfSubscriptionDetails:subsArr,
        lisfOfMenuTrans:menuItemArr,
        unreslovedDaysCount: unreslovedDaysCount
      }
    
    
    );
      
    }

}

export class listOfMenu {
  menuId:number;
  userDefMenuNm:string;
}

export class legalEntitySubscription
{
  subsId:number;
  startDate:string;
  endDate:string;
}
