import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAlumnosPageRoutingModule } from './registro-alumnos-routing.module';

import { RegistroAlumnosPage } from './registro-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistroAlumnosPageRoutingModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  //declarations: [RegistroAlumnosPage]
})
export class RegistroAlumnosPageModule {}
