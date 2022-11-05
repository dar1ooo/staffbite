import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { User, UserSignup } from 'src/app/models';
import { SettingsService } from 'src/app/services/settings.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
  public showPassword: boolean = false;
  public newPassword: string = '';
  public takenUsernames: string[] = [];
  public showUsernameTakenError: boolean = false;
  public user: UserSignup = new UserSignup();

  @Output()
  public backToUserList: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getAllUsernames()
      .pipe(
        tap((usernames) => {
          this.takenUsernames = usernames;
        }),
        catchError((err) => {
          this.toastr.error(err.error);
          return err;
        })
      )
      .subscribe();
  }

  public changeShowPassword(): void {
    this.showPassword
      ? (this.showPassword = false)
      : (this.showPassword = true);
  }

  public save(): void {
    if (
      !this.showUsernameTakenError &&
      this.user.Email !== '' &&
      this.user.Username !== '' &&
      this.user.Password !== ''
    ) {
      this.userService
        .registerUser(this.user)
        .pipe(
          tap(() => {
            this.toastr.success('User added');
            this.user = new UserSignup();
          }),
          catchError((err) => {
            this.toastr.error(err);
            return err;
          })
        )
        .subscribe();
    }
  }

  public back(): void {
    this.backToUserList.emit();
  }

  public checkForAvailableUsername(): void {
    if (this.takenUsernames.includes(this.user.Username)) {
      this.showUsernameTakenError = true;
    } else {
      this.showUsernameTakenError = false;
    }
  }
}
