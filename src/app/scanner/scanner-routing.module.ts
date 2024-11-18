import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerPage } from './scanner.page';
import { OnInit } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ScannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScannerPageRoutingModule {}
