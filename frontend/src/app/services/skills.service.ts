import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserRole } from '../enums/user-role';
import { Skills, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SKillsService {
  private baseurl = 'http://localhost:5079/api/Skills';
  constructor(private http: HttpClient) {}

  updateSkillProgress(user: User): Observable<any> {
    const url = this.baseurl + '/updateProgress';
    return this.http.post<User>(url, user, { withCredentials: true });
  }

  saveNewSkill(user: User, skills: Skills[]): Observable<Skills> {
    if (user.UserRole === UserRole.Admin) {
      return this.http.post<Skills>(this.baseurl, skills);
    } else {
      return throwError(
        () => new Error(' You are not authorized to save a new skill')
      );
    }
  }
}
