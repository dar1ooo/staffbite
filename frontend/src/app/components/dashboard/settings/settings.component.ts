import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  public showPassword: boolean = false;
  public newPassword: string = '';

  @Input()
  public user: User = new User();

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  public changeShowPassword(): void {
    this.showPassword
      ? (this.showPassword = false)
      : (this.showPassword = true);
  }

  public saveSettings(): void {
    debugger;
    this.userService
      .updateUser(this.user)
      .pipe(
        tap((result) => {
          this.toastr.success('Saving successful', 'Success');
        }),
        catchError((err) => {
          this.toastr.error('Saving failed', 'Failed');
          return err;
        })
      )
      .subscribe();
  }
}
