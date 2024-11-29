import { Injectable } from '@angular/core';
import { Asistencia } from './asistencia.model';  // Asegúrate de que la ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private STORAGE_KEY = 'asistencias';

  obtenerAsistencias(): Asistencia[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  agregarAsistencia(asistencia: Asistencia) {
    const asistencias = this.obtenerAsistencias();
    asistencias.push(asistencia);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(asistencias));
  }

  obtenerAsistenciasPorAlumno(alumnoCorreo: string): Asistencia[] {
    const asistencias = this.obtenerAsistencias();
    return asistencias.filter(a => a.alumnoCorreo === alumnoCorreo);
  }
}
