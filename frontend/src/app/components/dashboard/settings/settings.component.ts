import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { SettingsService } from 'src/app/services/settings.service';

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
        this.toastr.success('Saving successful', 'Success');
      },
      (error) => {
        this.toastr.error('Saving failed', 'Failed');
      }
    );
  }
}
