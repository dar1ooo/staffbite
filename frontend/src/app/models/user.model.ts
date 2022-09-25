import { UserRole } from '../enums/user-role';

export class User {
  UserId: number = 0;
  Username: string = '';
  UserRole: UserRole = 0;
  UserPortfolio: string = '';
}
