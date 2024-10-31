import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './iniciosesion-alumno.page.html',
  styleUrls: ['./iniciosesion-alumno.page.scss'],
})
export class IniciosesionAlumnoPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioLogin = this.fb.group({
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async ingresar() {
    const f = this.formularioLogin.value;

    // Verificar si el formulario es válido
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Obtener la lista de usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Log para depurar
    console.log('Usuarios en Local Storage:', usuarios);
    console.log('Datos ingresados:', f);

    // Verificar si el usuario existe en la lista
    const usuario = usuarios.find((user: any) => user.correo === f.correo && user.contraseña === f.password);

    if (usuario) {
      // Usuario encontrado: inicio de sesión exitoso
      const alert = await this.alertController.create({
        header: 'Ingreso exitoso',
        message: 'Has iniciado sesión correctamente',
        buttons: ['Aceptar']
      });
      await alert.present();

      // Marcar al usuario como ingresado en localStorage
      localStorage.setItem('ingresado', 'true');

      // Redirigir a la página del alumno
      this.navCtrl.navigateRoot('alumno');
    } else {
      // Usuario no encontrado: credenciales incorrectas
      const alert = await this.alertController.create({
        header: 'Error de inicio de sesión',
        message: 'Correo o contraseña incorrectos. Por favor, intenta nuevamente.',
        buttons: ['Aceptar']
      });
      await alert.present();
    }
  }

  async resetPassword() {
    const alert = await this.alertController.create({
      header: 'Resetear Contraseña',
      message: 'Funcionalidad de resetear contraseña aún no implementada.',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  goBack() {
    this.navCtrl.back(); // Esto te llevará a la página anterior en la pila de navegación.
  }
}
