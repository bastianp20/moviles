import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  standalone:true, 
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  qrData: any = null;  // Para almacenar los datos del QR
  qrEscaneado: boolean = false;  // Indicador de si se escaneó correctamente

  constructor(
    private navCtrl: NavController,
    private asistenciaService: AsistenciaService,
    private alumnoDataService: AlumnoService
  ) {}

  // Método para iniciar el escaneo del código QR
  scanQRCode() {
    const scanner = new Html5QrcodeScanner(
      "reader",  // ID del contenedor HTML
      { fps: 10, qrbox: 250 },  // Configuración del escáner
      false  // Sin modo verbose
    );

    scanner.render(
      (qrCodeMessage) => {
        console.log("Contenido del QR:", qrCodeMessage);  // Mostrar el contenido escaneado

        try {
          // Convertir el contenido del QR a un objeto JSON
          const asistenciaData = JSON.parse(qrCodeMessage);
          this.qrData = asistenciaData;
          this.qrEscaneado = true;

          // Registrar asistencia y almacenar los datos del alumno
          this.registrarAsistencia(asistenciaData);
          this.alumnoDataService.setAlumnoData(asistenciaData);

          // Navegar a la página del alumno si es necesario
          // this.navCtrl.navigateRoot('/alumno');
        } catch (error) {
          console.error('Error al procesar el QR:', error);
        }

        // Detener el escáner
        scanner.clear();
      },
      (error) => {
        console.error('Error de escaneo: ', error);  // Manejar errores del escáner
      }
    );
  }

  // Método para registrar la asistencia
  registrarAsistencia(asistenciaData: any) {
    this.asistenciaService.agregarAsistencia(asistenciaData);  // Guardar en el servicio
  }
}
