import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciosesionAlumnoPageRoutingModule } from './iniciosesion-alumno-routing.module';

import { IniciosesionAlumnoPage } from './iniciosesion-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IniciosesionAlumnoPageRoutingModule
  ],
  //declarations: [IniciosesionAlumnoPage]
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class IniciosesionAlumnoPageModule {}
