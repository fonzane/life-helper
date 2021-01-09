import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiURL;
  token: string;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  onRegister(user: User) {
    return this.http.post(this.apiUrl + '/auth/register', user);
  }

  onLogin(user: User) {
    return this.http.post(this.apiUrl + '/auth/login', user);
  }

  validateToken(): boolean {
    if(this.token) {
      const decodedToken: any = jwt_decode(this.token);
      const exp = (decodedToken.iat + 8640000) * 1000;
      return exp >= Date.now();
    } else {
      return false;
    }
  }

  getUsername(): string {
    if(this.isLoggedIn) {
      const decodedToken: any = jwt_decode(this.token);
      return decodedToken.user.name;
    } else {
      return '';
    }
  }

  getUserID () {
    if(this.isLoggedIn) {
      const decodedToken: any = jwt_decode(this.token);
      return decodedToken.user._id;
    }
  }

  canActivate() {
    return this.validateToken();
  }

}
