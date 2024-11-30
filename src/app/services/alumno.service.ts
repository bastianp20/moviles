import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private alumnoData: any = null;

  constructor() { }

  setAlumnoData(data: any) {
    this.alumnoData = data;
  }

  getAlumnoData() {
    return this.alumnoData;
  }

  clearAlumnoData() {
    this.alumnoData = null;
  }
}
