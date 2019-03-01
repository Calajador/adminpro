import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor(public http: HttpClient) { }

  subirArchivo( archivo: File, tipo: string, id: string ) {

    // =====================================
    // Metodo de Vanilla JS con una Promesa
    // =====================================

//   return new Promise( (resolve, reject ) => {

//     let formData = new FormData();
//     let xhr = new XMLHttpRequest();

//     formData.append( 'imagen', archivo, archivo.name );

//     xhr.onreadystatechange = function() {

//       if ( xhr.readyState === 4 ) {

//         if ( xhr.status === 200 ) {
//           console.log( 'Imagen subida' );
//           resolve( JSON.parse( xhr.response ) );
//         } else {
//           console.log( 'Fallo la subida' );
//           reject( xhr.response );
//         }

//       }
//     };

//     let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

//     xhr.open('PUT', url, true );
//     xhr.send( formData );

//   });


      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      const formData: FormData = new FormData();

      formData.append('imagen', archivo, archivo.name);
      return this.http.put(url, formData)
      .pipe(map ( (res: Usuario) => {
        console.log(res);
        return res;
      }));
}

}
