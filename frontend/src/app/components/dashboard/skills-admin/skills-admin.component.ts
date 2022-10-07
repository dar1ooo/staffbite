import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-skills-admin',
  templateUrl: './skills-admin.component.html',
  styleUrls: ['./skills-admin.component.scss'],
})
export class SkillsAdminComponent implements OnInit {
  @Input()
  public user: User = new User();
  constructor() {}

  ngOnInit(): void {}
}
