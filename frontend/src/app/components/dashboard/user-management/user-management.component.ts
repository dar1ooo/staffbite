import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { UserRole } from 'src/app/enums/user-role';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public showUserDetail: boolean = false;

  public teachers: User[] = [];

  public selectedTeacher: User = new User();
  public showAddUser: boolean = false;

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllTeachers()
      .pipe(
        tap((teachers) => {
          this.teachers = teachers;
        }),
        catchError((err) => {
          this.toastr.error("Couldn't get teachers");
          return err;
        })
      )
      .subscribe();
  }

  public viewSkills(teacher: User) {
    this.showUserDetail = true;
    this.selectedTeacher = teacher;
  }

  public backToUserList(): void {
    this.showUserDetail = false;
    this.showAddUser = false;
  }

  public addUser(): void {
    this.showAddUser = true;
  }
}
