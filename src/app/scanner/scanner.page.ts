import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AsistenciaService } from '../services/asistencia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  // Variable para almacenar la lista de alumnos
  alumnos: any[] = [];
  usuario: any; // Variable para almacenar la información del usuario autenticado

  constructor(private asistenciaService: AsistenciaService, private router: Router) {}

  ngOnInit() {
    // Verificar si hay un usuario autenticado en el localStorage
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
      this.usuario = JSON.parse(usuario);
    } else {
      this.router.navigate(['/iniciosesion-alumno']); // Redirigir a login si no hay sesión iniciada
    }

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const qrCodeScanner = new Html5QrcodeScanner('reader', config, false);

    qrCodeScanner.render(
      (decodedText: string) => {
        console.log('Texto escaneado:', decodedText);

        // Parsear el texto escaneado como un objeto JSON
        try {
          const asistencia = JSON.parse(decodedText);

          // Comprobar que el alumno que está registrando asistencia coincide con el que está logueado
          if (asistencia.correo === this.usuario.correo) {
            this.asistenciaService.agregarAsistencia(asistencia);
            alert('Asistencia registrada con éxito');
            this.router.navigate(['/alumno']);
          } else {
            alert('Este alumno no está registrado para esta sesión.');
          }
        } catch (error) {
          console.error('Error al procesar el QR:', error);
          alert('El código QR no contiene datos válidos');
        }
      },
      (errorMessage: string) => {
        console.error('Error durante el escaneo:', errorMessage);
      }
    );
  }

  // Función para navegar a la lista de alumnos
  verListaAlumnos() {
    if (this.usuario) {
      // Solo se muestran los alumnos que tienen la sesión iniciada
      this.alumnos = this.asistenciaService.obtenerAlumnos().filter((alumno: any) => alumno.correo === this.usuario.correo);
      console.log('Lista de alumnos:', this.alumnos);
    } else {
      alert('Por favor, inicia sesión para ver la lista de alumnos.');
      this.router.navigate(['/iniciosesion-alumno']);
    }
  }
}
