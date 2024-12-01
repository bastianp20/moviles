import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciosesionProfesorPageRoutingModule } from './iniciosesion-profesor-routing.module';

import { IniciosesionProfesorPage } from './iniciosesion-profesor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciosesionProfesorPageRoutingModule, ReactiveFormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
  //declarations: [IniciosesionProfesorPage]
})
export class IniciosesionProfesorPageModule {}
