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
    this.teachers = [
      {
        Username: 'Amy',
        Email: 'amywinehouser@gmail.com',
        UserRole: UserRole.Teacher,
        UserId: 1,
        SkillGroup: [
          {
            SkillTopic: 'German',
            Skills: [
              {
                Description: 'Grammatik',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Rechtschreibung',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Literatur',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'English',
            Skills: [
              {
                Description: 'Fehlerfreies Sprechen',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Formelles Schreiben',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'French',
            Skills: [
              {
                Description: 'Verstehen',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Formelles Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'Mathe',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'c#',
            Skills: [
              {
                Description: 'Methods',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Object Oriented Programming',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Polymorphism',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'JS',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'SQL',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'Python',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'Networking',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
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
      {
        Username: 'Robert',
        Email: 'robert@gmail.com',
        UserRole: UserRole.Teacher,
        UserId: 1,
        SkillGroup: [
          {
            SkillTopic: 'German',
            Skills: [
              {
                Description: 'Grammatik',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Rechtschreibung',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Literatur',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'English',
            Skills: [
              {
                Description: 'Fehlerfreies Sprechen',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Formelles Schreiben',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'French',
            Skills: [
              {
                Description: 'Verstehen',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Formelles Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'Mathe',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'c#',
            Skills: [
              {
                Description: 'Methods',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Object Oriented Programming',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Polymorphism',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'JS',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'SQL',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'Python',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'Networking',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
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
      {
        Username: 'James',
        Email: 'james@gmail.com',
        UserRole: UserRole.Teacher,
        UserId: 1,
        SkillGroup: [
          {
            SkillTopic: 'German',
            Skills: [
              {
                Description: 'Grammatik',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Rechtschreibung',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Literatur',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'English',
            Skills: [
              {
                Description: 'Fehlerfreies Sprechen',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Formelles Schreiben',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'French',
            Skills: [
              {
                Description: 'Verstehen',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Formelles Schreiben',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'Mathe',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },
          {
            SkillTopic: 'c#',
            Skills: [
              {
                Description: 'Methods',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Object Oriented Programming',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Polymorphism',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'JS',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'SQL',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'Python',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
            ],
          },

          {
            SkillTopic: 'Networking',
            Skills: [
              {
                Description: 'Listening',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Reading',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Writing',
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
      {
        Username: 'Hans',
        Email: 'hanszimmer@gmail.com',
        UserRole: UserRole.Teacher,
        UserId: 1,
        SkillGroup: [
          {
            SkillTopic: 'German',
            Skills: [
              {
                Description: 'Grammatik',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Rechtschreibung',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Literatur',
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
      {
        Username: 'Peter',
        Email: 'peter@gmail.com',
        UserRole: UserRole.Teacher,
        UserId: 1,
        SkillGroup: [
          {
            SkillTopic: 'German',
            Skills: [
              {
                Description: 'Grammatik',
                IsChecked: true,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Rechtschreibung',
                IsChecked: false,
                ShowPdf: false,
                PdfUrl: '',
                ShowVideo: false,
                VideoUrl: '',
              },
              {
                Description: 'Literatur',
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
  }

  public viewSkills(teacher: User) {
    this.showUserDetail = true;
    this.selectedTeacher = teacher;
  }

  public backToUserList(): void {
    this.showUserDetail = false;
  }
}
