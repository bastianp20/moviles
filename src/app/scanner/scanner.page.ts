import { Component, AfterViewInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AsistenciaService } from '../services/asistencia.service'; // Importar el servicio de asistencia
import { AuthService } from '../services/auth.service';  // Importar el servicio de autenticación
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements AfterViewInit {
  mensajeEstado: string = '';  // Mensaje de estado
  listaAlumnos: any[] = [];  // Almacenaremos objetos de alumnos con propiedades asignatura y sala
  listaAsistencias: any[] = [];  // Guardar las asistencias de un alumno seleccionado
  qrEscaneado: boolean = false;  // Bandera para evitar múltiples escaneos
  alumnoSeleccionado: string = '';  // Almacena el alumno seleccionado para mostrar sus asistencias

  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,  // Inyectar AuthService para acceder a los usuarios
    private navCtrl: NavController
  ) {}

  ngAfterViewInit() {
    this.iniciarScanner();
    this.obtenerAlumnos();  // Obtener los alumnos registrados al iniciar la página
  }

  // Iniciar el scanner QR
  iniciarScanner() {
    const config = {
      fps: 10, // Velocidad de escaneo
      qrbox: { width: 250, height: 250 }, // Tamaño del cuadro de escaneo
    };

    const qrCodeScanner = new Html5QrcodeScanner('reader', config, false);

    qrCodeScanner.render(
      (decodedText: string) => {
        // Solo procesar el QR si no se ha escaneado antes
        if (!this.qrEscaneado) {
          console.log('Texto escaneado:', decodedText);
          this.procesarQR(decodedText); // Procesar el QR escaneado
        }
      },
      (errorMessage: string) => {
        console.error('Error durante el escaneo:', errorMessage);
      }
    );
  }

  // Procesar QR escaneado y registrar la asistencia
  procesarQR(decodedText: string) {
    try {
      const asistencia = JSON.parse(decodedText); // Decodificar el QR
      this.asistenciaService.agregarAsistencia(asistencia); // Registrar la asistencia usando el servicio
      this.mensajeEstado = `Asistencia registrada para ${asistencia.asignatura} en ${asistencia.sala}.`;

      // Marcar como escaneado
      this.qrEscaneado = true;

      // Resetear la bandera después de un tiempo para permitir nuevos escaneos si es necesario
      setTimeout(() => {
        this.qrEscaneado = false;
      }, 5000);  // Espera de 5 segundos antes de permitir un nuevo escaneo (puedes ajustarlo según sea necesario)
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      this.mensajeEstado = 'El código QR no contiene datos válidos.';
    }
  }

  // Función para obtener los alumnos registrados usando AuthService
  obtenerAlumnos() {
    const alumnos = this.authService.getUsuarios();  // Obtener los alumnos desde el AuthService
    this.listaAlumnos = alumnos
      .filter((alumno: any) => alumno.correo.endsWith('@Eduocuc.cl'))  // Filtrar solo alumnos con el dominio @Eduocuc.cl
      .map((alumno: any) => {
        // Asegurarse de que 'asignatura' y 'sala' existen antes de mapear
        return {
          correo: alumno.correo,
          asignatura: alumno.asignatura || 'No asignada',  // Valor predeterminado si no existe 'asignatura'
          sala: alumno.sala || 'No especificada'  // Valor predeterminado si no existe 'sala'
        };
      });
  }

  // Función para mostrar las asistencias de un alumno
  verAsistencias(alumno: string) {
    this.alumnoSeleccionado = alumno; // Establecer el alumno seleccionado
    this.listaAsistencias = this.asistenciaService.obtenerAsistenciasPorAlumno(alumno); // Obtener asistencias del alumno
    console.log(`Asistencias de ${alumno}:`, this.listaAsistencias); // Log para verificar
  }

  // Función para mostrar la lista de alumnos (en caso de que sea necesario)
  verListaAlumnos() {
    console.log(this.listaAlumnos);
    this.navCtrl.navigateRoot('asistencia-detalle');
  }
}
