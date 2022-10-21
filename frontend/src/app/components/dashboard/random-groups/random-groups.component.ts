import { Component } from '@angular/core';
import { GroupModel, RandomGroupsViewmodel } from './models';

@Component({
  selector: 'app-random-groups',
  templateUrl: './random-groups.component.html',
  styleUrls: ['./random-groups.component.scss'],
})
export class RandomGroupsComponent {
  public viewmodel: RandomGroupsViewmodel = new RandomGroupsViewmodel();

  constructor() {}

  public back(): void {
    this.viewmodel.randomGroups = [];
  }

  public save(): void {
    this.viewmodel.randomGroups = [];
    const students: string[] = this.shuffle(
      this.viewmodel.currentStudents.split(',').map((student) => student.trim())
    );
    const topics: string[] = this.shuffle(
      this.viewmodel.currentTopics.split(',').map((topic) => topic.trim())
    );
    const studentsPerGroup: number = Math.floor(
      students.length / topics.length
    );
    topics.forEach((topic) => {
      const group = new GroupModel();
      group.Topic = topic;
      for (let i = 0; i < studentsPerGroup; i++) {
        const student = students.splice(
          Math.floor(Math.random() * students.length),
          1
        );
        group.Students.push(student[0]);
      }
      this.viewmodel.randomGroups.push(group);
    });

    if (students.length > 0) {
      const studentsLeft = students.length;
      for (let i = 0; i < studentsLeft; i++) {
        this.viewmodel.randomGroups[i].Students.push(students.pop());
      }
    }

    const maxStudentsInGroup = this.viewmodel.randomGroups[0].Students.length;
    this.viewmodel.randomGroups.forEach((group) => {
      if (group.Students.length < maxStudentsInGroup) {
        group.Students.push(' ');
      }
    });
  }

  private shuffle(students: string[]) {
    // suffle the students list
    for (
      var j, x, i = students.length;
      i;
      j = Math.floor(Math.random() * i),
        x = students[--i],
        students[i] = students[j],
        students[j] = x
    );
    return students;
  }
}
