import { Component, OnInit } from '@angular/core';
import { UtilServicesService } from 'src/app/util-services.service';
import { LegalentityBranch } from '../model/legalentity-branch';
import { Router, ActivatedRoute } from '@angular/router';
import { LegalentityEquipmentService } from '../services/legalentity-equipment.service';
import { LegalEntity } from 'src/app/superadmin/model/legal-entity';
import { LegalentityLogin } from '../model/legalentity-login';
import {first,subscribeOn} from 'rxjs/operators';
import { pipe } from 'rxjs';
import { LegalentityBranchRulebook } from '../model/legalentity-branch-rulebook';
import { LegalentityBranchService } from '../services/legalentity-branch.service';
import {NgForm} from '@angular/forms'
import { LegalentityAddBranch } from '../model/legalentity-add-branch';
import * as moment from 'moment';

@Component({
  selector: 'app-legalentity-branch',
  templateUrl: './legalentity-branch.component.html',
  styleUrls: ['./legalentity-branch.component.css']
})
export class LegalentityBranchComponent implements OnInit {

  legalEntityMenuId:number;
  branchMenuName:string;
  legalEntityId:number;
  branchRuleBookExceed:boolean;
  errorBit:boolean;
 // dateDisp:string;
 contactCountryCode:number;
 userCountryCode:number;
 loading:boolean;
btnDisabled:boolean;
userId:number;
cssClass:string;
userMessage:string;
dispMessageBit:boolean;

  constructor(
    private util:UtilServicesService,
    private branchModel:LegalentityBranch,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private equipmentServiceAPI:LegalentityEquipmentService,
    private legalEntityLoginModel:LegalentityLogin,
    private branchRuleBookModel:LegalentityBranchRulebook,
    private branchervice:LegalentityBranchService,
    public addBranchModel:LegalentityAddBranch
  ) {

    //this.dateDisp = moment().format('MMM DD YYYY HH:mm:ss');

    if (localStorage.getItem('legalEntityUser') != null)
    {

      legalEntityLoginModel = JSON.parse(localStorage.getItem('legalEntityUser'));

      this.legalEntityId = legalEntityLoginModel.legalEntityId;
      this.userId = legalEntityLoginModel.userId;

      if (localStorage.getItem('legalEntityBranch') == null)
      {
        this.router.navigate(['/legalentity/login']);
      }

    }
    else
    {
      this.router.navigate(['/legalentity/login']);
    }

   }

   callingCodeArr:number[];
   


     popCountryCallingCode()
     {
      
        this.util.getCountryList()
        .subscribe((data:any) => {
       
        this.callingCodeArr = data;

        // console.log(data);
         
        },
      error => {
        console.log(error);
      })
     }

     addNewBranch(addBranchForm:NgForm)
     {
        
      if(addBranchForm.invalid)
      {
        return;
      }
     
        this.btnDisabled =true;
      this.loading =true;
      
      this.addBranchModel.legalEntityId = this.legalEntityId;
      this.addBranchModel.branchHeadOffice =false;
      this.addBranchModel.adminApprove =true;
      this.addBranchModel.addedByUserId = this.userId;
      
      this.addBranchModel.branchUserActiveStatus =true;
      this.addBranchModel.branchUserRole = "branch";
     
      this.addBranchModel.branchActiveStatus =true;

      this.addBranchModel.branchUserPasswordChange =false;

      this.addBranchModel.contactMobileNumber = this.contactCountryCode + "-" + this.addBranchModel.branchContactMobileWoCC;
      this.addBranchModel.branchUserMobileNumber = this.userCountryCode + "-" + this.addBranchModel.branchUserMobileWoCC;

      this.addBranchModel.branchMenuName = this.branchMenuName; 

      this.branchervice.addNewBranchDetails()
      .pipe(first())
      .subscribe((data => {
console.log(data);
        this.addBranchModel.branchId = data.branchId;
        this.addBranchModel.branchAdded = data.branchAdded;
        this.addBranchModel.branchExceed =data.branchExceed;
        this.addBranchModel.userEmailMobileExisits = data.userEmailMobileExisits;

         if(this.addBranchModel.branchExceed)
       {
        this.dispMessageBit = true;
        this.cssClass ="alert alert-danger";
        this.userMessage = "Number of branch added has exceeded your rule book limit. To upgrade, please contact administrator";
       }

       else if(this.addBranchModel.userEmailMobileExisits)
       {
        this.dispMessageBit = true;
        this.cssClass ="alert alert-danger";
        this.userMessage = "Entere user mobile number number already exisits with another account. Please enter another email id";
       }

       else if (this.addBranchModel.branchAdded == false)
       {
        this.dispMessageBit = true;
        this.cssClass ="alert alert-danger";
        this.userMessage = "There was an error !!!";
       }
       
       
       else
       {
        this.dispMessageBit = true;
        this.cssClass ="alert alert-success";
        this.userMessage = this.branchMenuName + " Added Successfully !!!";

        this.resetBranchForm(addBranchForm);
       
       }

        
        

        this.btnDisabled=false;
        this.loading=false; 
      }

     

       

      )),
      error => {

        this.dispMessageBit = true;
        this.cssClass ="alert alert-danger";
        this.userMessage = "There was an error !!!";

        this.btnDisabled=false;
        this.loading=false; 
      }

     }

     resetBranchForm(addBranchForm:NgForm)
     {

      this.checkBranchExceed(); 

       addBranchForm.reset({
       contactCountryCode:91,
       userCountryCode:91
       })
     }

     checkBranchExceed()
     {
      this.branchRuleBookModel.legalEntityId = this.legalEntityId;
      this.branchRuleBookModel.branchHeadOffice = false;
 
      this.branchervice.getBranchRuleBook()
      .pipe(first())
      .subscribe((data => {
 
       if (data.errorFlag == true)
       {
         this.errorBit = true;
         return;
       }
 
        this.branchRuleBookModel = data;
       
        let CurrentBranchCount:number = this.branchRuleBookModel.addedBranchCount;
        let RuleBookBranchCount:number = this.branchRuleBookModel.ruleBookBranchCount;
 
    if (CurrentBranchCount>= RuleBookBranchCount)  {
      this.branchRuleBookExceed =true;
    }
    else
    {
     this.branchRuleBookExceed =false;
     this.popCountryCallingCode();
 
     this.contactCountryCode = 91;
     this.userCountryCode = 91;
    }
 
      }), error => {this.errorBit=true;})
 
      
 
     }
     

  ngOnInit() {

    this.errorBit=false;
    this.btnDisabled =false;
    this.loading=false;
    
    this.dispMessageBit =false;
    
    
    this.legalEntityMenuId = this.activeRoute.snapshot.params['leMenuId'];
 
     this.equipmentServiceAPI.getLegalEntityMenuName(this.legalEntityId,this.legalEntityMenuId)
     .pipe(first())
     .subscribe((data => {
       this.branchMenuName = data.prefMenuName;
       this.util.setTitle("Legal Entity - Add " + this.branchMenuName + " | Attendme");
     }))

     this.checkBranchExceed();    
  }

}
