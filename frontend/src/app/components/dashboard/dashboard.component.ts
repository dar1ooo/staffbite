import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';

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

  ngOnInit(): void {}

  public changeSection(section: string): void {
    this.selectedSection = section;
  }
}
