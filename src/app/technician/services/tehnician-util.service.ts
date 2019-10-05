import { Injectable } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TechnicianMenuModel } from '../model/technician-menu-model';
import { TechnicianMenuDataStruct } from '../model/technician-menu-data-struct';

export interface ItechnicianLoginDetailsStruct{
  currentLoginDateTime: string,
  lastUpdateDateTime: string,
  legalEntityId: number,
  passwordChange: boolean,
  userActiveStatus: boolean,
  userEmailId: string,
  userFullName: string,
  userId: number,
  userMobileNumer: string,
  userRole: string
};

export interface ItechnicianBranchRequestStruct{
  userId: number,
  branchActive: boolean,
  adminApprove: boolean
};

export interface ItechnicianBranchReponseStruct{
  branchId: number,
  branchHeadOffice: true,
  branchName: string,
  complaintStageCount: number
};

export interface ItechnicianDetailsReponse{
  errorOccured: boolean,
  technicianId: number,
  technicianName: string,
  technicianCreationDateTime: string,
  technicianActiveStatus: boolean
};


@Injectable({
  providedIn: 'root'
})
export class TehnicianUtilService {

  constructor(
    private util: UtilServicesService,
    private httpClient: HttpClient
  ) { }

  getUserBranchDetails(branchRequestObj: ItechnicianBranchRequestStruct):Observable<ItechnicianBranchReponseStruct>
  {
    console.log(branchRequestObj);
   return this.httpClient.post<ItechnicianBranchReponseStruct>(this.util.legalEntityAPI_URL + "/getUserBranchDetail", branchRequestObj);
  }

  getTechnicicianDetails(userId: number):Observable<ItechnicianDetailsReponse>{
    
    return this.httpClient.post<ItechnicianDetailsReponse>(this.util.legalEntityAPI_URL + "/technicianInfo", {
      userId: userId
    });
  }

  getMenuDetails(): TechnicianMenuModel{

    let menuModelObj: TechnicianMenuModel;

    let equptMenuName: string;
    let branchMenuName: string;
    let technicianMenuName: string;
    let complaintMenuName: string;

    if (localStorage.getItem('legalEntityMenuPref') != null){

      let menuObj: TechnicianMenuDataStruct[] = JSON.parse(localStorage.getItem('legalEntityMenuPref'));

      const equptMenuNameObj = menuObj.map((value,index) => value ? {
        ngModelPropName: value['ngModelPropName'],
        menuName: value['menuName']
      } : null)
      .filter(value => value.ngModelPropName == 'equipment');

      if (equptMenuNameObj.length > 0){
        //menuModelObj.equipmentMenuName=equptMenuNameObj[0]['menuName'].toString();
        equptMenuName=equptMenuNameObj[0]['menuName'];
      }

      const branchMenuNameObj = menuObj.map((value,index) => value ? {
        ngModelPropName: value['ngModelPropName'],
        menuName: value['menuName']
      } : null)
      .filter(value => value.ngModelPropName == 'branch');

      if (branchMenuNameObj.length > 0){
        branchMenuName = branchMenuNameObj[0]['menuName'];
      }

      const technicianMenuNameObj = menuObj.map((value,index) => value ? {
        ngModelPropName: value['ngModelPropName'],
        menuName: value['menuName']
      } : null)
      .filter(value => value.ngModelPropName == 'technician');

      if (technicianMenuNameObj.length > 0){
        technicianMenuName=technicianMenuNameObj[0]['menuName'];
      }

      const complaintMenuNameObj = menuObj.map((value,index) => value ? {
        ngModelPropName: value['ngModelPropName'],
        menuName: value['menuName']
      } : null)
      .filter(value => value.ngModelPropName == "complaints");

      if (complaintMenuNameObj.length > 0){
        complaintMenuName = complaintMenuNameObj[0]['menuName'];
      }

      menuModelObj = {
        branchMenuName: branchMenuName,
        complaintMenuName: complaintMenuName,
        equipmentMenuName: equptMenuName,
        technicianMenuName: technicianMenuName
      };

    }

    return menuModelObj;

  }
}
