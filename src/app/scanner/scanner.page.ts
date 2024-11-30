import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AlumnoService } from 'src/app/services/alumno.service';
import { Html5QrcodeScanner } from 'html5-qrcode';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  qrData: any = null;
  qrEscaneado: boolean = false;

  constructor(
    private navCtrl: NavController,
    private asistenciaService: AsistenciaService,
    private alumnoDataService: AlumnoService
  ) {}

  // Método para iniciar el escaneo del QR
  scanQRCode() {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 }, false); // Tercer argumento 'false' para no usar el modo verbose
    scanner.render((qrCodeMessage) => {
      // Procesamos el mensaje del QR
      console.log("Contenido del QR:", qrCodeMessage);  // Verifica qué contiene el QR

      try {
        // Intentamos convertir el contenido del QR a un objeto JSON
        const asistenciaData = JSON.parse(qrCodeMessage);
        this.qrData = asistenciaData;
        this.qrEscaneado = true;

        // Registrar asistencia y almacenar los datos del alumno
        this.registrarAsistencia(asistenciaData);
        this.alumnoDataService.setAlumnoData(asistenciaData);  // Almacenar datos en el servicio
        //this.navCtrl.navigateRoot('/alumno');  // Navegar hacia la página de alumno
      } catch (error) {
        console.log('Error al procesar el QR:', error);
      }

      scanner.clear();  // Detener el escáner después de obtener el QR
    }, (error) => {
      console.log('Error de escaneo: ', error);  // Manejo de errores
    });
  }

  // Método para registrar la asistencia
  registrarAsistencia(asistenciaData: any) {
    this.asistenciaService.agregarAsistencia(asistenciaData);  // Llamar al servicio de asistencia
  }
}
