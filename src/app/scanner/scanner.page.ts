// scanner.page.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage {
  result: string = '';  // Almacena el resultado del escaneo

  constructor() {}

  // Método para escanear el código QR
  scan() {
    // Lógica para escanear el QR usando la librería que estés utilizando
    // Asigna el resultado al 'result'
  }
}
