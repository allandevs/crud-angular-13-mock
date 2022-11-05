import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutDefaultModule } from '../shared/layout/layout-default/layout-default.module';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses/courses.component';

@NgModule({
  declarations: [
    CoursesComponent
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    AppMaterialModule,
    SharedModule,
    LayoutDefaultModule
  ]
})
export class CoursesModule { }
