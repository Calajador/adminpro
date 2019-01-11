import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {

    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {

          localStorage.setItem('id', id);
          localStorage.setItem('token', token);
          localStorage.setItem('usuario', JSON.stringify(usuario));

          this.usuario = usuario;
          this.token = token;
  }

  logOut() {
    this.usuario = null;
    this.token = '';

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {

    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, {token})
        .pipe( map( (res: any) => {

          this.guardarStorage(res.id, res.token, res.usuario);
          return true;
        }));
  }

  loginUsuario( usuario: Usuario, recordar: boolean) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
        .pipe(map( (res: any) => {

          this.guardarStorage(res.id, res.token, res.usuario);
          return true;
        }));
  }

  crearUsuario( usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario)
      .pipe(map( (res: any) => {

        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
      }));
  }
}
