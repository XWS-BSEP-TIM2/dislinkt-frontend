import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { ChangePasswordRequest } from '../model/changePasswordRequest';
import { Experience } from '../model/experienceModel';
import { Profile } from '../model/profileModel';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url = server + 'profile';

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getUserById(userId: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/' + userId;
    return this._http.get<any>(url, { headers: headers });
  }

  changePassword(changePasswordRequest: ChangePasswordRequest) {
    const headers = this.loginService.getHeaders();
    return this._http.post<any>(
      this.url + '/changepassword',
      changePasswordRequest,
      { headers: headers }
    );
  }

  getProfilesByAdmin() {
    const headers = this.loginService.getHeaders();
    const url = this.url + '/admin-view';
    return this._http.get<any>(url, { headers: headers });
  }

  updateProfile(profile: any) {
    const headers = this.loginService.getHeaders();
    const url = this.url;
    return this._http.put<any>(url, profile, { headers: headers });
  }

  getCurrentPosition(profile: Profile): Experience {
    var currentExperience: Experience = new Experience();
    var today = new Date();

    if (this.getSortedExperiences(profile) != undefined) {
      currentExperience = this.getSortedExperiences(profile)[0];
      if (currentExperience.endDate < today) {
        currentExperience.name = '[FORMER] ' + currentExperience.name;
      }
    } else {
      currentExperience.name = 'Unknown career';
    }

    return currentExperience;
  }

  getSortedExperiences(profile: Profile): Experience[] {
    var sortedExperiences = profile.experiences;
    if (sortedExperiences != undefined) {
      sortedExperiences.sort((a, b) => (a.endDate > b.endDate ? 1 : -1));
    }
    return sortedExperiences;
  }

  getFullName(profile: Profile) {
    return profile.name + ' ' + profile.surname;
  }

  generateApiKey() {
    const headers = this.loginService.getHeaders();
    const url =
      server + 'api-token/' + this.loginService.getCurrentUser().userID;
    return this._http.get<any>(url, { headers: headers });
  }

  getDateFromSeconds(seconds: number): Date {
    var date = new Date(1970, 0, 1); // Epoch
    date.setSeconds(seconds);
    return date;
  }

  modifyProfileData(data: any) {
    data.profile.birthDate = this.getDateFromSeconds(
      data.profile.birthDate.seconds
    );

    if (data.profile.experiences == null) {
      data.profile.experiences = [];
    }

    if (data.profile.skills == null) {
      data.profile.skills = [];
    }

    for (let experience of data.profile.experiences) {
      experience.endDate = this.getDateFromSeconds(experience.endDate.seconds);
      experience.startDate = this.getDateFromSeconds(
        experience.startDate.seconds
      );
    }

    return data;
  }
}
