import { Component } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  public showUserDetail: boolean = false;

  public teachers: User[] = [];

  public selectedTeacher: User = new User();

  constructor() {}

  public viewSkills(teacher: User) {
    this.showUserDetail = true;
    this.selectedTeacher = teacher;
  }

  public backToUserList(): void {
    this.showUserDetail = false;
  }
}
