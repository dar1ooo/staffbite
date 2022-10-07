import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';

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

  constructor(private toastr: ToastrService) {}

  public changeShowPassword(): void {
    this.showPassword
      ? (this.showPassword = false)
      : (this.showPassword = true);
  }

  public saveSettings(): void {
    this.toastr.success('Settings saved successfully', 'Success');
  }
}
