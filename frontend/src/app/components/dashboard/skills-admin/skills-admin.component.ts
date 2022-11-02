import { Component, Input, OnInit } from '@angular/core';
import { defaultUrlMatcher } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Skill, Skills, User } from 'src/app/models';
import { SubSkill } from 'src/app/models/subskill.model';
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
  public beginnerDescription: string = '';
  public advancedDescription: string = '';
  public expertDescription: string = '';
  public pdfLink: string = '';
  public videoLink: string = '';
  public activeSkill: number = 1;

  constructor(
    private toastr: ToastrService,
    private skillService: SKillsService
  ) {}

  ngOnInit(): void {
    this.newSkill.SkillTopic = '';
    this.newSkill.Skills = [];
    this.newSkill.Skills.push(new Skill());
    this.newSkill.Skills.push(new Skill());
    this.newSkill.Skills.push(new Skill());

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
      this.currentSkills.push(this.newSkill);
      this.resetSkillForm();
      // this.skillService
      //   .saveNewSkill(this.user, this.currentSkills)
      //   .pipe(
      //     tap((data) => {
      //       this.toastr.success('Skill saved successfully');
      //     }),
      //     catchError((err) => {
      //       this.toastr.error('Error saving skill');
      //       return err;
      //     })
      //   )
      //   .subscribe();
    }
  }

  public addSubSkill(): void {
    let subSkill = new SubSkill();

    switch (this.activeSkill) {
      case 1:
        if (
          this.beginnerDescription === null ||
          this.beginnerDescription === ''
        ) {
          return;
        }

        if (this.pdfLink !== null && this.pdfLink !== '') {
          subSkill.ShowPdf = true;
          subSkill.PdfUrl = this.pdfLink;
        }
        if (this.videoLink !== null && this.videoLink !== '') {
          subSkill.ShowVideo = true;
          subSkill.VideoUrl = this.videoLink;
        }

        subSkill.Description = this.beginnerDescription;
        this.newSkill.Skills[0].SubSkills.push(subSkill);
        this.beginnerDescription = '';
        break;

      case 2:
        if (
          this.advancedDescription === null ||
          this.advancedDescription === ''
        ) {
          return;
        }
        if (this.pdfLink !== null && this.pdfLink !== '') {
          subSkill.ShowPdf = true;
          subSkill.PdfUrl = this.pdfLink;
        }
        if (this.videoLink !== null && this.videoLink !== '') {
          subSkill.ShowVideo = true;
          subSkill.VideoUrl = this.videoLink;
        }

        subSkill.Description = this.advancedDescription;
        this.newSkill.Skills[1].SubSkills.push(subSkill);
        this.advancedDescription = '';

        break;
      case 3:
        if (this.expertDescription === null || this.expertDescription === '') {
          return;
        }
        if (this.pdfLink !== null && this.pdfLink !== '') {
          subSkill.ShowPdf = true;
          subSkill.PdfUrl = this.pdfLink;
        }
        if (this.videoLink !== null && this.videoLink !== '') {
          subSkill.ShowVideo = true;
          subSkill.VideoUrl = this.videoLink;
        }

        subSkill.Description = this.expertDescription;
        this.newSkill.Skills[2].SubSkills.push(subSkill);
        this.expertDescription = '';

        break;
      default:
        return;
    }
    this.pdfLink = '';
    this.videoLink = '';
  }

  private skillFormValid(): boolean {
    if (this.newSkill.SkillTopic === '' || this.newSkill.SkillTopic === null) {
      this.toastr.error('Please enter a skill topic');
      return false;
    } else if (this.newSkill.Skills[0].SubSkills.length === 0) {
      this.toastr.error('Please enter at least one subskill for beginner');
      return false;
    } else if (this.newSkill.Skills[1].SubSkills.length === 0) {
      this.toastr.error('Please enter at least one subskill for advanced');
      return false;
    } else if (this.newSkill.Skills[2].SubSkills.length === 0) {
      this.toastr.error('Please enter at least one subskill for expert');
      return false;
    } else {
      this.newSkill.SkillTopic = this.newSkill.SkillTopic.trim();
      this.newSkill.Skills[0] = this.newSkill.Skills[0];
      this.newSkill.Skills[1] = this.newSkill.Skills[1];
      this.newSkill.Skills[2] = this.newSkill.Skills[2];
      return true;
    }
  }

  private resetSkillForm(): void {
    this.newSkill = new Skills();
    this.newSkill.SkillTopic = '';
    this.newSkill.Skills = [];
    this.newSkill.Skills.push(new Skill());
    this.newSkill.Skills.push(new Skill());
    this.newSkill.Skills.push(new Skill());
    this.activeSkill = 1;
  }

  public changeSkill(skill: number): void {
    this.activeSkill = skill;
  }

  public openPdf(selectedSkill: SubSkill, e: Event) {
    if (e && e.stopPropagation) e.stopPropagation();
    window.open(selectedSkill.PdfUrl, '_blank');
  }

  public openVideo(selectedSkill: SubSkill, e: Event) {
    if (e && e.stopPropagation) e.stopPropagation();

    window.open(selectedSkill.VideoUrl, '_blank');
  }
}
