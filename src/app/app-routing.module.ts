import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NoIngresadoGuard } from './noingresado.guard';
import { IngresadoGuard } from './ingresado.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: []
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'iniciosesion-alumno',
    loadChildren: () => import('./iniciosesion-alumno/iniciosesion-alumno.module').then( m => m.IniciosesionAlumnoPageModule),
  //  canActivate: [NoIngresadoGuard]
  },
  {
    path: 'registro-alumnos',
    loadChildren: () => import('./registro-alumnos/registro-alumnos.module').then( m => m.RegistroAlumnosPageModule),
   // canActivate: [NoIngresadoGuard]
  },
  {
    path: 'alumno',
    loadChildren: () => import('./alumno/alumno.module').then( m => m.AlumnoPageModule),
   // canActivate: [IngresadoGuard]
  },
  {
    path: 'error404',
    loadChildren: () => import('./error404/error404.module').then( m => m.Error404PageModule)
  },
  {
    path: 'scanner',
    loadChildren: () => import('./scanner/scanner.module').then( m => m.ScannerPageModule)
  },  
  {
    path: 'registroprofesor',
    loadChildren: () => import('./registroprofesor/registroprofesor.module').then( m => m.RegistroprofesorPageModule)
  },  
  {
    path: 'iniciosesion-profesor',
    loadChildren: () => import('./iniciosesion-profesor/iniciosesion-profesor.module').then( m => m.IniciosesionProfesorPageModule)
  },  {
    path: 'asistencia-detalle',
    loadChildren: () => import('./asistencia-detalle/asistencia-detalle.module').then( m => m.AsistenciaDetallePageModule)
  },
  {
    path: '**',
    redirectTo: 'error404'
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {} 
