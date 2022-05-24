import { Component, OnInit } from '@angular/core';
import { RegistrationModel } from '../../model/registrationModel'
import { RegisterService } from '../../services/register.service'
import { Router } from '@angular/router';

@Component({
  selector: 'registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  public registrationModel: RegistrationModel;

  constructor(
    private registerService: RegisterService,
    private route: Router) { 
    
    this.registrationModel = new RegistrationModel();
  }

  register() {
    if (!this.registrationModel.validateProperty()) {
      return
    }
    
    this.registerService.register(this.registrationModel).subscribe((data) => {
      if (data != null) {
        this.route.navigate(['login']);
      } else {
        this.route.navigate(['error']);
      }
    },
    error=>{
      alert(error.error.Message);
    });
  }

  ngOnInit(): void {
  }

}
