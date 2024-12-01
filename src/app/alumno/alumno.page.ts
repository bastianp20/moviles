import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { AlumnoService } from 'src/app/services/alumno.service'; // Asegúrate de importar el servicio
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  standalone:true, 
  styleUrls: ['./alumno.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AlumnoPage implements OnInit {
  asignaturasDisponibles: string[] = ['Arquitectura', 'Ingles', 'Moviles', 'Matematicas'];
  asignatura: string = '';
  seccion: string = '';
  fecha: string = '';
  sala: string = '';
  
  listaAlumnos: any[] = [];
  asistencias: any[] = [];
  usuario: any = null;

  constructor(
    private asistenciaService: AsistenciaService,
    private authService: AuthService,
    private navCtrl: NavController,
    private alumnoService: AlumnoService // Inyecta el servicio aquí
  ) {}

  ngOnInit() {
    const correo = 'usuario@eduocuc.cl'; // Suponiendo que se obtiene del login
    this.usuario = this.authService.validarUsuario(correo, 'contraseñaDelUsuario');
    this.obtenerAlumnos();
    this.asistencias = this.asistenciaService.obtenerAsistencias();

    // Si se ha escaneado un QR y los datos están disponibles, agregar el alumno
    const alumnoData = this.alumnoService.getAlumnoData();
    if (alumnoData) {
      this.agregarAlumnoDesdeQR(alumnoData);
      this.alumnoService.clearAlumnoData(); // Limpiar los datos después de usarlos
    }
  }

  obtenerAlumnos() {
    const alumnos = this.authService.getUsuarios();
    this.listaAlumnos = alumnos
      .filter((alumno: any) => alumno.correo.endsWith('@Eduocuc.cl')) // Filtra alumnos por dominio
      .map((alumno: any) => ({
        correo: alumno.correo,
        asignatura: alumno.asignatura || 'No asignada',
        sala: alumno.sala || 'No especificada',
      }));
  }

  // Método para mostrar las asistencias de un alumno
  verAsistencias(alumno: string) {
    this.asistencias = this.asistenciaService.obtenerAsistenciasPorAlumno(alumno);
  }

  // Método para ver la lista de alumnos (correspondiente a la llamada en el template)
  verListaAlumnos() {
    console.log('Lista de alumnos', this.listaAlumnos);
    this.navCtrl.navigateRoot('/asistencia-detalle');
    // Puedes agregar más lógica si es necesario
  }

  // Método para agregar un alumno desde los datos del QR
  agregarAlumnoDesdeQR(datosQR: any) {
    const alumno = {
      correo: datosQR.correo || 'No asignado', // Asignar correo desde el QR
      asignatura: datosQR.asignatura || 'No asignada', // Asignar asignatura desde el QR
      sala: datosQR.sala || 'No especificada', // Asignar sala desde el QR
    };
    
    // Agregar el alumno a la lista
    this.listaAlumnos.push(alumno);
  }

  generarQR() {
    const qrData = {
      asignatura: this.asignatura,
      seccion: this.seccion,
      fecha: this.fecha,
      sala: this.sala
    };
    return JSON.stringify(qrData);
  }
}
