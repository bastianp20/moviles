import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IniciosesionProfesorPage } from './iniciosesion-profesor.page';

const routes: Routes = [
  {
    path: '',
    component: IniciosesionProfesorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciosesionProfesorPageRoutingModule {}
