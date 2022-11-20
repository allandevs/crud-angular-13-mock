import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { ErrorDialogComponent } from '../../../shared/components/error-dialog/error-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from 'src/app/shared/components/confimation-dialog/confimation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public courses$!: Observable<Course[]>;
  displayedColumns = ['name', 'category', 'actions']

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { this.montarMockCursos(); }

  ngOnInit(): void {
    this.getCourses();
  }

  public getCourses() {
    this.courses$ = this.coursesService.list().pipe(
      catchError(err => {
        this.onError('Não foi possivel retornar os dados da api. As informações exibidas estão mockadas')
        // throw new ErroGeral(err)
        //TODO Caso apresente um erro ao tentar carregar lista via serviço, vai retornar o mock, dessa forma a lista é renderizada
        return of(this.retornaMockCursos())
      })
    )
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  addCourse() {
    this.router.navigate(['new-course'], { relativeTo: this.route })
  }

  editCourse(course: Course) {
    this.router.navigate(['edit-course/', course.id], { relativeTo: this.route })
  }

  deleteCourse(course: Course) {
    const dialogRef = this.dialog.open(ConfimationDialogComponent, {
      data: `Tem certeza que deseja remover o curso ${course.nome}?`,
    });

    dialogRef.afterClosed().subscribe((res: boolean) => {
      // se o Res retorna true, ação delete é executada.
      if (res) {
        this.coursesService.deleteCourse(course.id).subscribe(() => {
          this._snackBar.open(`Curso ${course.nome} removido com sucesso!`, 'X', {
            duration: 5000,
            verticalPosition: 'bottom',
            horizontalPosition: 'center'
          });
          this.getCourses();
        }, () => {
          this.onError('Houve um erro ao tentar remover o curso')
        })
      }
    })

  }

  public montarMockCursos() {
    const mock: Course[] = [
      { "id": "1", "nome": "Angular Mock", "categoria": "front-end" },
      { "id": "2", "nome": "Spring", "categoria": "back-end" }
    ]
    const isCourseMock = localStorage.getItem('courses')
    if (!isCourseMock) {
      localStorage.setItem('courses', JSON.stringify(mock));
    }
  }

  public retornaMockCursos() {
    const mock: any = localStorage.getItem('courses')
    const courses: Course[] = JSON.parse(mock)
    return courses;
  }
}
