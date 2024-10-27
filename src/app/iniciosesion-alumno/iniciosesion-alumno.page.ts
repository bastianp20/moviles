import { Component, OnInit } from '@angular/core';
import { 
  FormGroup, 
  FormControl, 
  Validators, 
  FormBuilder 
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './iniciosesion-alumno.page.html',
  styleUrls: ['./iniciosesion-alumno.page.scss'],
})
export class IniciosesionAlumnoPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router: Router) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  // Método para volver a la página anterior
  goBack() {
    this.router.navigate(['/home']); // Cambia '/home' por la ruta a la que deseas volver
  }

  // Método para redirigir a la página de restablecimiento de contraseña
  resetPassword() {
    this.router.navigate(['/reset-password']); // Asegúrate de que la ruta esté configurada
  }
}
