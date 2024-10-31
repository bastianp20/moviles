import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.page.html',
  styleUrls: ['./registro-alumnos.page.scss'],
})
export class RegistroAlumnosPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    // Configuración del formulario
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl('', [Validators.required, Validators.required]),
      'password': new FormControl('', Validators.required),
      'confirmacionpassword': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    
  }
  async guardar() {
    const f = this.formularioRegistro.value;

    // Verificar si el formulario es inválido
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'No dejes campos en blanco',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Verificar si las contraseñas coinciden
    if (f.password !== f.confirmacionpassword) {
      const alert = await this.alertController.create({
        header: 'Error de Confirmación',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Obtener usuarios guardados en localStorage o crear un array vacío
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    // Verificar si el usuario ya existe
    const usuarioExistente = usuarios.find((user: any) => user.correo === f.correo);
    if (usuarioExistente) {
      const alert = await this.alertController.create({
        header: 'Usuario ya registrado',
        message: 'Este correo ya está registrado, intenta con otro.',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }

    // Crear el objeto del nuevo usuario
    const nuevoUsuario = {
      correo: f.correo,
      contraseña: f.password // Asegúrate de usar 'contraseña'
    };

    // Agregar el nuevo usuario al array de usuarios y guardarlo en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Confirmación de registro exitoso
    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Usuario registrado correctamente',
      buttons: ['Aceptar']
    });
    await alert.present();

    // Navegar a la página de inicio
    this.navCtrl.navigateRoot('home');
}
}
