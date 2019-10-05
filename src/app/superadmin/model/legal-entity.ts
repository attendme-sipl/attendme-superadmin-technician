export class LegalEntity {

    qrComptId:number;
    comptStageType:string;
    qrCompId: number;
    
    entityName:string;
      entityType:string;
      branchRuleBook:number;
      numQRIdRuleBook:number;
      unreslovedDaysCount: number;
      comptStageRuleBook:number;
      adminName:string;
      adminEmail:string;
      countryCode:string;
      adminMobileNo:string;      
      passwordChange:boolean;
      entityActiveStatus:boolean;
      comptStages:string;
      //"adminUserActiveStatus":"True",
        //"userRole" : "admin"
        StartDate:string;
        EndDate:string;

        subscriptionId:number;
        subscriptinType:string;

        menuParamId:number;
        menuParamType:string;
        menuParamPath:string;
        menuPlaceholder:string;
        ngModelPropName:string;
        ngModelProp:string;
        technicianEnable:boolean;
}
