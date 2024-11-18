import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  resultadoEscaneo: string = ''; 

  ngOnInit() {
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
    };

    const qrCodeScanner = new Html5QrcodeScanner('reader', config, false);

    qrCodeScanner.render(
      (decodedText: string) => {
        console.log('Texto escaneado:', decodedText); 
        this.resultadoEscaneo = decodedText; 
      },
      (errorMessage: string) => {
        console.error('Error durante el escaneo:', errorMessage);
      }
    );
  }

  ngOnDestroy() {
    const qrCodeScanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: { width: 250, height: 250 } }, false);
    qrCodeScanner.clear().catch((err) => console.error('Error al detener el escáner:', err));
  }
}
