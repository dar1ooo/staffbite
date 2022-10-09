import { Component, Input, OnInit } from '@angular/core';
import { Skills } from 'src/app/models/skill.model';
import { User } from 'src/app/models/user.model';

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

  constructor() {}

  ngOnInit(): void {
    this.newSkill.SkillTopic = '';
    this.newSkill.Skills.push({ Description: '', IsChecked: false });
    this.newSkill.Skills.push({ Description: '', IsChecked: false });
    this.newSkill.Skills.push({ Description: '', IsChecked: false });
  }

  public saveSkill(): void {
    debugger;
    this.user.SkillGroup.push(this.newSkill);
    this.newSkill.SkillTopic = '';
    this.newSkill = new Skills();
    this.newSkill.Skills.push({ Description: '', IsChecked: false });
    this.newSkill.Skills.push({ Description: '', IsChecked: false });
    this.newSkill.Skills.push({ Description: '', IsChecked: false });
  }

  public changeSkill(skill: number): void {
    this.activeSkill = skill;
  }

  public onKeydown(event): void {
    event.preventDefault();
  }
}
