import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilServicesService } from '../../util-services.service';
import { LegalentityLogin } from '../model/legalentity-login';
import { LegalentityMenu } from '../model/legalentity-menu';
import { LegalentityMainService } from '../services/legalentity-main.service';
import { first } from 'rxjs/operators';
import {OrderPipe} from 'ngx-order-pipe'
import { LegalentityBranch } from '../model/legalentity-branch';
import { CountryCallingCode } from '../../model/country-calling-code';
import { utils } from 'protractor';

@Component({
  selector: 'app-legalentity-main',
  templateUrl: './legalentity-main.component.html',
  styleUrls: ['./legalentity-main.component.css']
})
export class LegalentityMainComponent implements OnInit {

  userNm:string;
  legalEntityId:number;
  userId:number;
  userRole:string;
  userPasswordChange:boolean;

  constructor(private router:Router,
    private util:UtilServicesService,
  private legalEntityLoginModel:LegalentityLogin,
private legalEntityMainAPI:LegalentityMainService,
private legalEntityBranchModel:LegalentityBranch)
 {

      if (localStorage.getItem('legalEntityUser') != null)
    {
      legalEntityLoginModel = JSON.parse(localStorage.getItem('legalEntityUser'));
      this.legalEntityId = legalEntityLoginModel.legalEntityId;
      this.userNm= legalEntityLoginModel.userFullName;
this.userId=legalEntityLoginModel.userId;
this.userRole=legalEntityLoginModel.userRole;
this.userPasswordChange = legalEntityLoginModel.passwordChange;

      
    }
    else
    {
      //console.log("in blank");
      this.router.navigate(['/legalentity/login'])
    }
     }

    legalEntityMenuArr:LegalentityMenu[];

     popLegalEntityMenu(){

      //console.log(this.legalEntityId);

        this.legalEntityMainAPI.getLegalEntityMenu(this.legalEntityId)
         .pipe(first())
         .subscribe((data:any) => {
           //console.log(data);
           this.legalEntityMenuArr = data;
           //console.log(this.legalEntityMenuArr);
         },
        error => {
          console.log(error);
        }
        ) 

     }

     storeBranchDetails(legalEntityBranch:LegalentityBranch)
     {

      if (localStorage.getItem("legalEntityBranch") == null)
      {
        this.legalEntityMainAPI.StoreBranchDetails(legalEntityBranch);
        
      }
       
     }

     checkHeadOfficeAdded(legalEntityBranchModel):void{
       this.legalEntityMainAPI.getHeadOfficeAdded(legalEntityBranchModel)
       .pipe(first())
       .subscribe((data => {
       
        if (data.branchId == 0)
        {
          this.router.navigate(['legalentity','headoffice']);
        }
        else
        {

      

          this.legalEntityBranchModel.userId = this.userId;
          this.legalEntityBranchModel.branchActive = true;
          this.legalEntityBranchModel.adminApprove = true;

          this.legalEntityMainAPI.StoreBranchDetails(legalEntityBranchModel)
          .pipe(first())
          .subscribe((data => {
           
            this.legalEntityBranchModel.branchName = data.branchName
           // console.log(this.legalEntityBranchModel);   
          }),
        error => {
          console.log("error in getting branch details");
        })
        }

       }))
     }

     

  ngOnInit() {
   
    this.legalEntityBranchModel.userId = this.userId;
    this.legalEntityBranchModel.legalEntityId = this.legalEntityId
    this.legalEntityBranchModel.branchActiveStatus = true;
    this.legalEntityBranchModel.branchHeadOffice = true;
    //this.storeBranchDetails(this.legalEntityBranchModel);
     this.legalEntityBranchModel.branchActive = true;
     this.legalEntityBranchModel.adminApprove = true;

     if (localStorage.getItem("leMenuPreference") == null)
     {
       this.util.getLegalEntityMenuPreference(this.legalEntityBranchModel.legalEntityId)
       .subscribe(data => {
      
        localStorage.setItem("leMenuPreference",JSON.stringify(data));
       });
     }

    
    if (this.userPasswordChange == false)
    {
      
      this.router.navigate(['legalentity','reset-password']);
    }
    else
    {
      
      if (localStorage.getItem("legalEntityBranch") == null) {

      this.legalEntityMainAPI.getBranchDetails(this.legalEntityBranchModel)
      .pipe(first())
      .subscribe((data => {

        //this.legalEntityBranchModel =data;
        
         this.legalEntityBranchModel.branchId = data.branchId;
         this.legalEntityBranchModel.branchName = data.branchName;
         this.legalEntityBranchModel.branchHeadOffice = data.branchHeadOffice;
         this.legalEntityBranchModel.complaintStageCount = data.complaintStageCount;
        
        if (this.legalEntityBranchModel.branchId == 0)
        {
          if (this.userRole == 'admin')
          {
            this.router.navigate(['legalentity','headoffice']);
          }
          else
          {
            this.logout();
          }
        }
        else
        {
     
        
          localStorage.setItem('legalEntityBranch',JSON.stringify({
         
            branchId:this.legalEntityBranchModel.branchId,
            branchName:this.legalEntityBranchModel.branchName,
            branchHeadOffice:this.legalEntityBranchModel.branchHeadOffice,
            complaintStageCount:this.legalEntityBranchModel.complaintStageCount
   
           }));
        }
        
        
       /* else
        {
          localStorage.setItem('legalEntityBranch',JSON.stringify({

            branchId:this.legalEntityBranchModel.branchId,
            branchName:this.legalEntityBranchModel.branchName,
            branchHeadOffice:this.legalEntityBranchModel.branchHeadOffice
   
           }));

           if (this.legalEntityBranchModel.branchHeadOffice == true)
           {
            this.router.navigate(['legalentity','portal','dashboard']);
           }
        } */
        
        
      }))

    }
        
         //if (localStorage.getItem('legalEntityBranch') == null)
           //{
            //this.checkHeadOfficeAdded(this.legalEntityBranchModel);
           //}
    }
   
 

    this.popLegalEntityMenu();


    
  }


  logout()
  {
    localStorage.removeItem('legalEntityUser');
    localStorage.removeItem('legalEntityBranch');
    localStorage.removeItem('leMenuPreference');

    this.legalEntityBranchModel = null;
    this.legalEntityBranchModel = null;

    this.router.navigate(['/legalentity/login'])
  }

}

