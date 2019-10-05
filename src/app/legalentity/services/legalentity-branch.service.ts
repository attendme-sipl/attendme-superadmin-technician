import { Injectable } from '@angular/core';
import { UtilServicesService } from '../../util-services.service';
import { HttpClient } from '@angular/common/http';
import { LegalentityBranch } from '../model/legalentity-branch';
import { Observable, observable } from 'rxjs';
import {map} from 'rxjs/operators'
import { LegalentityBranchRulebook } from '../model/legalentity-branch-rulebook';
import { LegalentityAddBranch } from '../model/legalentity-add-branch';

@Injectable({
  providedIn: 'root'
})
export class LegalentityBranchService {

  constructor(
    private util:UtilServicesService,
    private httpClient:HttpClient,
    private branchModel:LegalentityBranch,
    private branchRuleBookModel:LegalentityBranchRulebook,
    private addBranchModel:LegalentityAddBranch
  ) { }

  addAndGetBranchHeadOffice(branchModel):Observable<LegalentityBranch>
  {
    
    console.log(branchModel);

    return this.httpClient.post<LegalentityBranch>(this.util.legalEntityAPI_URL + "/addHeadOfficeDetails",branchModel)
    
    .pipe(map(branch => {

      localStorage.setItem('localStorage.setItem',JSON.stringify({
        
        branchId:branch.branchId,
        branchName:branch.branchName,
        branchHeadOffice:branch.branchHeadOffice

      }));

      return branch;
  }));

}


getBranchRuleBook():Observable<LegalentityBranchRulebook>
{
  return this.httpClient.post<LegalentityBranchRulebook>(this.util.legalEntityAPI_URL + "/checkBranchCount",this.branchRuleBookModel)
}

addNewBranchDetails():Observable<LegalentityAddBranch>
{

  console.log(this.addBranchModel);

  return this.httpClient.post<LegalentityAddBranch>(this.util.legalEntityAPI_URL + "/addOrCreateBranch", this.addBranchModel);
}

getlegalEntityBranchConciseRpt(legalEntityId:number, branchActiveStatus:boolean):Observable<any>
{
  return this.httpClient.post(this.util.legalEntityAPI_URL + "/getBranchConciseReport", {
    legalEntityId:legalEntityId,
    branchActiveStatus:branchActiveStatus
  });
}

getTotalBranchCount(legalEntityId:number, branchActiveStatus:boolean): Observable<any>
{
  return this.httpClient.post(this.util.legalEntityAPI_URL + "/getBranchConciseReport", {
    legalEntityId: legalEntityId,
    branchActiveStatus: branchActiveStatus
  });
}

getAllBranchReport(legalEntityId:number):Observable<any>
{
  return this.httpClient.patch(this.util.legalEntityAPI_URL + "/legalEntityBranchReport", {
    legalEntityId: legalEntityId
  });
}

}
