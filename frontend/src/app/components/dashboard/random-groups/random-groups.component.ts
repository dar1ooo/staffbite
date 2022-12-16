import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GroupModel, RandomGroupsViewmodel } from './models';

@Component({
  selector: 'app-random-groups',
  templateUrl: './random-groups.component.html',
  styleUrls: ['./random-groups.component.scss'],
})
export class RandomGroupsComponent {
  public viewmodel: RandomGroupsViewmodel = new RandomGroupsViewmodel();
  public showHintStudents: boolean = false;
  public showHintTopics: boolean = false;

  constructor(private toastr: ToastrService) {}

  public back(): void {
    this.viewmodel.randomGroups = [];
  }

  /**
   *Creates a new randomized order of students and groups.
   *If Lists are uneven the last group will have less students.
   * @return {*}  {void}
   * @memberof RandomGroupsComponent
   */
  public save(): void {
    this.viewmodel.randomGroups = [];
    const students: string[] = this.shuffle(
      this.viewmodel.currentStudents.split(',').map((student) => student.trim())
    );
    const topics: string[] = this.shuffle(
      this.viewmodel.currentTopics.split(',').map((topic) => topic.trim())
    );
    if (students.includes('')) {
      this.toastr.error(
        'Your Students list is incorrect. Please check it and try again.'
      );
      this.showHintStudents = true;
      return;
    }
    if (topics.includes('')) {
      this.toastr.error(
        'Your Topics list is incorrect. Please check it and try again.'
      );
      this.showHintTopics = true;
      return;
    }

    this.showHintTopics = false;
    this.showHintStudents = false;

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

  /**
   *Randomizes a list of strings
   *
   * @private
   * @param {string[]} array
   * @return {*}
   * @memberof RandomGroupsComponent
   */
  private shuffle(array: string[]) {
    for (
      var j, x, i = array.length;
      i;
      j = Math.floor(Math.random() * i),
        x = array[--i],
        array[i] = array[j],
        array[j] = x
    );
    return array;
  }
}
