import { Component, AfterViewInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements AfterViewInit {
  mensajeEstado: string = '';
  listaAsistencias: any[] = [];
  qrEscaneado: boolean = false;

  constructor(private asistenciaService: AsistenciaService) {}

  ngAfterViewInit() {
    this.iniciarScanner();
  }

  iniciarScanner() {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
    };

    const qrCodeScanner = new Html5QrcodeScanner('reader', config, false);

    qrCodeScanner.render(
      (decodedText: string) => {
        if (!this.qrEscaneado) {
          console.log('Texto escaneado:', decodedText);
          this.procesarQR(decodedText);
        }
      },
      (errorMessage: string) => {
        console.error('Error durante el escaneo:', errorMessage);
      }
    );
  }

  procesarQR(decodedText: string) {
    try {
      const asistencia = JSON.parse(decodedText);
      this.asistenciaService.agregarAsistencia(asistencia);
      this.mensajeEstado = `Asistencia registrada para ${asistencia.asignatura} en ${asistencia.sala}.`;

      this.qrEscaneado = true;
      setTimeout(() => (this.qrEscaneado = false), 5000);
    } catch (error) {
      console.error('Error al procesar el QR:', error);
      this.mensajeEstado = 'El código QR no contiene datos válidos.';
    }
  }
}
