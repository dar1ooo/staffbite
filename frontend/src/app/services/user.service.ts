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
  private baseurl = 'http://localhost:53535/api/User';
  constructor(private http: HttpClient) {}

  loginUser(userLogin: UserLogin): Observable<any> {
    const url = this.baseurl + '/login';
    return this.http.post<User>(url, userLogin);
  }

  registerUser(userSignUp: UserSignup): Observable<any> {
    const url = this.baseurl + '/register';
    return this.http.post<User>(url, userSignUp);
  }

  getUserList(): Observable<any[]> {
    return this.http.get<any>(this.baseurl);
  }

  deleteUser(id: number) {
    const url = this.baseurl + '/' + id;
    return this.http.delete(url);
  }

  addUser(params: any) {
    return this.http.post(this.baseurl, params);
  }

  updateUser(user: User) {
    return this.http.put(this.baseurl, user);
  }
  savePortfolio(user: User): Observable<any> {
    const url = this.baseurl + '/savePortfolio';
    return this.http.post<User>(url, user);
  }
}
