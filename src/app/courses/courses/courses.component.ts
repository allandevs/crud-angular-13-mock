import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from '../models/course';
import { ErroGeral } from '../models/erro-geral';
import { CoursesService } from '../services/courses.service';
import { ErrorDialogComponent } from './../../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courses$!: Observable<Course[]>
  displayedColumns = ['name', 'category']

  constructor(private coursesService: CoursesService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const mock: Course[] = [
      { "id": "1", "nome": "Angular Mock", "categoria": "front-end" },
      { "id": "2", "nome": "Spring", "categoria": "back-end" }
    ]
    
    this.courses$ = this.coursesService.list().pipe(
      catchError(err => {
        this.onError('Não foi possivel retornar os dados da api. Os dado exibidos estão mockados')
        // throw new ErroGeral(err)
        return of(mock)
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }
}
