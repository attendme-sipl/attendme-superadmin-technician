import { Injectable } from '@angular/core';
import { UtilServicesService } from '../../util-services.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LegalentityEquipment } from '../model/legalentity-equipment';
import { LegalentityEquipmentName } from '../model/legalentity-equipment-name';
import { LegalentityEquipmentModel } from '../model/legalentity-equipment-model';
import { LegalentityEquipmentManuf } from '../model/legalentity-equipment-manuf';
import { LegalentityEquipmentServiceProvider } from '../model/legalentity-equipment-service-provider';
import { LegalentityEquipmentOwner } from '../model/legalentity-equipment-owner';
import { LegalentityEquipmentOwnerContact } from '../model/legalentity-equipment-owner-contact';

@Injectable({
  providedIn: 'root'
})
export class LegalentityEquipmentService {

  constructor(
    private util:UtilServicesService,
    private httpClient:HttpClient,
    private equptModel:LegalentityEquipment,
    private equptName:LegalentityEquipmentName,
    private equptNmModel:LegalentityEquipmentModel,
    private equptManufModel:LegalentityEquipmentManuf,
    private equptServiceProviderModel:LegalentityEquipmentServiceProvider,
    private equptOwnerInfoModel:LegalentityEquipmentOwner,
    private equptOwnerContactModel:LegalentityEquipmentOwnerContact
  ) { }


  getLegalEntityMenuName(legalEntityId:number,legalEntityMenuId:number):any{

    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getEntityMenuPreffName", {
      legalEntityId:legalEntityId,
      entityMenuId:legalEntityMenuId
    });

  }

  getLegalEntityQrId(legalEntityId):any{

    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getQrIdDetails", {
      legalEntityId:legalEntityId,
      qrIdStatus:false,
      qrIdActiveStatus:true
    });

  }

  getBranchWiseQrId(brnachId:number, qrStatus:boolean, qrActiveStatus:boolean):Observable<any>{
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/branchWiseQrIdList", {
      branchId: brnachId,
      qrStatus: qrStatus,
      qrActiveStatus: qrActiveStatus 
    });
  }

  addEqupt(equptModel) :Observable<LegalentityEquipment> {

    
    return this.httpClient.post<LegalentityEquipment>(this.util.legalEntityAPI_URL + "/addEquipmentMaster",equptModel);

  }

  addEquptNameCatalogue(equptName):Observable<LegalentityEquipmentName>
  {
 
    return this.httpClient.post<LegalentityEquipmentName>(this.util.legalEntityAPI_URL + "/addEquipmentNameMapping",equptName);

  }

  addEquptModelCatalogue(equptNmModel):Observable<LegalentityEquipmentModel>
  {
    return this.httpClient.post<LegalentityEquipmentModel>(this.util.legalEntityAPI_URL + "/addEquipmentModelMapping",equptNmModel);
  }

  addEquptManuf(equptManufModel):Observable<LegalentityEquipmentManuf>
  {
    return this.httpClient.post<LegalentityEquipmentManuf>(this.util.legalEntityAPI_URL + "/addManufacturerDetails",equptManufModel);
  }

  addEquptServiceProvider(equptServiceProviderModel):Observable<LegalentityEquipmentServiceProvider>
  {
    return this.httpClient.post<LegalentityEquipmentServiceProvider>(this.util.legalEntityAPI_URL + "/addServiceProviderDetails",equptServiceProviderModel);
  }

  addEquptOwnerInfo(equptOwnerInfoModel):Observable<LegalentityEquipmentOwner>

  {
    
    return this.httpClient.post<LegalentityEquipmentOwner>(this.util.legalEntityAPI_URL + "/addOwnerDetails", equptOwnerInfoModel);
  }

  addEquptOwnerContactInfo(equptOwnerContactModel):Observable<LegalentityEquipmentOwnerContact>
  {
    return this.httpClient.post<LegalentityEquipmentOwnerContact>(this.util.legalEntityAPI_URL + "/addOwnerContactDetails",equptOwnerContactModel);
  }

  
}

class QRClass
{
  qrCodeId:number;
  qrId:string;
}
