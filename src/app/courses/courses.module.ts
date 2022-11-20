import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { LayoutDefaultModule } from '../shared/layout/layout-default/layout-default.module';
import { SharedModule } from '../shared/shared.module';
import { CourseRegistrationComponent } from './views/course-registration/course-registration.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './views/courses/courses.component';
import { CoursesListComponent } from './components/courses-list/courses-list.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseRegistrationComponent,
    CoursesListComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    LayoutDefaultModule,
    ReactiveFormsModule
  ]
})
export class CoursesModule { }
