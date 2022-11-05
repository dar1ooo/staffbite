import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
export class LoginComponent {
  public userLogin: UserLogin = new UserLogin();
  private user: User = new User();
  public showPassword: boolean = false;
  public newPassword: string = '';
  private mockedUser: User = new User();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  public login(): void {
    this.userService.loginUser(this.userLogin).subscribe(
      (result) => {
        this.user = result;
        sessionStorage.setItem('user', JSON.stringify(this.user));
        window.location.href = '/dashboard';
      },
      (error) => {
        this.toastr.error('Please check your credentials', 'Login failed');
      }
    );
  }
  public changeShowPassword(): void {
    this.showPassword
      ? (this.showPassword = false)
      : (this.showPassword = true);
  }
}
