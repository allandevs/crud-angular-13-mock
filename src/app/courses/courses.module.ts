import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { LayoutDefaultModule } from '../shared/layout/layout-default/layout-default.module';
import { SharedModule } from '../shared/shared.module';
import { CourseRegistrationComponent } from './course-registration/course-registration.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    CoursesComponent,
    CourseRegistrationComponent
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
