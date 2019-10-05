import { Injectable } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class LegalentityTechnicianService {

  constructor(
    private util:UtilServicesService,
    private httpClient: HttpClient
  ) { }

  getTechnicianNameList(legalEntityId: number, technicianActiveStatus: boolean):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getTechnicianList",{
      legalEntityId: legalEntityId,
      technicianActiveStatus: technicianActiveStatus
    });
  }
}
