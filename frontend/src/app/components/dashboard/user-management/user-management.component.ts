import { Component, OnInit } from '@angular/core';
import { UserRole } from 'src/app/enums/user-role';
import { User } from 'src/app/models';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public showUserDetail: boolean = false;

  public teachers: User[] = [];

  public selectedTeacher: User = new User();

  constructor() {}

  ngOnInit(): void {
    const mockedUser = new User();

    mockedUser.Username = 'Alfred';
    mockedUser.Email = 'alfredhitchcock@online.gibz.ch';
    mockedUser.UserRole = UserRole.Admin;
    mockedUser.UserId = 1;
    mockedUser.SkillGroup = [
      {
        SkillTopic: 'English',
        Skills: [
          {
            SubSkills: [
              {
                Description: 'Grammar',
                IsChecked: true,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: true,
                PdfUrl: 'https://www.orimi.com/pdf-test.pdf',
                ShowVideo: true,
                VideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
              },
              {
                Description: 'Basic listening',
                IsChecked: true,
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
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Read at least 3 books in english',
                IsChecked: true,
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
                IsChecked: true,
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
    this.teachers.push(mockedUser);
  }

  public viewSkills(teacher: User) {
    this.showUserDetail = true;
    this.selectedTeacher = teacher;
  }

  public backToUserList(): void {
    this.showUserDetail = false;
  }
}
