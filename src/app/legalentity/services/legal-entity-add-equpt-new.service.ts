import { Injectable } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {AbstractControl} from '@angular/forms'

@Injectable({
  providedIn: 'root'
})
export class LegalEntityAddEquptNewService {

  constructor(
    private util:UtilServicesService,
    private httpClient:HttpClient
  ) { }

  addEquipmentDetails(equptData:object):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/addEquipmentMaster", equptData);
  }


  addEquipmentNameDetails(equptNameData:object):Observable<any>
  {
    
        return this.httpClient.post(this.util.legalEntityAPI_URL + "/addEquipmentNameMapping",equptNameData);
  }

  addEquipmentModelDetails(equptModelData:object):Observable<any>
  {
    
   return this.httpClient.post(this.util.legalEntityAPI_URL + "/addEquipmentModelMapping ",equptModelData);
  }

  addEquipmentManufDetails(equptManufData):Observable<any>
  {
    
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/addManufacturerDetails", equptManufData);
  }

  addEquipmentServiceProvider(equptServiceProviderData: object):Observable<any>
  {
  
   return this.httpClient.post(this.util.legalEntityAPI_URL + "/addServiceProviderDetails",equptServiceProviderData );
  }

  addEquipmentOwnerDetails(equptOwnerData:any):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/addOwnerDetails", equptOwnerData);
  }

  addEquipmentOwnerCotactDetails(equptOwnerContactData:any):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/addOwnerContactDetails", {
      equptOwnerContact : equptOwnerContactData
    });
  }

  addEquipmentAllDetails(equipmentDetails:any):Observable<any>
  {
    console.log(equipmentDetails);  
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/addEquipmentFullForm",equipmentDetails);
  }

  getBranchUserDetails(branchId:number):Observable<any>
  {
    
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getBranchUserContactDetail",{branchId:branchId});
  }

   

}
