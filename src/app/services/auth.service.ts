import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly STORAGE_KEY = 'usuarios';

  getUsuarios() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  guardarUsuario(usuario: any) {
    const usuarios = this.getUsuarios();
    usuarios.push(usuario);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(usuarios));
  }

  validarDominioCorreo(correo: string, dominio: string): boolean {
    return correo.endsWith(dominio);
  }

  validarUsuario(correo: string, password: string) {
    const usuarios = this.getUsuarios();
    return usuarios.find((u: any) => u.correo === correo && u.contraseña === password);
  }

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
}
