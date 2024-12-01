import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AsistenciaService } from '../services/asistencia.service';
import { Asistencia } from '../services/asistencia.model'; // Importa la interfaz correctamente

@Component({
  selector: 'app-asistencia-detalle',
  templateUrl: './asistencia-detalle.page.html',
  standalone : true,
  styleUrls: ['./asistencia-detalle.page.scss'],
})
export class AsistenciaDetallePage implements OnInit {
  alumnos: any[] = []; // Lista de alumnos filtrados
  asistenciasPorAlumno: { [key: string]: Asistencia[] } = {}; // Objeto para almacenar las asistencias por alumno

  constructor(
    private authService: AuthService,
    private asistenciaService: AsistenciaService // Inyectar el servicio de asistencia
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarAsistencias();
  }

  /**
   * Cargar alumnos con correos que terminan en @Eduocuc.cl
   */
  cargarAlumnos() {
    const usuarios = this.authService.getUsuarios();
    this.alumnos = usuarios.filter((usuario: any) =>
      usuario.correo.endsWith('@Eduocuc.cl')
    );
  }

  /**
   * Cargar todas las asistencias desde el servicio
   */
  cargarAsistencias() {
    this.alumnos.forEach(alumno => {
      const asistencias = this.asistenciaService.obtenerAsistenciasPorAlumno(alumno.correo) || [];
      this.asistenciasPorAlumno[alumno.correo] = asistencias;
    });
  }
}
