import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AsistenciaService {
  private asistencias: any[] = []; // Aquí se almacenan las asistencias

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
}
