import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent {
  public showPassword: boolean = false;
  public newPassword: string = '';

  public user: User = new User();

  @Output()
  public backToUserList: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private toastr: ToastrService,
    private settingsService: SettingsService
  ) {}

  public changeShowPassword(): void {
    this.showPassword
      ? (this.showPassword = false)
      : (this.showPassword = true);
  }

  public saveSettings(): void {
    this.settingsService.saveSettings(this.user).subscribe(
      (result) => {
        this.toastr.success('User created Successfully', 'Success');
      },
      (error) => {
        this.toastr.error('Creating new user failed', 'Failure');
      }
    );
  }

  public back(): void {
    this.backToUserList.emit();
  }
}
