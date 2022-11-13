import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { UserRole } from 'src/app/enums/user-role';
import { UserLogin } from 'src/app/models/user-login.model';
import { UserSignup } from 'src/app/models/user-signup.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public userLogin: UserLogin = new UserLogin();
  public showPassword: boolean = false;
  public newPassword: string = '';

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (window.sessionStorage.getItem('user')) {
      window.location.href = '/dashboard';
    }
  }

  public login(): void {
    this.userService
      .loginUser(this.userLogin)
      .pipe(
        tap((result) => {
          let user = new User();
          user = result;
          sessionStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/dashboard';
        }),
        catchError((error) => {
          this.toastr.error('Please check your credentials', 'Login failed');
          return error;
        })
      )
      .subscribe();
  }

  public changeShowPassword(): void {
    this.showPassword
      ? (this.showPassword = false)
      : (this.showPassword = true);
  }

  public onKeydown(event) {
    this.login();
  }
}
