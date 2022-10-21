import { GroupModel } from './group.model';

export class RandomGroupsViewmodel {
  public topics: string[] = [];
  public students: string[] = [];
  public currentStudents: string = '';
  public currentTopics: string = '';
  public randomGroups: GroupModel[] = [];
}
