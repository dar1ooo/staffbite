import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models';
import { TeacherSkills } from '../models/teacherskills.model';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {
  private baseurl = 'http://localhost:5079/api/Skill';

  constructor(private http: HttpClient) {}

  updateSkillProgress(user: User): Observable<any> {
    const url = this.baseurl + '/updateProgress';
    return this.http.post<User>(url, user, { withCredentials: true });
  }

  saveSkills(skills: TeacherSkills[]): Observable<TeacherSkills[]> {
    const url = this.baseurl + '/saveSkills';
    return this.http.post<TeacherSkills[]>(url, skills);
  }

  getSkills(): Observable<any> {
    const url = this.baseurl + '/getSkills';
    return this.http.get<TeacherSkills[]>(url);
  }
}
