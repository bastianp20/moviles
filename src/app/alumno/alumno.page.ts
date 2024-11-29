import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';  // Importa AsistenciaService
import { AuthService } from '../services/auth.service';  // Importa AuthService

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
  usuario: any = null; // Variable para almacenar el usuario autenticado

  constructor(
    private asistenciaService: AsistenciaService, // Inyecta el servicio de asistencia
    private authService: AuthService // Inyecta el servicio de autenticación
  ) {}

  ngOnInit() {
    // Obtiene las asistencias y las agrupa
    this.asistencias = this.asistenciaService.obtenerAsistencias();
    this.actualizarAsistenciasAgrupadas();

    // Verifica si el usuario está autenticado
    const correo = 'usuario@eduocuc.cl';  // Asegúrate de reemplazar esto con el correo del usuario actual
    const password = 'contraseñaDelUsuario';  // Asegúrate de reemplazar esto con la contraseña del usuario

    this.usuario = this.authService.validarUsuario(correo, password);
    if (this.usuario) {
      console.log('Usuario autenticado:', this.usuario);
    } else {
      console.error('Usuario no encontrado o contraseña incorrecta');
    }
  }

  generarQR() {
    return JSON.stringify({
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
      sala: this.sala,
    });
  }

  registrarAsistencia() {
    if (this.asignatura && this.seccion && this.fecha && this.sala) {
      const nuevaAsistencia = {
        asignatura: this.asignatura,
        seccion: this.seccion,
        fecha: this.fecha,
        sala: this.sala,
        alumnoCorreo: this.usuario?.correo // Aquí estamos utilizando el correo del usuario autenticado
      };

      console.log('Guardando asistencia:', nuevaAsistencia); // Log para verificar los datos
      this.asistenciaService.agregarAsistencia(nuevaAsistencia);
  
      // Verificar si las asistencias se actualizan correctamente
      this.asistencias = this.asistenciaService.obtenerAsistencias();
      this.actualizarAsistenciasAgrupadas();
  
      this.limpiarFormulario();
      console.log('Asistencia registrada:', nuevaAsistencia);
    } else {
      console.error('Por favor completa todos los campos antes de registrar la asistencia.');
    }
  }

  actualizarAsistenciasAgrupadas() {
    this.asistenciasAgrupadas = this.asistencias.reduce((acc: any, asistencia: any) => {
      const asignatura = asistencia.asignatura || 'Sin asignatura';
      if (!acc[asignatura]) {
        acc[asignatura] = [];
      }
      acc[asignatura].push(asistencia);
      return acc;
    }, {});
  }

  seleccionarAsignatura(asignatura: string) {
    this.asignaturaSeleccionada = asignatura;
  }

  limpiarFormulario() {
    this.asignatura = '';
    this.seccion = '';
    this.fecha = '';
    this.sala = '';
  }
}
