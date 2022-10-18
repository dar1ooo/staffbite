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
              { Description: 'Grammatik', IsChecked: true },
              { Description: 'Rechtschreibung', IsChecked: false },
              { Description: 'Literatur', IsChecked: false },
            ],
          },
          {
            SkillTopic: 'English',
            Skills: [
              { Description: 'Fehlerfreies Sprechen', IsChecked: true },
              { Description: 'Schreiben', IsChecked: false },
              { Description: 'Formelles Schreiben', IsChecked: true },
            ],
          },
          {
            SkillTopic: 'French',
            Skills: [
              { Description: 'Verstehen', IsChecked: false },
              { Description: 'Schreiben', IsChecked: false },
              { Description: 'Formelles Schreiben', IsChecked: false },
            ],
          },
          {
            SkillTopic: 'Mathe',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: true },
            ],
          },
          {
            SkillTopic: 'c#',
            Skills: [
              { Description: 'Methods', IsChecked: false },
              {
                Description: 'Object Oriented Programming',
                IsChecked: true,
              },
              { Description: 'Polymorphism', IsChecked: true },
            ],
          },

          {
            SkillTopic: 'JS',
            Skills: [
              { Description: 'Listening', IsChecked: false },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: false },
            ],
          },

          {
            SkillTopic: 'SQL',
            Skills: [
              { Description: 'Listening', IsChecked: false },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: false },
            ],
          },

          {
            SkillTopic: 'Python',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: false },
              { Description: 'Writing', IsChecked: true },
            ],
          },

          {
            SkillTopic: 'Networking',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: false },
              { Description: 'Writing', IsChecked: false },
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
              { Description: 'Grammatik', IsChecked: true },
              { Description: 'Rechtschreibung', IsChecked: false },
              { Description: 'Literatur', IsChecked: false },
            ],
          },
          {
            SkillTopic: 'English',
            Skills: [
              { Description: 'Fehlerfreies Sprechen', IsChecked: true },
              { Description: 'Schreiben', IsChecked: false },
              { Description: 'Formelles Schreiben', IsChecked: true },
            ],
          },
          {
            SkillTopic: 'French',
            Skills: [
              { Description: 'Verstehen', IsChecked: false },
              { Description: 'Schreiben', IsChecked: false },
              { Description: 'Formelles Schreiben', IsChecked: false },
            ],
          },
          {
            SkillTopic: 'Mathe',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: true },
            ],
          },
          {
            SkillTopic: 'c#',
            Skills: [
              { Description: 'Methods', IsChecked: false },
              {
                Description: 'Object Oriented Programming',
                IsChecked: true,
              },
              { Description: 'Polymorphism', IsChecked: true },
            ],
          },

          {
            SkillTopic: 'JS',
            Skills: [
              { Description: 'Listening', IsChecked: false },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: false },
            ],
          },

          {
            SkillTopic: 'SQL',
            Skills: [
              { Description: 'Listening', IsChecked: false },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: false },
            ],
          },

          {
            SkillTopic: 'Python',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: false },
              { Description: 'Writing', IsChecked: true },
            ],
          },

          {
            SkillTopic: 'Networking',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: false },
              { Description: 'Writing', IsChecked: false },
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
              { Description: 'Grammatik', IsChecked: true },
              { Description: 'Rechtschreibung', IsChecked: false },
              { Description: 'Literatur', IsChecked: false },
            ],
          },
          {
            SkillTopic: 'English',
            Skills: [
              { Description: 'Fehlerfreies Sprechen', IsChecked: true },
              { Description: 'Schreiben', IsChecked: false },
              { Description: 'Formelles Schreiben', IsChecked: true },
            ],
          },
          {
            SkillTopic: 'French',
            Skills: [
              { Description: 'Verstehen', IsChecked: false },
              { Description: 'Schreiben', IsChecked: false },
              { Description: 'Formelles Schreiben', IsChecked: false },
            ],
          },
          {
            SkillTopic: 'Mathe',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: true },
            ],
          },
          {
            SkillTopic: 'c#',
            Skills: [
              { Description: 'Methods', IsChecked: false },
              {
                Description: 'Object Oriented Programming',
                IsChecked: true,
              },
              { Description: 'Polymorphism', IsChecked: true },
            ],
          },

          {
            SkillTopic: 'JS',
            Skills: [
              { Description: 'Listening', IsChecked: false },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: false },
            ],
          },

          {
            SkillTopic: 'SQL',
            Skills: [
              { Description: 'Listening', IsChecked: false },
              { Description: 'Reading', IsChecked: true },
              { Description: 'Writing', IsChecked: false },
            ],
          },

          {
            SkillTopic: 'Python',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: false },
              { Description: 'Writing', IsChecked: true },
            ],
          },

          {
            SkillTopic: 'Networking',
            Skills: [
              { Description: 'Listening', IsChecked: true },
              { Description: 'Reading', IsChecked: false },
              { Description: 'Writing', IsChecked: false },
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
              { Description: 'Grammatik', IsChecked: true },
              { Description: 'Rechtschreibung', IsChecked: false },
              { Description: 'Literatur', IsChecked: false },
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
              { Description: 'Grammatik', IsChecked: true },
              { Description: 'Rechtschreibung', IsChecked: false },
              { Description: 'Literatur', IsChecked: false },
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
