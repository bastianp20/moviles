import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private asistencias: any[] = []; // Aquí se almacenan las asistencias
  private alumnos: any[] = []; // Aquí puedes almacenar los datos de los alumnos

  // Método para obtener las asistencias registradas
  obtenerAsistencias() {
    return this.asistencias;
  }

  // Método para agregar una nueva asistencia
  agregarAsistencia(asistencia: any) {
    this.asistencias.push(asistencia);
    console.log('Asistencia añadida:', asistencia);
    console.log('Lista actual de asistencias:', this.asistencias);
  }

  obtenerAsistenciasAgrupadas() {
    return this.asistencias.reduce((agrupadas, asistencia) => {
      const { asignatura } = asistencia;
      if (!agrupadas[asignatura]) {
        agrupadas[asignatura] = [];
      }
      agrupadas[asignatura].push(asistencia);
      return agrupadas;
    }, {});
  }

  // Método para obtener los alumnos
  obtenerAlumnos() {
    return this.alumnos;
  }

  // Método para agregar un alumno
  agregarAlumno(alumno: any) {
    this.alumnos.push(alumno);
    console.log('Alumno añadido:', alumno);
  }
}
