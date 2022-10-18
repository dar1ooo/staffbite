import { UserRole } from '../enums/user-role';
import { Skills } from './skills.model';

export class User {
  UserId: number = 0;
  Username: string = '';
  Email: string = '';
  UserRole: UserRole = 0;
  SkillGroup: Skills[] = [];
}
