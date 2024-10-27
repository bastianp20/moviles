import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro-alumnos',
  templateUrl: './registro-alumnos.page.html',
  styleUrls: ['./registro-alumnos.page.scss'],
})
export class RegistroAlumnosPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController
  ) {
    // Configuración del formulario
    this.formularioRegistro = this.fb.group({
      'correo': new FormControl('', [Validators.required, Validators.required]),
      'password': new FormControl('', Validators.required),
      'confirmacionpassword': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {}

  // Método para manejar el registro
  async guardar() {
    var f = this.formularioRegistro.value;
    if(this.formularioRegistro.invalid){
    const alert = await this.alertController.create({
      header: 'datos incompletos',
      message: 'No dejes campos en blanco',
      buttons: ['Aceptar'] 
    });
    await alert.present();
    return; 
    }

    var usuario = {

      correo: f.correo,
      contraseña: f.password
    }
    localStorage.setItem('usuario', JSON.stringify(usuario));

    
  }
}
