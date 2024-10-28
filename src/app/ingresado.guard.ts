import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('ingresado')) {
      return true;
    }
    this.router.navigate(['iniciosesion-alumno']);
    return false;
  }
}
