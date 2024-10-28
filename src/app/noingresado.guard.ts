import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NoIngresadoGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('ingresado')) {
      this.router.navigate(['iniciosesion-alumno']);
      return false;
    }
    return true;
  }
}
