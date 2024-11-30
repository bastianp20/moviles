import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model'; // Asegúrate de importar la interfaz correctamente

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private claveStorage = 'asistencias'; // Clave donde se guardarán las asistencias en localStorage

  constructor() {}

  // Obtener todas las asistencias
  obtenerAsistencias(): Asistencia[] {
    const asistencias = localStorage.getItem(this.claveStorage);
    return asistencias ? JSON.parse(asistencias) : []; // Si no hay asistencias, retornamos un arreglo vacío
  }

  // Obtener las asistencias de un alumno específico
  obtenerAsistenciasPorAlumno(alumnoCorreo: string): Asistencia[] {
    const asistencias = this.obtenerAsistencias();
    return asistencias.filter(
      (asistencia) =>
        asistencia.alumnoCorreo === alumnoCorreo || asistencia.alumnoCorreo === 'No asignado'
    );
  }

  // Agregar una asistencia
  agregarAsistencia(asistencia: Asistencia) {
    const asistencias = this.obtenerAsistencias(); // Obtener las asistencias actuales del localStorage

    // Validar si los datos son válidos
    if (asistencia.alumnoCorreo && asistencia.asignatura && asistencia.sala && asistencia.fecha) {
      asistencias.push(asistencia); // Agregar la nueva asistencia
      localStorage.setItem(this.claveStorage, JSON.stringify(asistencias)); // Guardar nuevamente en localStorage
    }
  }

  // Actualizar una asistencia
  actualizarAsistencia(asistenciaActualizada: Asistencia) {
    let asistencias = this.obtenerAsistencias();
    asistencias = asistencias.map(asistencia =>
      asistencia.alumnoCorreo === asistenciaActualizada.alumnoCorreo ? asistenciaActualizada : asistencia
    );
    localStorage.setItem(this.claveStorage, JSON.stringify(asistencias));
  }
}
