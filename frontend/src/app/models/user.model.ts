import { UserRole } from '../enums/user-role';
import { TeacherSkills } from './skills.model';

export class User {
  id: string = '';
  username: string = '';
  email: string = '';
  userRole: UserRole = 0;
  teacherSkills: TeacherSkills[] = [];
}
