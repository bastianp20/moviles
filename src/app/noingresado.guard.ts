import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('ingresado')) {
      // Si la sesión está iniciada, redirigir a 'registro-alumnos'
      this.router.navigate(['/registro-alumnos']);
      return false;
    }
    // Si no hay sesión iniciada, permitir el acceso
    return true;
  }
}
