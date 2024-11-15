import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage {

  nombreApellido: string = '';
  asignatura: string = '';
  seccion: string = '';
  sala: string = '';
  fecha: string = '';

  showForm: boolean = false;

  qrCodeData: string = '';
  constructor(private router: Router) {} 

  generarQR() {
    if (this.asignatura && this.seccion && this.sala && this.fecha) {
      this.qrCodeData = `${this.asignatura} | ${this.seccion} | ${this.sala} | ${this.fecha}`;
    } else {
      alert('Por favor, complete todos los campos.');
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  irAScanner() {
    this.router.navigate(['/scanner']); 
  }
}
