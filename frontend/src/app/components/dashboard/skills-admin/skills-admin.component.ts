import { ThisReceiver } from '@angular/compiler';
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
  public editedSkill: Skills = new Skills();
  public beginnerDescription: string = '';
  public advancedDescription: string = '';
  public expertDescription: string = '';
  public pdfLink: string = '';
  public videoLink: string = '';
  public activeSkill: number = 1;
  public isEditing: boolean = false;
  public activeEditSubskillIndex: number = -1;
  public activeEditSubskillLevel: string;
  public editingSubSkill: boolean = false;
  public editedSkillIndex: number = -1;

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
        if (this.isEditing) {
          this.editedSkill.Skills[0].SubSkills.push(subSkill);
        } else {
          this.newSkill.Skills[0].SubSkills.push(subSkill);
        }
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
        if (this.isEditing) {
          this.editedSkill.Skills[1].SubSkills.push(subSkill);
        } else {
          this.newSkill.Skills[1].SubSkills.push(subSkill);
        }
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
        if (this.isEditing) {
          this.editedSkill.Skills[2].SubSkills.push(subSkill);
        } else {
          this.newSkill.Skills[2].SubSkills.push(subSkill);
        }
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
    this.beginnerDescription = '';
    this.advancedDescription = '';
    this.expertDescription = '';
    this.pdfLink = '';
    this.videoLink = '';
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

  public deleteSkill(index: number) {
    if (index > -1) {
      this.currentSkills.splice(index, 1);
      if (this.isEditing) {
        this.resetSkillForm();
        this.editedSkill = new Skills();
        this.isEditing = false;
      }
    }
  }

  public editSkill(selectedSkill: Skills, index: number) {
    let skill = selectedSkill;
    this.editedSkill = { ...skill };
    this.editedSkillIndex = index;
    this.activeSkill = 1;
    this.isEditing = true;
  }

  public editSusbkill(selectedSkill: SubSkill, index: number, level: string) {
    this.activeEditSubskillIndex = index;
    this.activeEditSubskillLevel = level;
    this.activeSkill = this.getSkillLevel(level);
    this.editingSubSkill = true;
    if (this.activeSkill === 1) {
      this.beginnerDescription = selectedSkill.Description;
    } else if (this.activeSkill === 2) {
      this.advancedDescription = selectedSkill.Description;
    } else if (this.activeSkill === 3) {
      this.expertDescription = selectedSkill.Description;
    }
    this.pdfLink = selectedSkill.PdfUrl;
    this.videoLink = selectedSkill.VideoUrl;
  }

  private getSkillLevel(level: string): number {
    switch (level) {
      case 'beginner':
        return 1;
      case 'advanced':
        return 2;
      case 'expert':
        return 3;
      default:
        return 1;
    }
  }

  public cancelEdit() {
    this.isEditing = false;
    this.resetSkillForm();
  }

  public saveEditedSubskill() {
    this.editingSubSkill = false;
    if (this.activeEditSubskillLevel === 'beginner') {
      this.editedSkill.Skills[0].SubSkills[
        this.activeEditSubskillIndex
      ].Description = this.beginnerDescription;

      this.editedSkill.Skills[0].SubSkills[
        this.activeEditSubskillIndex
      ].VideoUrl = this.videoLink;
      if (this.pdfLink !== null && this.pdfLink !== '') {
        this.editedSkill.Skills[0].SubSkills[
          this.activeEditSubskillIndex
        ].ShowPdf = true;
        this.editedSkill.Skills[0].SubSkills[
          this.activeEditSubskillIndex
        ].PdfUrl = this.pdfLink;
      }
      if (this.videoLink !== null && this.videoLink !== '') {
        this.editedSkill.Skills[0].SubSkills[
          this.activeEditSubskillIndex
        ].ShowVideo = true;
        this.editedSkill.Skills[0].SubSkills[
          this.activeEditSubskillIndex
        ].VideoUrl = this.pdfLink;
      }
    }
    if (this.activeEditSubskillLevel === 'advanced') {
      this.editedSkill.Skills[1].SubSkills[
        this.activeEditSubskillIndex
      ].Description = this.advancedDescription;
      this.editedSkill.Skills[1].SubSkills[
        this.activeEditSubskillIndex
      ].PdfUrl = this.pdfLink;
      this.editedSkill.Skills[1].SubSkills[
        this.activeEditSubskillIndex
      ].VideoUrl = this.videoLink;
      if (this.pdfLink !== null && this.pdfLink !== '') {
        this.editedSkill.Skills[1].SubSkills[
          this.activeEditSubskillIndex
        ].ShowPdf = true;
        this.editedSkill.Skills[1].SubSkills[
          this.activeEditSubskillIndex
        ].PdfUrl = this.pdfLink;
      }
      if (this.videoLink !== null && this.videoLink !== '') {
        this.editedSkill.Skills[1].SubSkills[
          this.activeEditSubskillIndex
        ].ShowVideo = true;
        this.editedSkill.Skills[1].SubSkills[
          this.activeEditSubskillIndex
        ].VideoUrl = this.pdfLink;
      }
    }
    if (this.activeEditSubskillLevel === 'expert') {
      this.editedSkill.Skills[2].SubSkills[
        this.activeEditSubskillIndex
      ].Description = this.expertDescription;
      this.editedSkill.Skills[2].SubSkills[
        this.activeEditSubskillIndex
      ].PdfUrl = this.pdfLink;
      this.editedSkill.Skills[2].SubSkills[
        this.activeEditSubskillIndex
      ].VideoUrl = this.videoLink;
      if (this.pdfLink !== null && this.pdfLink !== '') {
        this.editedSkill.Skills[2].SubSkills[
          this.activeEditSubskillIndex
        ].ShowPdf = true;
        this.editedSkill.Skills[2].SubSkills[
          this.activeEditSubskillIndex
        ].PdfUrl = this.pdfLink;
      }
      if (this.videoLink !== null && this.videoLink !== '') {
        this.editedSkill.Skills[2].SubSkills[
          this.activeEditSubskillIndex
        ].ShowVideo = true;
        this.editedSkill.Skills[2].SubSkills[
          this.activeEditSubskillIndex
        ].VideoUrl = this.pdfLink;
      }
    }
    this.currentSkills[this.editedSkillIndex] = this.editedSkill;
    this.resetSkillForm();
  }

  public saveEditedSkill() {
    this.currentSkills[this.editedSkillIndex] = this.editedSkill;
    this.isEditing = false;
    this.resetSkillForm();
  }

  public deleteSubskill() {
    this.editingSubSkill = false;
    if (this.activeEditSubskillLevel === 'beginner') {
      this.editedSkill.Skills[0].SubSkills.splice(
        this.activeEditSubskillIndex,
        1
      );
    }
    if (this.activeEditSubskillLevel === 'advanced') {
      this.editedSkill.Skills[1].SubSkills.splice(
        this.activeEditSubskillIndex,
        1
      );
    }
    if (this.activeEditSubskillLevel === 'expert') {
      this.editedSkill.Skills[2].SubSkills.splice(
        this.activeEditSubskillIndex,
        1
      );
    }
    this.resetSkillForm();
  }
}
