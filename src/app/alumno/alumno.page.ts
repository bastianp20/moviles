// alumno.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage {
  
  // Variables para almacenar los datos ingresados
  nombreApellido: string = '';
  asignatura: string = '';
  seccion: string = '';
  sala: string = '';
  fecha: string = '';

  // Variable para controlar si se debe mostrar el formulario de entrada
  showForm: boolean = false;

  // Variable para almacenar el contenido del código QR generado
  qrCodeData: string = '';
  constructor(private router: Router) {} // Inyecta el Router

  // Método para generar el QR
  generarQR() {
    // Verificar que todos los campos estén completos
    if (this.asignatura && this.seccion && this.sala && this.fecha) {
      // Crear el string con los datos para el QR
      this.qrCodeData = `${this.asignatura} | ${this.seccion} | ${this.sala} | ${this.fecha}`;
    } else {
      // Si faltan campos, mostrar un mensaje o tomar alguna acción
      alert('Por favor, complete todos los campos.');
    }
  }
  toggleForm() {
    this.showForm = !this.showForm;
  }

  // Método para navegar al escáner
  irAScanner() {
    this.router.navigate(['/scanner']);  // Reemplaza con la ruta correcta de tu escáner
  }
}
