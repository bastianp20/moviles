import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../services/asistencia.service';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit{
  asistencias: any[] = [];
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';
  sala: string = '';

  constructor(private asistenciaService: AsistenciaService) {


  }
  ngOnInit() {
    this.asistencias = this.asistenciaService.obtenerAsistencias();
  }

  // Función para generar el QR con los datos ingresados
  generarQR() {
    return JSON.stringify({
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
      sala: this.sala,
    });
  }
  
  
}
