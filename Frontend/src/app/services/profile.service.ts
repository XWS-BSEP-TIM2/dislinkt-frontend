import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { server } from '../app-global';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { Experience } from '../model/experienceModel';
import { Profile } from '../model/profileModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = server+'profile';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getUserById(userId: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/' + userId;
    return this._http.get<any>(url, { headers: headers });
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(this.url+'/changepassword', changePasswordRequest, { headers: headers })
  }

  getProfilesByAdmin(){
    const headers = this.loginService.getHeaders();
    const url = this.url + '/admin-view';
    return this._http.get<any>(url, { headers: headers });
  }

  getCurrentPosition(profile: Profile): Experience {
    var currentExperience: Experience = new Experience();
    var today = new Date();

    if (this.getSortedExperiences(profile).length != 0) {
      currentExperience = this.getSortedExperiences(profile)[0];
      if (currentExperience.endDate < today) {
        currentExperience.name = '[FORMER] ' + currentExperience.name;
      }
    } else {
      currentExperience.name = 'No career information available';
    }

    return currentExperience;
  }

  getSortedExperiences(profile: Profile): Experience[] {
    var sortedExperiences = profile.experiences;
    sortedExperiences.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
    return sortedExperiences;
  }

  getFullName(profile: Profile) {
    return profile.name + ' ' + profile.surname;
  }
}
