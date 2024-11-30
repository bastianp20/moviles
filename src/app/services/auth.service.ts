import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'usuarios';

  // Obtener usuarios almacenados
  getUsuarios() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  // Guardar un nuevo usuario
  guardarUsuario(usuario: any) {
    const usuarios = this.getUsuarios();
    const existeCorreo = usuarios.some((u: any) => u.correo === usuario.correo);
    if (existeCorreo) {
      throw new Error('El correo ya está registrado');
    }
    usuarios.push(usuario);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  }

  // Validar si un correo tiene un dominio específico
  validarDominioCorreo(correo: string, dominio: string): boolean {
    return correo.endsWith(dominio);
  }

  // Validar usuario por correo y contraseña
  validarUsuario(correo: string, password: string) {
    const usuarios = this.getUsuarios();
    return usuarios.find(
      (u: any) => u.correo === correo && u.contraseña === password
    );
  }

  // Actualizar la contraseña de un usuario
  actualizarContraseña(correo: string, nuevaContraseña: string) {
    const usuarios = this.getUsuarios();
    const usuario = usuarios.find((u: any) => u.correo === correo);
    if (usuario) {
      usuario.contraseña = nuevaContraseña;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
      return true;
    }
    return false;
  }

  // Validar si un correo ya está registrado
  correoRegistrado(correo: string): boolean {
    const usuarios = this.getUsuarios();
    return usuarios.some((u: any) => u.correo === correo);
  }
}
