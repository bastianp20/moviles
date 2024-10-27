import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './iniciosesion-alumno.page.html',
  styleUrls: ['./iniciosesion-alumno.page.scss'],
})
export class IniciosesionAlumnoPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder, private router: Router, private alertController: AlertController) {
    this.formularioLogin = this.fb.group({
      nombre: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async ingresar() {
    const f = this.formularioLogin.value;
    const usuario = localStorage.getItem('usuario') ? JSON.parse(localStorage.getItem('usuario') as string) : null;

    if (usuario && usuario.nombre === f.nombre && usuario.password === f.password) {
      const alert = await this.alertController.create({
        header: 'Ingreso exitoso',
        message: 'Has iniciado sesión correctamente',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Nombre de usuario o contraseña incorrectos',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  resetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
