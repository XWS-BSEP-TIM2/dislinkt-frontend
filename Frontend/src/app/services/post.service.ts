import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { server } from '../app-global';
import { Post } from '../model/post';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  url = server;

  constructor(private _http: HttpClient, private loginService: LoginService) {}

  getAllPosts() {
    const headers = this.loginService.getHeaders();
    const url = this.url + 'posts';
    return this._http.get<any>(url, { headers: headers });
  }

  getPostHref(customUrl: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + customUrl;
    return this._http.get<any>(url, { headers: headers });
  }

  postPostHref(customUrl: string, body: any) {
    const headers = this.loginService.getHeaders();
    const url = this.url + customUrl;
    return this._http.post<any>(url, body, { headers: headers });
  }

  deletePostHref(customUrl: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + customUrl;
    return this._http.delete<any>(url, { headers: headers });
  }

  publishPost(post: any) {
    const headers = this.loginService.getHeaders();
    const url = this.url + 'posts';
    return this._http.post<any>(url, post, { headers: headers });
  }

  getPostsByUser(id: string) {
    const headers = this.loginService.getHeaders();
    const url = this.url + 'posts/user/' + id;
    return this._http.get<any>(url, { headers: headers });
  }
}
