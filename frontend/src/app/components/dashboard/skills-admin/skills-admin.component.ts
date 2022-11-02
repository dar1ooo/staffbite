import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Skill, Skills, User } from 'src/app/models';
import { SKillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.scss'],
})
export class SkillsAdminComponent implements OnInit {
  @Input()
  public user: User;

  public currentSkills: Skills[] = [];
  public newSkill: Skills = new Skills();
  public activeSkill: number = 1;

  constructor(
    private toastr: ToastrService,
    private skillService: SKillsService
  ) {}

  ngOnInit(): void {
    this.newSkill.SkillTopic = '';
    this.newSkill.Skills.push({
      SubSkills: [
        {
          Description: 'SubSkill 1',
          IsChecked: false,
          ShowPdf: false,
          PdfUrl: '',
          ShowVideo: false,
          VideoUrl: '',
        },
      ],
    });

    let mockedSkills = new Skills();
    mockedSkills = {
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
    };
    this.currentSkills.push(mockedSkills);
  }

  public saveSkill(): void {
    if (this.skillFormValid()) {
      this.skillService
        .saveNewSkill(this.user, this.currentSkills)
        .pipe(
          tap((data) => {
            this.toastr.success('Skill saved successfully');
            this.resetSkillForm();
          }),
          catchError((err) => {
            this.toastr.error('Error saving skill');
            return err;
          })
        )
        .subscribe();
    }
  }

  private skillFormValid(): boolean {
    // if (this.newSkill.SkillTopic === '' || this.newSkill.SkillTopic === null) {
    //   this.toastr.error('Please enter a skill topic');
    //   return false;
    // } else if (
    //   this.newSkill.Skills[0].Description === '' ||
    //   this.newSkill.Skills[0].Description === null
    // ) {
    //   this.toastr.error('Please enter a skill description for skill 1');
    //   return false;
    // } else if (
    //   this.newSkill.Skills[1].Description === '' ||
    //   this.newSkill.Skills[1].Description === null
    // ) {
    //   this.toastr.error('Please enter a skill description for skill 2');
    //   return false;
    // } else if (
    //   this.newSkill.Skills[2].Description === '' ||
    //   this.newSkill.Skills[2].Description === null
    // ) {
    //   this.toastr.error('Please enter a skill description for skill 3');
    //   return false;
    // } else {
    //   this.newSkill.SkillTopic = this.newSkill.SkillTopic.trim();
    //   this.newSkill.Skills[0] = this.newSkill.Skills[0];
    //   this.newSkill.Skills[1] = this.newSkill.Skills[1];
    //   this.newSkill.Skills[2] = this.newSkill.Skills[2];
    //   return true;
    // }
    return true;
  }

  private resetSkillForm(): void {
    // this.newSkill = new Skills();
    // for (let i = 0; i < 3; i++) {
    //   this.newSkill.Skills.push({
    //     Description: '',
    //     IsChecked: false,
    //     ShowPdf: false,
    //     PdfUrl: '',
    //     ShowVideo: false,
    //     VideoUrl: '',
    //     SubSkills: [
    //       {
    //         Description: 'SubSkill 1',
    //         IsChecked: false,
    //         ShowPdf: false,
    //         PdfUrl: '',
    //         ShowVideo: false,
    //         VideoUrl: '',
    //       },
    //     ],
    //   });
    // }
    // this.activeSkill = 1;
  }

  public changeSkill(skill: number): void {
    this.activeSkill = skill;
  }

  public onKeydown(event): void {
    event.preventDefault();
  }
}
