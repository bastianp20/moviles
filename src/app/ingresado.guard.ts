import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('ingresado')) {
      // La sesión está iniciada, permitir el acceso
      return true;
    }
    // Si no hay sesión iniciada, redirigir a 'iniciosesion-alumno'
    this.router.navigate(['/iniciosesion-alumno']);
    return false;
  }
}
