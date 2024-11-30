import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  asistencias: any[] = [];
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';
  sala: string = '';
  asistenciasAgrupadas: { [key: string]: any[] } = {};
  asignaturasDisponibles: string[] = ['Matemáticas', 'Inglés', 'Móviles', 'Arquitectura'];
  asignaturaSeleccionada: string = '';
  usuario: any = null;

  listaAlumnos: any[] = []; // Lista de alumnos registrada
  alumnoSeleccionado: string = ''; // Almacena el alumno seleccionado

  constructor(
    private asistenciaService: AsistenciaService,
     private authService: AuthService,
     private navCtrl: NavController
    ) {}

  ngOnInit() {
    this.asistencias = this.asistenciaService.obtenerAsistencias();
    this.actualizarAsistenciasAgrupadas();
    this.obtenerAlumnos(); // Mover lógica de alumnos aquí

    const correo = 'usuario@eduocuc.cl';
    const password = 'contraseñaDelUsuario';
    this.usuario = this.authService.validarUsuario(correo, password);
  }

  generarQR() {
    return JSON.stringify({
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
      sala: this.sala,
    });
  }

  verListaAlumnos() {
    console.log(this.listaAlumnos);
    this.navCtrl.navigateRoot('asistencia-detalle');
  }

  obtenerAlumnos() {
    const alumnos = this.authService.getUsuarios();
    this.listaAlumnos = alumnos
      .filter((alumno: any) => alumno.correo.endsWith('@Eduocuc.cl'))
      .map((alumno: any) => ({
        correo: alumno.correo,
        asignatura: alumno.asignatura || 'No asignada',
        sala: alumno.sala || 'No especificada',
      }));
  }

  verAsistencias(alumno: string) {
    this.alumnoSeleccionado = alumno;
    this.asistencias = this.asistenciaService.obtenerAsistenciasPorAlumno(alumno);
    this.actualizarAsistenciasAgrupadas();
  }

  registrarAsistencia() {
    if (this.asignatura && this.seccion && this.fecha && this.sala) {
      const nuevaAsistencia = {
        asignatura: this.asignatura,
        seccion: this.seccion,
        fecha: this.fecha,
        sala: this.sala,
        alumnoCorreo: this.usuario?.correo,
      };

      this.asistenciaService.agregarAsistencia(nuevaAsistencia);
      this.asistencias = this.asistenciaService.obtenerAsistencias();
      this.actualizarAsistenciasAgrupadas();
      this.limpiarFormulario();
    } else {
      console.error('Por favor completa todos los campos antes de registrar la asistencia.');
    }
  }

  actualizarAsistenciasAgrupadas() {
    this.asistenciasAgrupadas = this.asistencias.reduce((acc: any, asistencia: any) => {
      const asignatura = asistencia.asignatura || 'Sin asignatura';
      if (!acc[asignatura]) acc[asignatura] = [];
      acc[asignatura].push(asistencia);
      return acc;
    }, {});
  }

  limpiarFormulario() {
    this.asignatura = '';
    this.seccion = '';
    this.fecha = '';
    this.sala = '';
  }
}
