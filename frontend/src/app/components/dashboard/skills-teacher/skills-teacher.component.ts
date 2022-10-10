import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Skill, Skills } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';
import { SKillsService } from 'src/app/services/skills.service';

@Component({
  selector: 'app-skills-teacher',
  templateUrl: './skills-teacher.component.html',
  styleUrls: ['./skills-teacher.component.scss'],
})
export class SkillsTeacherComponent {
  @Input()
  public user: User = new User();
  constructor(
    private skillsService: SKillsService,
    private toastr: ToastrService
  ) {}

  public CheckSkill(skill: Skill, SkillGroup: Skills): void {
    this.user.SkillGroup.find(
      (skillGroup) => skillGroup.SkillTopic === SkillGroup.SkillTopic
    ).Skills.find((s) => s.Description === skill.Description).IsChecked =
      !skill.IsChecked;
    sessionStorage.setItem('user', JSON.stringify(this.user));
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
}
