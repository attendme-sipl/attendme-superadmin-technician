import { Injectable } from '@angular/core';
import {UtilServicesService} from 'src/app/util-services.service'
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LegalentityAddTechnicianService {

  constructor(
  private util:UtilServicesService,
  private httpClient:HttpClient
  ) { }

 getLegalEntityBranchList(legalEntityId:number, branchActiveSttus:boolean):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getBranchList ", {
      legalEntityId:legalEntityId,
      branchActiveStatus:branchActiveSttus
    });
  }

  addTechnicianDetails(technicianDetails:object):Observable<any>
  {
    console.log(technicianDetails);
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/addFullTechnicianDetails", technicianDetails);
  }

  assignBranchToTechnician(technicianId:number,branchIdList:string[]):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/assignBranchToTechnician", {
      technicianId:technicianId,
      branchIdList: branchIdList
    });
  }
}
