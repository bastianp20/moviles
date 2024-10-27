import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'iniciosesion-alumno',
    loadChildren: () => import('./iniciosesion-alumno/iniciosesion-alumno.module').then( m => m.IniciosesionAlumnoPageModule)
  },
  {
    path: 'registro-alumnos',
    loadChildren: () => import('./registro-alumnos/registro-alumnos.module').then( m => m.RegistroAlumnosPageModule)
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
