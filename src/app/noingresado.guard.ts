// NoIngresadoGuard
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log('NoIngresadoGuard ejecutado');  // Debug
    if (localStorage.getItem('ingresado')) {
      console.log('Sesión iniciada, redirigiendo a registro-alumnos');  // Debug
      this.router.navigate(['/registro-alumnos']);
      return false;
    }
    console.log('Sesión no iniciada, permitiendo acceso');  // Debug
    return true;
  }
}
