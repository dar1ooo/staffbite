import { UserRole } from '../enums/user-role';
import { UserSkill, UserSkillGroup } from './user-skill.model';

export class User {
  UserId: number = 0;
  Username: string = '';
  Email: string = '';
  UserRole: UserRole = 0;
  SkillGroup: UserSkillGroup[] = [];
}
