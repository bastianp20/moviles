import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroAlumnosPageRoutingModule } from './registro-alumnos-routing.module';

import { RegistroAlumnosPage } from './registro-alumnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroAlumnosPageRoutingModule
  ],
  declarations: [RegistroAlumnosPage]
})
export class RegistroAlumnosPageModule {}
