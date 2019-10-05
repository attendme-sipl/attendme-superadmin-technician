import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilServicesService } from '../../util-services.service';
import { LegalentityMenu } from '../model/legalentity-menu';
import { Observable } from 'rxjs';
import { LegalentityBranch } from '../model/legalentity-branch';
import { map } from 'rxjs/operators';
import { legalEntitySubscription } from '../../superadmin/services/add-legalentity.service';

@Injectable({
  providedIn: 'root'
})
export class LegalentityMainService {

  constructor(
    private httpClient:HttpClient,
    private util:UtilServicesService
   // private legalEntityMenuModel:LegalentityMenu[]
  ) { }

  getLegalEntityMenu(legalEntitId:number):Observable<LegalentityMenu[]>
  {
    return this.httpClient.post<LegalentityMenu[]>(this.util.legalEntityAPI_URL + "/getEntityMenuList",{
      legalEntityId:legalEntitId
    });
  }

  getBranchDetails(legalEntityBranchModel:LegalentityBranch):Observable<LegalentityBranch>
  {
   //console.log(legalEntityBranchModel);
    return this.httpClient.post<LegalentityBranch>(this.util.legalEntityAPI_URL + "/getUserBranchDetail",legalEntityBranchModel);

  }

  StoreBranchDetails(legalEntityBranchModel:LegalentityBranch):Observable<LegalentityBranch>
  {
     
    return this.httpClient.post<LegalentityBranch>(this.util.legalEntityAPI_URL + "/getUserBranchDetail",legalEntityBranchModel)
    .pipe(map(branch => {
    
     if (branch){
   

        localStorage.setItem('legalEntityBranch',JSON.stringify({

         branchId:branch.branchId,
         branchName:branch.branchName,
         branchHeadOffice:branch.branchHeadOffice

        }));
      }
  
      return branch;
  
   })) 
  
    }

    getHeadOfficeAdded(branchModel:LegalentityBranch):Observable<LegalentityBranch>
    {
     
      return this.httpClient.post<LegalentityBranch>(this.util.legalEntityAPI_URL + "/getBranchHeadOfficeInfo",branchModel);
    }

    resetPassword(userId:number,userPassword:string,passwordChange:boolean):Observable<any>
    {
      return this.httpClient.patch(this.util.legalEntityAPI_URL + "/resetPassword",{
        userId:userId,
        userPassword:userPassword,
        passwordChange:passwordChange
      })
    }

}
