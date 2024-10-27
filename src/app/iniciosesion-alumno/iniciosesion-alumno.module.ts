import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciosesionAlumnoPageRoutingModule } from './iniciosesion-alumno-routing.module';

import { IniciosesionAlumnoPage } from './iniciosesion-alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciosesionAlumnoPageRoutingModule
  ],
  declarations: [IniciosesionAlumnoPage]
})
export class IniciosesionAlumnoPageModule {}
