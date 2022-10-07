import { Component, Input } from '@angular/core';
import { UserSkill, UserSkillGroup } from 'src/app/models/user-skill.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-skills-teacher',
  templateUrl: './skills-teacher.component.html',
  styleUrls: ['./skills-teacher.component.scss'],
})
export class SkillsTeacherComponent {
  @Input()
  public user: User = new User();
  constructor() {}

  public CheckSkill(skill: UserSkill, SkillGroup: UserSkillGroup): void {
    this.user.SkillGroup.find(
      (skillGroup) => skillGroup.SkillGroupName === SkillGroup.SkillGroupName
    ).Skills.find((s) => s.Description === skill.Description).IsChecked =
      !skill.IsChecked;
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }

  public saveSkills(): void {
    sessionStorage.setItem('user', JSON.stringify(this.user));
  }
}
