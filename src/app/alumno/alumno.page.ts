import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';

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
  asignaturasDisponibles: string[] = ['Matemáticas', 'Inglés', 'Móviles', 'Arquitectura']; // Asignaturas predefinidas
  asignaturaSeleccionada: string = ''; // Almacena la asignatura seleccionada

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit() {
    this.asistencias = this.asistenciaService.obtenerAsistencias();
    this.actualizarAsistenciasAgrupadas();
  }

  // Generar el contenido del QR
  generarQR() {
    return JSON.stringify({
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
      sala: this.sala,
    });
  }

  // Registrar una nueva asistencia
  registrarAsistencia() {
    if (this.asignatura && this.seccion && this.fecha && this.sala) {
      const nuevaAsistencia = {
        asignatura: this.asignatura,
        seccion: this.seccion,
        fecha: this.fecha,
        sala: this.sala,
      };
      this.asistenciaService.agregarAsistencia(nuevaAsistencia);
      this.asistencias = this.asistenciaService.obtenerAsistencias();
      this.actualizarAsistenciasAgrupadas();
      this.limpiarFormulario();
      console.log('Asistencia registrada:', nuevaAsistencia);
    } else {
      console.error('Por favor completa todos los campos antes de registrar la asistencia.');
    }
  }

  // Agrupar las asistencias por asignatura
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

  // Seleccionar una asignatura para ver sus asistencias
  seleccionarAsignatura(asignatura: string) {
    this.asignaturaSeleccionada = asignatura;
  }

  // Limpiar los campos después de registrar la asistencia
  limpiarFormulario() {
    this.asignatura = '';
    this.seccion = '';
    this.fecha = '';
    this.sala = '';
  }
}
