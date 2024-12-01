import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroprofesorPageRoutingModule } from './registroprofesor-routing.module';

import { RegistroProfesorPage } from './registroprofesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroprofesorPageRoutingModule, ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  //declarations: [RegistroProfesorPage]
})
export class RegistroprofesorPageModule {}
