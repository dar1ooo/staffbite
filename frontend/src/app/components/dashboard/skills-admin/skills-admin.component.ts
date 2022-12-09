import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { SkillLevel, TeacherSkills, User, UserSignup } from 'src/app/models';
import { SubSkill } from 'src/app/models/subskill.model';
import { SkillsService } from 'src/app/services/skills.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.scss'],
})
export class SkillsAdminComponent implements OnInit {
  @Input()
  public user: User;

  public currentSkills: TeacherSkills[] = [];
  public newSkill: TeacherSkills = new TeacherSkills();
  public editedSkill: TeacherSkills = new TeacherSkills();
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
    private skillService: SkillsService
  ) {}

  ngOnInit(): void {
    this.newSkill.skillTopic = '';
    this.newSkill.skillLevels = [];
    this.newSkill.skillLevels.push(new SkillLevel());
    this.newSkill.skillLevels.push(new SkillLevel());
    this.newSkill.skillLevels.push(new SkillLevel());

    this.skillService
      .getSkills()
      .pipe(
        tap((res) => {
          this.currentSkills = res;
        }),
        catchError((err) => {
          this.toastr.error('Error getting skills');
          return err;
        })
      )
      .subscribe();
  }

  public saveSkill(): void {
    if (this.skillFormValid()) {
      this.currentSkills.push(this.newSkill);
      this.resetSkillForm();

      this.skillService
        .saveSkills(this.currentSkills)
        .pipe(
          tap((res) => {
            this.toastr.success('Skills saved successfully');
          }),
          catchError((err) => {
            this.toastr.error('Error saving skills');
            return err;
          })
        )
        .subscribe();
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
          subSkill.showPdf = true;
          subSkill.pdfUrl = this.pdfLink;
        }
        if (this.videoLink !== null && this.videoLink !== '') {
          subSkill.showVideo = true;
          subSkill.videoUrl = this.videoLink;
        }

        subSkill.description = this.beginnerDescription;
        if (this.isEditing) {
          this.editedSkill.skillLevels[0].subSkills.push(subSkill);
        } else {
          this.newSkill.skillLevels[0].subSkills.push(subSkill);
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
          subSkill.showPdf = true;
          subSkill.pdfUrl = this.pdfLink;
        }
        if (this.videoLink !== null && this.videoLink !== '') {
          subSkill.showVideo = true;
          subSkill.videoUrl = this.videoLink;
        }

        subSkill.description = this.advancedDescription;
        if (this.isEditing) {
          this.editedSkill.skillLevels[1].subSkills.push(subSkill);
        } else {
          this.newSkill.skillLevels[1].subSkills.push(subSkill);
        }
        this.advancedDescription = '';

        break;
      case 3:
        if (this.expertDescription === null || this.expertDescription === '') {
          return;
        }
        if (this.pdfLink !== null && this.pdfLink !== '') {
          subSkill.showPdf = true;
          subSkill.pdfUrl = this.pdfLink;
        }
        if (this.videoLink !== null && this.videoLink !== '') {
          subSkill.showVideo = true;
          subSkill.videoUrl = this.videoLink;
        }

        subSkill.description = this.expertDescription;
        if (this.isEditing) {
          this.editedSkill.skillLevels[2].subSkills.push(subSkill);
        } else {
          this.newSkill.skillLevels[2].subSkills.push(subSkill);
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
    if (this.newSkill.skillTopic === '' || this.newSkill.skillTopic === null) {
      this.toastr.error('Please enter a skill topic');
      return false;
    } else if (this.newSkill.skillTopic.length > 25) {
      this.toastr.error('Skill topic cannot be more than 25 characters');
      return false;
    } else if (this.newSkill.skillLevels[0].subSkills.length === 0) {
      this.toastr.error('Please enter at least one subskill for beginner');
      return false;
    } else if (this.newSkill.skillLevels[1].subSkills.length === 0) {
      this.toastr.error('Please enter at least one subskill for advanced');
      return false;
    } else if (this.newSkill.skillLevels[2].subSkills.length === 0) {
      this.toastr.error('Please enter at least one subskill for expert');
      return false;
    } else {
      this.newSkill.skillTopic = this.newSkill.skillTopic.trim();
      this.newSkill.skillLevels[0] = this.newSkill.skillLevels[0];
      this.newSkill.skillLevels[1] = this.newSkill.skillLevels[1];
      this.newSkill.skillLevels[2] = this.newSkill.skillLevels[2];
      return true;
    }
  }

  private resetSkillForm(): void {
    this.newSkill = new TeacherSkills();
    this.newSkill.skillTopic = '';
    this.newSkill.skillLevels = [];
    this.newSkill.skillLevels.push(new SkillLevel());
    this.newSkill.skillLevels.push(new SkillLevel());
    this.newSkill.skillLevels.push(new SkillLevel());
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
    window.open(selectedSkill.pdfUrl, '_blank');
  }

  public openVideo(selectedSkill: SubSkill, e: Event) {
    if (e && e.stopPropagation) e.stopPropagation();

    window.open(selectedSkill.videoUrl, '_blank');
  }

  public deleteSkill(index: number) {
    if (index > -1) {
      this.currentSkills.splice(index, 1);
      if (this.isEditing) {
        this.resetSkillForm();
        this.editedSkill = new TeacherSkills();
        this.isEditing = false;
      }
    }
  }

  public editSkill(selectedSkill: TeacherSkills, index: number) {
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
      this.beginnerDescription = selectedSkill.description;
    } else if (this.activeSkill === 2) {
      this.advancedDescription = selectedSkill.description;
    } else if (this.activeSkill === 3) {
      this.expertDescription = selectedSkill.description;
    }
    this.pdfLink = selectedSkill.pdfUrl;
    this.videoLink = selectedSkill.videoUrl;
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
      this.editedSkill.skillLevels[0].subSkills[
        this.activeEditSubskillIndex
      ].description = this.beginnerDescription;

      this.editedSkill.skillLevels[0].subSkills[
        this.activeEditSubskillIndex
      ].videoUrl = this.videoLink;
      if (this.pdfLink !== null && this.pdfLink !== '') {
        this.editedSkill.skillLevels[0].subSkills[
          this.activeEditSubskillIndex
        ].showPdf = true;
        this.editedSkill.skillLevels[0].subSkills[
          this.activeEditSubskillIndex
        ].pdfUrl = this.pdfLink;
      }
      if (this.videoLink !== null && this.videoLink !== '') {
        this.editedSkill.skillLevels[0].subSkills[
          this.activeEditSubskillIndex
        ].showVideo = true;
        this.editedSkill.skillLevels[0].subSkills[
          this.activeEditSubskillIndex
        ].videoUrl = this.pdfLink;
      }
    }
    if (this.activeEditSubskillLevel === 'advanced') {
      this.editedSkill.skillLevels[1].subSkills[
        this.activeEditSubskillIndex
      ].description = this.advancedDescription;
      this.editedSkill.skillLevels[1].subSkills[
        this.activeEditSubskillIndex
      ].pdfUrl = this.pdfLink;
      this.editedSkill.skillLevels[1].subSkills[
        this.activeEditSubskillIndex
      ].videoUrl = this.videoLink;
      if (this.pdfLink !== null && this.pdfLink !== '') {
        this.editedSkill.skillLevels[1].subSkills[
          this.activeEditSubskillIndex
        ].showPdf = true;
        this.editedSkill.skillLevels[1].subSkills[
          this.activeEditSubskillIndex
        ].pdfUrl = this.pdfLink;
      }
      if (this.videoLink !== null && this.videoLink !== '') {
        this.editedSkill.skillLevels[1].subSkills[
          this.activeEditSubskillIndex
        ].showVideo = true;
        this.editedSkill.skillLevels[1].subSkills[
          this.activeEditSubskillIndex
        ].videoUrl = this.pdfLink;
      }
    }
    if (this.activeEditSubskillLevel === 'expert') {
      this.editedSkill.skillLevels[2].subSkills[
        this.activeEditSubskillIndex
      ].description = this.expertDescription;
      this.editedSkill.skillLevels[2].subSkills[
        this.activeEditSubskillIndex
      ].pdfUrl = this.pdfLink;
      this.editedSkill.skillLevels[2].subSkills[
        this.activeEditSubskillIndex
      ].videoUrl = this.videoLink;
      if (this.pdfLink !== null && this.pdfLink !== '') {
        this.editedSkill.skillLevels[2].subSkills[
          this.activeEditSubskillIndex
        ].showPdf = true;
        this.editedSkill.skillLevels[2].subSkills[
          this.activeEditSubskillIndex
        ].pdfUrl = this.pdfLink;
      }
      if (this.videoLink !== null && this.videoLink !== '') {
        this.editedSkill.skillLevels[2].subSkills[
          this.activeEditSubskillIndex
        ].showVideo = true;
        this.editedSkill.skillLevels[2].subSkills[
          this.activeEditSubskillIndex
        ].videoUrl = this.pdfLink;
      }
    }
    this.currentSkills[this.editedSkillIndex] = this.editedSkill;
    this.resetSkillForm();
  }

  public saveEditedSkill() {
    this.currentSkills[this.editedSkillIndex] = this.editedSkill;
    this.skillService
      .saveSkills(this.currentSkills)
      .pipe(
        tap((res) => {
          this.toastr.success('Skills saved successfully');
          this.resetSkillForm();
          this.isEditing = false;
        }),
        catchError((err) => {
          this.toastr.error('Error saving skills');
          return err;
        })
      )
      .subscribe();
  }

  public deleteSubskill() {
    this.editingSubSkill = false;
    if (this.activeEditSubskillLevel === 'beginner') {
      this.editedSkill.skillLevels[0].subSkills.splice(
        this.activeEditSubskillIndex,
        1
      );
    }
    if (this.activeEditSubskillLevel === 'advanced') {
      this.editedSkill.skillLevels[1].subSkills.splice(
        this.activeEditSubskillIndex,
        1
      );
    }
    if (this.activeEditSubskillLevel === 'expert') {
      this.editedSkill.skillLevels[2].subSkills.splice(
        this.activeEditSubskillIndex,
        1
      );
    }
    this.resetSkillForm();
  }
}
