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

  constructor(public fb: FormBuilder, 
    private router: Router, 
    private alertController: AlertController,
    public navCtrl: NavController) {
    this.formularioLogin = this.fb.group({
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async ingresar() {
    const f = this.formularioLogin.value;
    const usuarioString = localStorage.getItem('usuario');
    const usuario = usuarioString ? JSON.parse(usuarioString) : null;

    if (usuario && usuario.correo === f.correo && usuario.password === f.password) {
      const alert = await this.alertController.create({
        header: 'Ingreso exitoso',
        message: 'Has iniciado sesión correctamente',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.router.navigate(['/alumno']);
    } else {
      const alert = await this.alertController.create({
        header: 'exitoso',
        message: 'ingresado correcto',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.router.navigate(['/home']);
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('alumno');
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  resetPassword() {
    this.router.navigate(['/reset-password']);
  }
}
