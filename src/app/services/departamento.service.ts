import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import { Departamento } from '../models/departamento.model';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(public http: HttpClient, public _usuario: UsuarioService) {
   }

  cargarDepartamentos() {
    let url = URL_SERVICIOS + '/departamento';
    return this.http.get(url);
  }

  obtenerDepartamento(id: string) {
    let url = URL_SERVICIOS + '/departamento/' + id;
    return this.http.get(url)
        .pipe(map( (res: any) => res.departamento));
    }

  borrarDepartamento(id: string) {
    let url = URL_SERVICIOS + '/departamento/' + id;
    url += '?token=' + this._usuario.token;
    return this.http.delete(url)
      .pipe( map( res => {
        swal('Departamento Borrado', 'Departamento borrado correctamente', 'success');
      }));
  }

  crearDepartamento(nombre: string) {
    let url = URL_SERVICIOS + '/departamento';
    url += '?token=' + this._usuario.token;

    return this.http.post(url, {nombre})
          .pipe(map((res: any) => res.departamento));
  }

  buscarDepartamento(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/departamentos/' + termino;
    return this.http.get(url)
        .pipe( map( (res: any) => {
          console.log(res);
          return res.departamentos;
        } ));
  }

  actualizarDepartamento(departamento: Departamento) {
    let url = URL_SERVICIOS + '/departamento/' + departamento._id;
    url += '?token=' + this._usuario.token;

    return this.http.put(url, departamento)
      .pipe(map((res: any) => res.departamento));
  }
}
