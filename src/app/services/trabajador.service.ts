import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';
import swal from 'sweetalert';
import { Personal } from '../models/personal.model';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  constructor( public http: HttpClient, public _usuario: UsuarioService) { }

  totalPersonal = 0;


  cargarPersonal() {
    let url = URL_SERVICIOS + '/personal';

    return this.http.get(url)
        .pipe(map( (res: any) => {
          this.totalPersonal = res.total;
          return res.personals;
        }));
  }

  cargarTrabajador(id: string) {
    let url = URL_SERVICIOS + '/personal/' + id;

    return this.http.get(url)
            .pipe(map((res: any) => res.personal));
  }

  buscarPersonal(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/personal/' + termino;
    return this.http.get(url)
        .pipe( map( (res: any) => {
          console.log(res);
          return res.personal;
        } ));
  }

  borrarPersonal(id: string) {
    let url = URL_SERVICIOS + '/personal/' + id;
    url += '?token=' + this._usuario.token;

    return this.http.delete(url)
        .pipe(map(res => {
          swal('Trabajador Borrado', 'Trabajador Borrado Correctamente', 'success');
          return res;
        }));
  }

  guardarTrabajador(trabajador: Personal) {
    let url = URL_SERVICIOS + '/personal';

    if (trabajador._id) {
      // Actualizando Trabajador
      url += '/' + trabajador._id;
      url += '?token=' + this._usuario.token;

      return this.http.put(url, trabajador)
        .pipe(map((res: any) => {
          swal('Trabajador Actualizado', trabajador.nombre, 'success');
          return res.personal;
        }));

    } else {
      // Creando Trabajador
      url += '?token=' + this._usuario.token;

      return this.http.post(url, trabajador)
        .pipe(map((res: any) => {
          swal('Trabajador Creado', trabajador.nombre, 'success');
          return res.personal;
        }));
    }
  }
}
