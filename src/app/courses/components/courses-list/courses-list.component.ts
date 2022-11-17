import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../../models/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  @Input() public courses!: Course[];
  @Output() public add = new EventEmitter(false);

  public readonly displayedColumns = ['name', 'category', 'actions']
  constructor() { }

  ngOnInit(): void {
  }

  addCourse() {
    this.add.emit()
  }

}
