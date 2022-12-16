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
    this.loadAllTeachers();
  }

  //Displays a new view where the admin can view a teachers information / skills
  public viewSkills(teacher: User) {
    this.showUserDetail = true;
    this.selectedTeacher = teacher;
  }

  //deletes user in Database
  public deleteUser(teacher: User) {
    this.userService
      .deleteUser(teacher)
      .pipe(
        tap((result) => {
          this.toastr.success('User deleted');
          this.teachers = this.teachers.filter((t) => t.id !== teacher.id);
        }),
        catchError((err) => {
          this.toastr.error("Couldn't delete user");
          return err;
        })
      )
      .subscribe();
  }

  //changes view from showing add user form back to the teacher list
  public backToUserList(): void {
    this.showUserDetail = false;
    this.showAddUser = false;
    this.loadAllTeachers();
  }

  //controlls if the add user form is visible or not
  public addUser(): void {
    this.showAddUser = true;
    this.showUserDetail = false;
  }

  //Gets a list of all teachers
  public loadAllTeachers(): void {
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
}
