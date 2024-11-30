import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, NavController } from '@ionic/angular';

import { AlumnoPageRoutingModule } from './alumno-routing.module';

import { AlumnoPage } from './alumno.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [ QRCodeModule,
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPageRoutingModule
  ],
  declarations: [AlumnoPage]
})
export class AlumnoPageModule {}
