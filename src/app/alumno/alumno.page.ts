import { Component } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage {
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';
  sala: string = '';

  generarQR(): string {
    return `Asignatura: ${this.asignatura}, Sección: ${this.seccion}, Fecha: ${this.fecha}, Sala: ${this.sala}`;
  }
}
