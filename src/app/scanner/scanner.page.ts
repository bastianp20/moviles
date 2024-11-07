import { Component } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  result: string = '';  // Almacena el resultado del escaneo
  errorMessage: string = '';  // Mensaje de error si el formato no es correcto

  constructor() {}

  // Método para escanear el código QR
  async scan() {
    try {
      // Inicia el escaneo (sin necesidad de solicitar permisos explícitamente)
      const scanResult = await BarcodeScanner.startScan();

      // Verifica si se escaneó un código QR
      if (scanResult.hasContent) {
        this.result = scanResult.content;  // Asigna el contenido escaneado al resultado

        // Validar el formato esperado
        this.validateQRCode(this.result);
      } else {
        this.errorMessage = 'No se ha escaneado ningún código QR.';
      }
    } catch (error) {
      console.error('Error al escanear:', error);
      this.errorMessage = 'Hubo un problema al escanear el código QR.';
    }
  }

  // Validación del formato de QR
  validateQRCode(qrCode: string) {
    // Expresión regular para verificar el formato PGY4121 | 012D | L9 | 20241104
    const regex = /^[A-Za-z0-9]+ \| [A-Za-z0-9]+ \| [A-Za-z0-9]+ \| \d{8}$/;
    
    if (regex.test(qrCode)) {
      this.errorMessage = '';  // Si el formato es válido, limpia el mensaje de error
    } else {
      this.errorMessage = 'El formato del código QR no es válido.';
    }
  }
}
