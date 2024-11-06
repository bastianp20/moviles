// scanner.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScannerPage } from './scanner.page';
import { ScannerPageRoutingModule } from './scanner-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPageRoutingModule  // Asegúrate de tener esto importado
  ],
  declarations: [ScannerPage]
})
export class ScannerPageModule {}
