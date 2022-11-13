import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TeacherSkills } from '../models';
import { UserLogin } from '../models/user-login.model';
import { UserSignup } from '../models/user-signup.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = 'http://localhost:5079/api/User';
  constructor(private http: HttpClient) {}

  loginUser(userLogin: UserLogin): Observable<any> {
    const url = this.baseurl + '/login';
    return this.http.post<User>(url, userLogin);
  }

  registerUser(userSignUp: UserSignup): Observable<any> {
    const url = this.baseurl + '/register';
    return this.http.post<User>(url, userSignUp);
  }

  public getAllUsernames(): Observable<string[]> {
    const url = this.baseurl + '/usernames';
    return this.http.get<string[]>(url);
  }

  getAllTeachers(): Observable<User[]> {
    const url = this.baseurl + '/teachers';
    return this.http.get<User[]>(url);
  }

  updateUser(user: User): Observable<any> {
    const url = this.baseurl + '/update';
    return this.http.post<any>(url, user);
  }
}
