export interface Asistencia {
  alumnoCorreo: string; // Renombrado de 'correo' a 'alumnoCorreo'
  asignatura: string;
  sala: string;
  fecha?: string; // Opcional, si se maneja fecha
}
