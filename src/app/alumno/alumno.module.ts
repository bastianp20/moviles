import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Importación necesaria para componentes de Ionic
import { AlumnoPageRoutingModule } from './alumno-routing.module';
import { QRCodeModule } from 'angularx-qrcode'; // Módulo para la funcionalidad de códigos QR

import { AlumnoPage } from './alumno.page'; // Declaración del componente

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPageRoutingModule,
    QRCodeModule,
     // Incluye módulos necesarios para la funcionalidad
     AlumnoPage
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
 // declarations: [AlumnoPage], // Asegúrate de declarar el componente aquí
})
export class AlumnoPageModule {}
