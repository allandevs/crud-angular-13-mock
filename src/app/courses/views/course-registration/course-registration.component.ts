import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from './../../models/course';


@Component({
  selector: 'app-course-registration',
  templateUrl: './course-registration.component.html',
  styleUrls: ['./course-registration.component.scss']
})
export class CourseRegistrationComponent implements OnInit {

  public registrationForm!: FormGroup;
  public isLoading: boolean = false;
  public isForm: boolean = false;
  public isFormEdit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private coursesService: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      id: [null],
      nome: [null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)]],
      categoria: [null, Validators.required]
    })
    this.route.params.subscribe(({ id }) => {
      if (id) {
        // Caso possua um id, alteramos texto de Cadastro novo curso para editar curso
        this.isFormEdit = true;
      }
      this.getCourseId(id)
    });
  }

  public addCourse() {
    this.isLoading = true;
    this.coursesService.saveCourse(this.registrationForm.value).subscribe(

      () => {
        const hasIdRecord = this.registrationForm.get('id')?.value
        if (hasIdRecord) {
          this.success('Curso atualizado com sucesso usando api.');
          return
        }
        this.success('Curso salvo com sucesso usando api.');

      }
      ,
      () => {
        /*TODO ao cair no bloco de erros, seguimos com a criação do um novo curso "mockado" gravando no local-storage, dessa forma
      é possivel testar aplicação sem usar back-end :) */
        this.saveCourseMock();

      },
      () => {
        this.back();
        this.isLoading = false;
      }
    )
  }

  public saveCourseMock() {
    const hasIdRecord = this.registrationForm.get('id')?.value
    const courses: any = localStorage.getItem('courses');
    let modifyCourses: any = JSON.parse(courses)
    const nomeCurso = this.registrationForm.get('nome')?.value
    const categoriaCurso = this.registrationForm.get('categoria')?.value

    if (hasIdRecord) {
      const updateCourse = modifyCourses.map((course: any) => {
        if (course.id == hasIdRecord) {
          return { ...course, nome: nomeCurso, categoria: categoriaCurso }
        }
        return course
      })
      localStorage.setItem('courses', JSON.stringify(updateCourse));
      this.success('Curso atualizado usando os dados mockados')
      this.back();
      return
    }
    //Todo caso o curso não exista é criado um novo
    let newObject = {
      ...this.registrationForm.value,
      id: modifyCourses?.length + 1
    }
    modifyCourses.push(newObject)
    localStorage.setItem('courses', JSON.stringify(modifyCourses));
    this.success('Curso salvo usando dados mockados');
    //this.error();
    this.back();
  }

  public getCourseId(id: string) {
    this.coursesService.getCourseId(id).subscribe((course => {
      if (course) {
        this.registrationForm.patchValue(course);
        this.isForm = true;
      }
    }), () => {
      this.isForm = true;
      if (id) {
        const courses: any = localStorage.getItem('courses');
        let modifyCourses: any = JSON.parse(courses);
        const course = modifyCourses.filter((course: Course) => course.id == id)
        this.registrationForm.patchValue(course[0]);
      }
    })
  }

  public back() {
    this.location.back();
  }

  private success(msg: string) {
    this.isLoading = false;
    this._snackBar.open(msg, '', {
      duration: 5000
    });
  }

  private error() {
    this.isLoading = false;
    this._snackBar.open('Erro ao tentar salvar curso.', '', {
      duration: 5000
    });
  }
}
