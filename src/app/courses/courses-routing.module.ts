import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';

import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent },
  { path: 'new-course', component: CourseRegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
