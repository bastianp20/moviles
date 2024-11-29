import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AsistenciaService } from '../services/asistencia.service';

@Component({
  selector: 'app-asistencia-detalle',
  templateUrl: './asistencia-detalle.page.html',
  styleUrls: ['./asistencia-detalle.page.scss'],
})
export class AsistenciaDetallePage implements OnInit {
  alumnos: any[] = []; // Lista de alumnos filtrados
  asistenciasPorAlumno: { [key: string]: any[] } = {}; // Objeto para almacenar las asistencias por alumno

  constructor(
    private authService: AuthService,
    private asistenciaService: AsistenciaService // Inyectar el servicio de asistencia
  ) {}

  ngOnInit() {
    this.cargarAlumnos();
    this.cargarAsistencias();
  }

  cargarAlumnos() {
    // Filtra los alumnos con el dominio @Eduocuc.cl
    const usuarios = this.authService.getUsuarios();
    this.alumnos = usuarios.filter((usuario: any) =>
      usuario.correo.endsWith('@Eduocuc.cl')
    );
  }

  cargarAsistencias() {
    // Carga las asistencias de cada alumno
    this.alumnos.forEach((alumno) => {
      const asistencias = this.asistenciaService.obtenerAsistenciasPorAlumno(alumno.correo);
      this.asistenciasPorAlumno[alumno.correo] = asistencias;
    });
  }
}
