import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroProfesorPage } from './registroprofesor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroprofesorPageRoutingModule {}
