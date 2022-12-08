import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetailComponent implements OnInit {
  @Input()
  public teacher: User = new User();

  public totalSkills = 0;

  constructor() {}

  ngOnInit(): void {
    this.SkillProgress();
  }

  public SkillProgress() {
    let skillsChecked = 0;
    let totalSkills = 0;
    this.teacher.teacherSkills.forEach((skillGroup) => {
      skillGroup.skillLevels.forEach((skill) => {
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
}
