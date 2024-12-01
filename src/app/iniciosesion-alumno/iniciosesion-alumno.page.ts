import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './iniciosesion-alumno.page.html',
  standalone:true,
  styleUrls: ['./iniciosesion-alumno.page.scss'],
})
export class IniciosesionAlumnoPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private alertController: AlertController,
    public navCtrl: NavController,
    public loadingController: LoadingController // Importamos LoadingController
  ) {
    this.formularioLogin = this.fb.group({
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async ingresar() {
    const f = this.formularioLogin.value;

    // Validar si el formulario es válido
    if (this.formularioLogin.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Mostrar el spinner
    const loading = await this.loadingController.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent', // Tipo de spinner
      duration: 5000 // Duración máxima en ms
    });
    await loading.present();

    // Buscar usuario en el local storage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    console.log('Usuarios en Local Storage:', usuarios);
    console.log('Datos ingresados:', f);
    const usuario = usuarios.find((user: any) => user.correo === f.correo && user.contraseña === f.password);

    if (usuario) {
      // Guardamos el correo del alumno en el localStorage para que se pueda usar más tarde
      localStorage.setItem('ingresado', 'true');
      localStorage.setItem('correoAlumno', f.correo); // Guardamos el correo del alumno
      await loading.dismiss(); // Ocultar el spinner
      this.router.navigate(['/scanner']); // Redirigir a la página de alumno
    } else {
      const alert = await this.alertController.create({
        header: 'Error de inicio de sesión',
        message: 'Correo o contraseña incorrectos. Por favor, intenta nuevamente.',
        buttons: ['Aceptar']
      });
      await loading.dismiss(); // Ocultar el spinner
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
