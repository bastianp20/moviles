import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciosesionAlumnoPage } from './iniciosesion-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: IniciosesionAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciosesionAlumnoPageRoutingModule {}
