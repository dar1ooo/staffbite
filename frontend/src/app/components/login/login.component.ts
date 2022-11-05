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
export class LoginComponent implements OnInit {
  public userLogin: UserLogin = new UserLogin();
  private user: User = new User();
  public showPassword: boolean = false;
  public newPassword: string = '';
  private mockedUser: User = new User();

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.mockedUser.Username = 'Alfred';
    this.mockedUser.Email = 'alfredhitchcock@online.gibz.ch';
    this.mockedUser.UserRole = UserRole.Admin;
    this.mockedUser.UserId = 1;
    this.mockedUser.SkillGroup = [
      {
        SkillTopic: 'English',
        Skills: [
          {
            SubSkills: [
              {
                Description: 'Grammar',
                IsChecked: false,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
              {
                Description: 'Basic listening',
                IsChecked: false,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
            ],
          },
          {
            SubSkills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Read at least 3 books in english',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SubSkills: [
              {
                Description: 'Essays',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
        ],
      },
    ];
    sessionStorage.setItem('user', JSON.stringify(this.mockedUser));
  }

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
