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
  constructor(private asistenciaService: AsistenciaService, private router: Router) {}

  ngOnInit() {
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
          this.asistenciaService.agregarAsistencia(asistencia);
          alert('Asistencia registrada con éxito');
          this.router.navigate(['/alumno']);
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
}
