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

    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log('Usuarios en Local Storage:', usuarios);
    console.log('Datos ingresados:', f);
    const usuario = usuarios.find((user: any) => user.correo === f.correo && user.contraseña === f.password);
    if (usuario) {
      const alert = await this.alertController.create({
        header: 'Ingreso exitoso',
        message: 'Has iniciado sesión correctamente',
        buttons: ['Aceptar']
      });
      await alert.present();
      localStorage.setItem('ingresado', 'true');
      this.navCtrl.navigateRoot('alumno');
    } else {
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
      header: 'Restablecer Contraseña',
      inputs: [
        {
          name: 'identificador',
          type: 'text',
          placeholder: 'Ingrese su correo registrado'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: async (data) => {
            const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
            const usuario = usuarios.find((u: any) => u.correo === data.identificador || u.nombreUsuario === data.identificador);
  
            if (usuario) {
              const passwordAlert = await this.alertController.create({
                header: 'Nueva Contraseña',
                inputs: [
                  {
                    name: 'newPassword',
                    type: 'password',
                    placeholder: 'Ingrese su nueva contraseña'
                  }
                ],
                buttons: [
                  {
                    text: 'Cancelar',
                    role: 'cancel'
                  },
                  {
                    text: 'Guardar',
                    handler: (passwordData) => {
                      usuario.contraseña = passwordData.newPassword;
                      localStorage.setItem('usuarios', JSON.stringify(usuarios));
                      this.showSuccessAlert();
                    }
                  }
                ]
              });
              await passwordAlert.present();
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Usuario no encontrado',
                message: 'No existe un usuario con ese correo o nombre.',
                buttons: ['Aceptar']
              });
              await errorAlert.present();
            }
          }
        }
      ]
    });
    await alert.present();
  }
  
  async showSuccessAlert() {
    const successAlert = await this.alertController.create({
      header: 'Contraseña Actualizada',
      message: 'Su contraseña ha sido actualizada correctamente.',
      buttons: ['Aceptar']
    });
    await successAlert.present();
  }
  

  goBack() {
    this.navCtrl.back(); 
  }
}
