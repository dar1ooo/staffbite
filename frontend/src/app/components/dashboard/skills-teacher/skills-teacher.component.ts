import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { TeacherSkills, User } from 'src/app/models';
import { SubSkill } from 'src/app/models/subskill.model';
import { SkillsService } from 'src/app/services/skills.service';

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
    private skillsService: SkillsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.SkillProgress();
  }

  public CheckSkill(skill: SubSkill, SkillGroup: TeacherSkills): void {
    this.skillsService.updateSkillProgress(this.user).pipe(
      tap((result) => {
        this.toastr.success('Saving successful', 'Success');
      }),
      catchError((err) => {
        this.toastr.error('Saving failed', 'Failed');
        return err;
      })
    );

    this.user.teacherSkills
      .find((skillGroup) => skillGroup.skillTopic === SkillGroup.skillTopic)
      .skills.find((s) => {
        s.subSkills.forEach((subskill) => {
          if (subskill.description === skill.description) {
            subskill.isChecked = !subskill.isChecked;
          }
        });
      });
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.SkillProgress();
  }

  public SkillProgress() {
    let skillsChecked = 0;
    let totalSkills = 0;
    this.user.teacherSkills.forEach((skillGroup) => {
      skillGroup.skills.forEach((skill) => {
        skill.subSkills.forEach((subSkill) => {
          if (subSkill.isChecked) {
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
    window.open(selectedSkill.pdfUrl, '_blank');
  }

  public openVideo(selectedSkill: SubSkill, e: Event) {
    if (e && e.stopPropagation) e.stopPropagation();

    window.open(selectedSkill.videoUrl, '_blank');
  }
}
