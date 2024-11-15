import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  result: string = '';  
  errorMessage: string = '';  

  constructor() {}

  async scan() {
    try {
      const scanResult = await BarcodeScanner.startScan();

      if (scanResult.hasContent) {
        this.result = scanResult.content;

        this.validateQRCode(this.result);
      } else {
        this.errorMessage = 'No se ha escaneado ningún código QR.';
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.errorMessage = 'Hubo un problema al escanear el código QR.';
    }
  }

  validateQRCode(qrCode: string) {
    const regex = /^[A-Za-z0-9]+ \| [A-Za-z0-9]+ \| [A-Za-z0-9]+ \| \d{8}$/;
    
    if (regex.test(qrCode)) {
      this.errorMessage = '';  
    } else {
      this.errorMessage = 'El formato del código QR no es válido.';
    }
  }
}
