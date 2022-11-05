import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap, first, map } from 'rxjs/operators';
import { Course } from './../models/course';

import { environment } from './../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  public list() {
    return this.httpClient.get<Course[]>(`api/courses`).pipe(
      first(),
      //delay(1000),
      map((json: any) => {
        // dessa forma conseguimos modificar o nome dos atributos retornados da api
        const cursos: Course[] = json.map((curso: any) => new Course(curso))
        return cursos;
      }),
      tap(cursos => console.log(cursos)),
    )
  }
}
