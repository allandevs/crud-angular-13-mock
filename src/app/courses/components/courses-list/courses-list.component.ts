import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent {
  @Input() public courses!: Course[];
  @Output() public add = new EventEmitter(false);
  @Output() public edit = new EventEmitter(false);
  @Output() public delete = new EventEmitter(false);

  public readonly displayedColumns = ['name', 'category', 'actions']
  constructor() { }

  public addCourse() {
    this.add.emit()
  }

  public editCourse(course: Course) {
    this.edit.emit(course);
  }

  public deleteCourse(course: Course) {
    this.delete.emit(course);
  }
}
