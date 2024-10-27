import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.page.html',
  styleUrls: ['./registro-alumnos.page.scss'],
})
export class RegistroAlumnosPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder) {
    // Configuración del formulario
    this.formularioLogin = this.fb.group({
      correo: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmacionpassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  // Método para manejar el registro
  guardar() {
    if (this.formularioLogin.valid) {
      console.log('Datos del formulario:', this.formularioLogin.value);
      // Aquí puedes agregar la lógica de registro, como llamar a una API
    } else {
      console.log('Formulario no válido');
    }
  }
}
