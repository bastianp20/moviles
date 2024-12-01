import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.page.html',
  standalone: true,
  styleUrls: ['./registro-alumnos.page.scss'],
})
export class RegistroAlumnosPage implements OnInit {

  formularioRegistro: FormGroup;
  isLoading: boolean = false;  // Nueva variable para controlar el spinner

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public navCtrl: NavController
  ) {
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required),
      'confirmacionpassword': new FormControl('', Validators.required),
      'apellido': new FormControl('', Validators.required),   // Nuevo campo
      'edad': new FormControl('', [Validators.required, Validators.min(18)]),  // Nuevo campo
      'rut': new FormControl('', [Validators.required])  // Nuevo campo
    });
  }

  ngOnInit() {}

  async guardar() {
    this.isLoading = true;  // Mostrar spinner

    const f = this.formularioRegistro.value;

    // Validar campos vacíos
    if (this.formularioRegistro.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Datos erróneos',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.isLoading = false;  // Ocultar spinner
      return;
    }

    // Validar contraseñas coincidan
    if (f.password !== f.confirmacionpassword) {
      const alert = await this.alertController.create({
        header: 'Error de Confirmación',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.isLoading = false;  // Ocultar spinner
      return;
    }

    // Validar dominio del correo
    if (!f.correo.endsWith('@Eduocuc.cl')) {
      const alert = await this.alertController.create({
        header: 'Correo no válido',
        message: 'El correo debe pertenecer al dominio @Eduocuc.cl.',
        buttons: ['Aceptar']
      });
      await alert.present();
      this.isLoading = false;  // Ocultar spinner
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
      this.isLoading = false;  // Ocultar spinner
      return;
    }

    // Guardar nuevo usuario
    const nuevoUsuario = {
      correo: f.correo,
      contraseña: f.password,
      apellido: f.apellido,    // Guardamos el apellido
      edad: f.edad,            // Guardamos la edad
      rut: f.rut               // Guardamos el RUT
    };

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: 'Usuario registrado correctamente',
      buttons: ['Aceptar']
    });
    await alert.present();
    this.navCtrl.navigateRoot('home');
    this.isLoading = false;  // Ocultar spinner
  }
}
