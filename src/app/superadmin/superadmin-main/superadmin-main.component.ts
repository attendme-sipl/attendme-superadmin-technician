import { Component, OnInit } from '@angular/core';
import { SALoginModel } from '../superadmin-login/salogin-model';
import { AppRoutingModule } from '../../app-routing.module';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilServicesService } from '../../util-services.service';

@Component({
  selector: 'app-superadmin-main',
  templateUrl: './superadmin-main.component.html',
  styleUrls: ['./superadmin-main.component.css']
})
export class SuperadminMainComponent implements OnInit {

  userNm:string;
  user:SALoginModel;

  classNm:string;
  selVal:boolean;

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    util:UtilServicesService
  ) {

    util.setTitle("Superadmin - Dashboard | Attendme");

    if (localStorage.getItem('currentUser') != null)
    {
      this.user = JSON.parse(localStorage.getItem('currentUser'));
      this.userNm= this.user.fullName;
    }
    else
    {
      console.log("in blank");
      this.router.navigate(['/superadmin/login'])
    }

    
   }

  ngOnInit() {
    
  }

  logout()
  {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/superadmin/login'])
  }

}
