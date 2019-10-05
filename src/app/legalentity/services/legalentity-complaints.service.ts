import { Injectable } from '@angular/core';
import { LegalentityComplaints } from '../model/legalentity-complaints';
import { Observable, observable } from 'rxjs';
import { UtilServicesService } from 'src/app/util-services.service';
import { HttpClient } from '@angular/common/http';
import { IAssingTechnicianDialogData } from '../legalentity-rpt/legalentity-open-complaint-rpt/legalentity-open-complaint-rpt.component';
import { IleadComplaintRequestStruct } from '../legalentity-rpt/legalentity-leadtime-comp-rpt/legalentity-leadtime-comp-rpt.component';


export interface complaintsBodyInterface
{
  allBranchRecords:boolean,
  branchId: number,
  legalEntityId: number,
  complaintStatus: string[],
  lastLoginDateTime: string,
  currentLoginDateTime: string
};

export interface IComplaintBodyStruct
{
  allBranch: boolean,
  branchId: number,
  legalEntityId: number,
  complaintStatus: string,
  fromDate: string,
 toDate: string
};

export interface IComplaintReportStruct{

   complaintId: number,
   complaintNumber: string,
   complaintOpenDateTime: string,
   equipmentName: string,
   equipmentModel: string,
   equipmentSerial: string

};

export interface IindivComplaintDetailsRtp{

  complaintNumber: string,
  equptSerialNumber: string,
  complaintStatus: string,
  manufacturer: string,
  complaintDescription: string,
  complaintDate: string,
  operatorName: string,
  operatorContactNumber: string
  errorOccured: boolean,
  equipmentName: string,
  equipmentModel: string,
  equipmentInstallDate: string,
  equipmentOwnerName: string,
  equipmentOwnerLocation: string,
  assignedDate: string,
  inprogressDate:string,
  closedDate: string,
  assingTechnicianName: string,
  assignTechnicianContactNumber:string,
  failureReason: string,
  actionTaken: string,
  ImageData: [
    {
      imageDocTransId: number,
      imageName: string,
      imageTitle: string,
      imageBase64Data: object
    }
  ],
  qrCodeId: number,
  qrId: string
};

export interface ILeadTimeComplaintResponseStruct{
  errorOccured: boolean,
  complaintList: [{
     complaintId: number,
     complaintNumber: string,
     complaintOpenDateTime: string,
     equipmentName : string,
     equipmentModel: string,
     equipmentSerial: string,
     complaintStatus: string
  }]
};

export interface IAssingnComplaintResponse {
  errorOccured: boolean,
  complaintList: [{
     complaintId: number,
     complaintNumber: string,
     complaintOpenDateTime: string,
     complaintAssignedDateTime: string,
     assingedToTechncianName: string,
     equipmentName: string,
     equipmentModel: string,
     equipmentSerial: string
  }]
};

export interface IassignComplaintStructure {
  complaintId: number,
  complaintNumber: string,
  complaintOpenDateTime: string,
  complaintAssignedDateTime: string,
  assingedToTechncianName: string,
  equipmentName: string,
  equipmentModel: string,
  equipmentSerial: string
};

@Injectable({
  providedIn: 'root'
})
export class LegalentityComplaintsService {

  constructor(private util:UtilServicesService,
    private httpClient:HttpClient) { }

  getFreshComplaints(freshComplaintBodyReq:complaintsBodyInterface):Observable<any>
  {
    console.log(freshComplaintBodyReq);
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getFreshComplaints",freshComplaintBodyReq);
  }

  getComplaintsRpt(complaintInitilizationData:IComplaintBodyStruct):Observable<any>
  {
    return this.httpClient.post(this.util.legalEntityAPI_URL + "/getOpenComplaints", complaintInitilizationData);
  }

  assignTechnicianToComplaint(complaintDetails:IAssingTechnicianDialogData):Observable<any>{
  // console.log(complaintDetails);
  return this.httpClient.post(this.util.legalEntityAPI_URL + "/assignTechToComplaint", complaintDetails);
   
  }

  getIndivComplaintDetails(complaintId: number):Observable<IindivComplaintDetailsRtp>{
    
    return this.httpClient.post<IindivComplaintDetailsRtp>(this.util.mobileRestAPI + "/getComplaintDetails", {
      complaintId: complaintId
    });
  }

  getLeadTimeComplaintRpt(leadTimeComplaintRequestObj: IleadComplaintRequestStruct): Observable<ILeadTimeComplaintResponseStruct> {
    return this.httpClient.post<ILeadTimeComplaintResponseStruct>(this.util.legalEntityAPI_URL + "/leadTimeReport", leadTimeComplaintRequestObj);
  }

  getAssingedComplaintsListRpt(reportReqBodyObj: IComplaintBodyStruct):Observable<IAssingnComplaintResponse> {
    return this.httpClient.post<IAssingnComplaintResponse>(this.util.legalEntityAPI_URL + "/assignComplaintReport", reportReqBodyObj);
  }

}
