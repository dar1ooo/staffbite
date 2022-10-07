export class UserSkill {
  Description: string = '';
  IsChecked: boolean = false;
}

export class UserSkillGroup {
  SkillGroupName: string = '';
  Skills: UserSkill[] = [];
}
