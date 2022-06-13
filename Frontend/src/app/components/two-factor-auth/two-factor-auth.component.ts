import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'two-factor-auth',
  templateUrl: './two-factor-auth.component.html',
  styleUrls: ['./two-factor-auth.component.scss']
})
export class TwoFactorAuthComponent implements OnInit {

  constructor(private loginService:LoginService,private router:Router) { }

  qrCode:any
  code:string="";
  errorMessage="";

  ngOnInit(): void {
      this.loginService.getQrCode(this.loginService.getCurrentUser().userID).subscribe(data=>{
        this.qrCode=data.qrCode;
      },(error)=>{
        alert('Unable to generate QR code');
      })
  }

  verify(){
    this.loginService.verifyAuthCode(this.code).subscribe(data=>{
      this.errorMessage="";
        this.loginService.loginSetUser(data);
        this.router.navigate(['']);
    },error=>{
      this.errorMessage="Wrong Code";
    })
  }

}
