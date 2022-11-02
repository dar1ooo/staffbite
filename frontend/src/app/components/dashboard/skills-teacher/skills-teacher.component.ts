import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { Skills, User } from 'src/app/models';
import { SubSkill } from 'src/app/models/subskill.model';
import { SKillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills-teacher',
  templateUrl: './skills-teacher.component.html',
  styleUrls: ['./skills-teacher.component.scss'],
})
export class SkillsTeacherComponent implements OnInit {
  @Input()
  public user: User = new User();

  public totalSkills: number = 0;

  constructor(
    private skillsService: SKillsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.SkillProgress();
  }

  public CheckSkill(skill: SubSkill, SkillGroup: Skills): void {
    this.user.SkillGroup.find(
      (skillGroup) => skillGroup.SkillTopic === SkillGroup.SkillTopic
    ).Skills.find((s) => {
      s.SubSkills.forEach((subskill) => {
        if (subskill.Description === skill.Description) {
          subskill.IsChecked = !subskill.IsChecked;
        }
      });
    });
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.SkillProgress();
  }

  public saveSkills(): void {
    this.skillsService.updateSkillProgress(this.user).pipe(
      tap((result) => {
        this.toastr.success('Saving successful', 'Success');
      }),
      catchError((err) => {
        this.toastr.error('Saving failed', 'Failed');
        return err;
      })
    );
  }

  public SkillProgress() {
    let skillsChecked = 0;
    let totalSkills = 0;
    this.user.SkillGroup.forEach((skillGroup) => {
      skillGroup.Skills.forEach((skill) => {
        skill.SubSkills.forEach((subSkill) => {
          if (subSkill.IsChecked) {
            skillsChecked++;
          }
          totalSkills++;
        });
      });
    });
    this.totalSkills = Math.round((skillsChecked / totalSkills) * 100);
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
