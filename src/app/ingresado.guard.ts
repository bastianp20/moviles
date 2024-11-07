// IngresadoGuard
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('IngresadoGuard ejecutado');  // Debug
    if (localStorage.getItem('ingresado')) {
      console.log('Sesión iniciada, permitiendo acceso');  // Debug
      return true;
    }
    console.log('Sesión no iniciada, redirigiendo a iniciosesion-alumno');  // Debug
    this.router.navigate(['/iniciosesion-alumno']);
    return false;
  }
}
