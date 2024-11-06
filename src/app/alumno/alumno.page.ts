// alumno.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage {
  texto: string = '';  // Texto para el código QR
  qrCodeData: string = '';  // Dato para mostrar el QR

  constructor(private router: Router) {} // Inyecta el Router

  // Método para generar el QR
  generarQR() {
    this.qrCodeData = this.texto;  // Asigna el texto al QR
  }

  // Método para navegar al escáner
  irAScanner() {
    this.router.navigate(['/scanner']);  // Reemplaza con la ruta correcta de tu escáner
  }
}
