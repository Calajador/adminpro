import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { SubirArchivoService } from './subir-archivo.service';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(private http: HttpClient, public router: Router,
              public _subirArchivo: SubirArchivoService) {
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

  actualizarUsuario(usuario: Usuario) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    console.log(url);

    return this.http.put(url, usuario)
        .pipe(map( (res: any) => {

          if (usuario._id === this.usuario._id) {
            let usuarioDB: Usuario = res.usuario;
            this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
          }
          swal('Usuario Actualizado', usuario.nombre, 'success');
          return true;

        }));
      }



  cambiarImagen(archivo: File, id: string) {

    // =====================================
    // metodo con la promesa y Vanilla JS
    // =====================================

    // this._subirArchivo.subirArchivo( archivo, 'usuarios', id )
    //       .then( (resp: any) => {

    //         this.usuario.img = resp.usuario.img;
    //         swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
    //         this.guardarStorage( id, this.token, this.usuario );

    //       })
    //       .catch( resp => {
    //         console.log( resp );
    //       }) ;


    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
        .subscribe( (res: any) => {

          console.log(res);

          this.usuario.img = res.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
        });
  }

  caragarUsuarios(desde: number = 0) {

    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
        .pipe( map( (res: any) => {
          console.log(res);
          return res.usuarios;
        } ));
  }

  borrarUsuario(id: string) {

    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
          .pipe( map( res => {
            swal('Usuario Borrado', 'Usuario borrado correctamente', 'success');
            return true;
          }));
  }
}
