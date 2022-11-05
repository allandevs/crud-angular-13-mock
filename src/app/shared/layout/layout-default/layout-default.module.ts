import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout-default.component';
import { AppMaterialModule } from '../../app-material/app-material.module';



@NgModule({
  declarations: [
    LayoutDefaultComponent
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  exports:[LayoutDefaultComponent]
})
export class LayoutDefaultModule { }
