import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-registroprofesor',
  templateUrl: './registroprofesor.page.html',
  standalone:true, 
  styleUrls: ['./registroprofesor.page.scss'],
})
export class RegistroProfesorPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController,
    public loadingController: LoadingController // Importamos LoadingController
  ) {
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'confirmacionpassword': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  async guardar() {
    const f = this.formularioRegistro.value;
    console.log(f); // Verifica los valores del formulario

    // Mostrar el spinner mientras procesamos el registro
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      spinner: 'crescent', // Tipo de spinner
      duration: 5000 // Duración máxima en ms
    });
    await loading.present();

    // Validar campos vacíos
    if (this.formularioRegistro.invalid) {
      console.log('Formulario inválido');
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'No dejes campos en blanco',
        buttons: ['Aceptar']
      });
      await alert.present();
      await loading.dismiss(); // Ocultar el spinner
      return;
    }

    // Validar que las contraseñas coincidan
    if (f.password !== f.confirmacionpassword) {
      const alert = await this.alertController.create({
        header: 'Error de Confirmación',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      await loading.dismiss(); // Ocultar el spinner
      return;
    }

    // Validar dominio del correo
    if (!f.correo.endsWith('@Pduocuc.cl')) {
      const alert = await this.alertController.create({
        header: 'Correo no válido',
        message: 'El correo debe pertenecer al dominio @Pduocuc.cl.',
        buttons: ['Aceptar']
      });
      await alert.present();
      await loading.dismiss(); // Ocultar el spinner
      return;
    }

    // Validar si el usuario ya existe
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioExistente = usuarios.find((user: any) => user.correo === f.correo);
    if (usuarioExistente) {
      const alert = await this.alertController.create({
        header: 'Usuario ya registrado',
        message: 'Este correo ya está registrado, intenta con otro.',
        buttons: ['Aceptar']
      });
      await alert.present();
      await loading.dismiss(); // Ocultar el spinner
      return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = {
      correo: f.correo,
      contraseña: f.password 
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Usuario registrado correctamente',
      buttons: ['Aceptar']
    });
    await alert.present();
    await loading.dismiss(); // Ocultar el spinner
    this.navCtrl.navigateRoot('home');
  }
}