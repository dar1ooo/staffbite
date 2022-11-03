import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role';
import { Skill } from 'src/app/models';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent implements OnInit {
  public user: User | undefined;
  public myDate: string;
  public day: string;
  public selectedSection: string = 'skills';

  constructor(private datePipe: DatePipe) {
    const date = new Date();
    this.myDate = this.datePipe.transform(date, 'dd-MM');
    const weekday = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    this.day = weekday[date.getDay()];
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user')) as User;
  }
  public get userLevel(): typeof UserRole {
    return UserRole;
  }
  public changeSection(section: string): void {
    this.selectedSection = section;
  }
  public changeUserType() {
    if (this.user.UserRole === UserRole.Admin) {
      this.user.UserRole = UserRole.Teacher;
    } else {
      this.user.UserRole = UserRole.Admin;
    }
    this.selectedSection = 'home';
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }
}
