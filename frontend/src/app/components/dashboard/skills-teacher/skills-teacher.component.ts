import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skill, Skills, User } from 'src/app/models';
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

  public CheckSkill(skill: Skill, SkillGroup: Skills): void {
    this.user.SkillGroup.find(
      (skillGroup) => skillGroup.SkillTopic === SkillGroup.SkillTopic
    ).Skills.find((s) => s.Description === skill.Description).IsChecked =
      !skill.IsChecked;
    sessionStorage.setItem('user', JSON.stringify(this.user));
    this.SkillProgress();
  }

  public saveSkills(): void {
    this.skillsService.updateSkillProgress(this.user).subscribe(
      (result) => {
        this.toastr.success('Saving successful', 'Success');
      },
      (error) => {
        this.toastr.error('Saving failed', 'Failed');
      }
    );
  }

  public SkillProgress() {
    let skillsChecked = 0;
    let totalSkills = 0;
    this.user.SkillGroup.forEach((skillGroup) => {
      skillGroup.Skills.forEach((skill) => {
        if (skill.IsChecked) {
          skillsChecked++;
        }
        totalSkills++;
      });
    });
    this.totalSkills = Math.round((skillsChecked / totalSkills) * 100);
  }

  public openPdf(selectedSkill: Skill) {
    window.open(selectedSkill.PdfUrl, '_blank');
  }

  public openVideo(selectedSkill: Skill) {
    window.open(selectedSkill.VideoUrl, '_blank');
  }
}
