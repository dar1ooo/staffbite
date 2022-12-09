import { Component, OnInit } from '@angular/core';
import { CountdownConfig, CountdownEvent } from 'ngx-countdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss'],
})
export class TimerComponent {
  public time: number = null;
  public showTimer: boolean = false;
  public config: CountdownConfig = {
    leftTime: this.time,
    notify: [1],
    format: 'HH:mm:ss',
    prettyText: (text) => {
      return text
        .split(':')
        .map((v) => `<span class="item">${v}</span>`)
        .join('');
    },
  };

  public showTimeUp: boolean = false;

  constructor(private toastr: ToastrService) {}

  public handleEvent(e: CountdownEvent) {
    if (e.action.toUpperCase() === 'DONE') {
      this.showTimeUp = true;
    }
  }

  public back() {
    this.showTimeUp = false;
    this.showTimer = false;
    this.time = this.config.leftTime = 0;
  }

  public begin() {
    if (
      this.time === 0 ||
      this.time === null ||
      this.time === undefined ||
      this.time < 0 ||
      this.time > 1440
    ) {
      this.toastr.error('Please enter a valid time');
    } else {
      this.showTimer = true;
    }
  }

  public configChanged() {
    this.config.leftTime = this.time * 60;
  }
}
