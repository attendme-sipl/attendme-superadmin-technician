import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LegalentityQrusage } from '../model/legalentity-qrusage';
import { UtilServicesService } from '../../util-services.service';
import { Observable } from 'rxjs';
import { utils } from 'protractor';

export interface IcomplaintConciseRpt
{
  allBranch: boolean,
  legalEntityId: number,
  branchId: number,
  userLastLoginDateTime: string,
  userLoginDateTime:string,
  legalTimeDays: number
}

@Injectable({
  providedIn: 'root'
})



export class LegalentityDashboardService {

  constructor(
    private httpClient:HttpClient,
    private qrUsageModel:LegalentityQrusage,
    private util:UtilServicesService
  ) { }

  getQRUsageStats(legalEntityId:number):Observable<LegalentityQrusage>
  {
   
   return this.httpClient.post<LegalentityQrusage>(this.util.legalEntityAPI_URL + "/getQrIdUsageDetails", {legalEntityId:legalEntityId});
  }

  getComplaintConciseReport(complaintConciseRpt:IcomplaintConciseRpt)
    {
     
      return this.httpClient.post(this.util.legalEntityAPI_URL + "/getConciseEquptComp", complaintConciseRpt);
    }

    getBranchWiseQRUsage(brnachId:number):Observable<any>
    {
      return this.httpClient.post(this.util.legalEntityAPI_URL + "/branchQrUsageReport", {
        branchId:brnachId
      });
    }
}
