import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetailComponent {
  @Input()
  public teacher: User = new User();
  constructor() {}
}
