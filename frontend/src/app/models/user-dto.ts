import { UserRole } from '../enums/user-role';
import { TeacherSkills } from './teacherskills.model';

export interface IUser {
  id: string;
  username: string;
  email: string;
  userRole: UserRole;
  teacherSkills: TeacherSkills[];
}
