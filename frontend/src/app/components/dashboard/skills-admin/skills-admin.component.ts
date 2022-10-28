import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Skills, User } from 'src/app/models';
import { SKillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.scss'],
})
export class SkillsAdminComponent implements OnInit {
  @Input()
  public user: User = new User();

  public newSkill: Skills = new Skills();

  public activeSkill: number = 1;

  constructor(
    private toastr: ToastrService,
    private skillService: SKillsService
  ) {}

  ngOnInit(): void {
    this.newSkill.SkillTopic = '';
    this.newSkill.Skills.push({
      Description: '',
      IsChecked: false,
      ShowPdf: false,
      PdfUrl: '',
      ShowVideo: false,
      VideoUrl: '',
    });
    this.newSkill.Skills.push({
      Description: '',
      IsChecked: false,
      ShowPdf: false,
      PdfUrl: '',
      ShowVideo: false,
      VideoUrl: '',
    });
    this.newSkill.Skills.push({
      Description: '',
      IsChecked: false,
      ShowPdf: false,
      PdfUrl: '',
      ShowVideo: false,
      VideoUrl: '',
    });
  }

  public saveSkill(): void {
    if (this.skillFormValid()) {
      this.skillService
        .saveNewSkill(this.user, this.newSkill)
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
    if (this.newSkill.SkillTopic === '' || this.newSkill.SkillTopic === null) {
      this.toastr.error('Please enter a skill topic');
      return false;
    } else if (
      this.newSkill.Skills[0].Description === '' ||
      this.newSkill.Skills[0].Description === null
    ) {
      this.toastr.error('Please enter a skill description for skill 1');
      return false;
    } else if (
      this.newSkill.Skills[1].Description === '' ||
      this.newSkill.Skills[1].Description === null
    ) {
      this.toastr.error('Please enter a skill description for skill 2');
      return false;
    } else if (
      this.newSkill.Skills[2].Description === '' ||
      this.newSkill.Skills[2].Description === null
    ) {
      this.toastr.error('Please enter a skill description for skill 3');
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
    for (let i = 0; i < 3; i++) {
      this.newSkill.Skills.push({
        Description: '',
        IsChecked: false,
        ShowPdf: false,
        PdfUrl: '',
        ShowVideo: false,
        VideoUrl: '',
      });
    }

    this.activeSkill = 1;
  }

  public changeSkill(skill: number): void {
    this.activeSkill = skill;
  }

  public onKeydown(event): void {
    event.preventDefault();
  }
}
