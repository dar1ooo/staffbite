import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe],
})
export class DashboardComponent {
  public user: User | undefined;
  public myDate: string;
  public day: string;
  public selectedSection: string = 'home';

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

  public changeSection(section: string): void {
    this.selectedSection = section;
  }
}
