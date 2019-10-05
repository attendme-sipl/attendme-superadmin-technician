import { Injectable } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SuperadminQridGenerateService {

  constructor(
    private util:UtilServicesService,
    private httpClient:HttpClient
  ) { }

  generateQrIdForEntity(legalEntityId:number, qrQuantity:number,assignToBranch:boolean):Observable<any>
  {
    return this.httpClient.post(this.util.api_url + "/genQrCodeBatch", {
      id: legalEntityId,
      qty:qrQuantity,
      assignToBranch:assignToBranch
    })
  }
}
