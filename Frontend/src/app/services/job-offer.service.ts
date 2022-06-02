import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { Experience } from '../model/experienceModel';
import { JobOffer } from '../model/jobOffer';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class JobOfferService {
 


  
  url = server + 'job-offer';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

 

  deleteOffer(offer: JobOffer) {
    const headers = this.loginService.getHeaders();
    return this._http.delete<any>(
      this.url+'/'+offer.id,
      { headers: headers }
    );
  }

  

  createJobOffer(jobOffer:JobOffer){
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(
      this.url,
      jobOffer,
      { headers: headers }
    );
  }

  getUserJobOffers(userId:string){
    const headers = this.loginService.getHeaders();
    return this._http.get<any>(
      this.url+'/user-offers/'+userId,
      { headers: headers }
    );
  }

  editOffer(jobOffer:JobOffer){
    const headers = this.loginService.getHeaders();
    return this._http.put<any>(
      this.url,
      jobOffer,
      { headers: headers }
    );
  }


}