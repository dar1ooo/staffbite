import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/user-login.model';
import { UserSignup } from '../models/user-signup.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = 'http://localhost:53535/api/Settings';
  constructor(private http: HttpClient) {}

  updateUser(user: User) {
    return this.http.put(this.baseurl, user);
  }
}
