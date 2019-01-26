import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from 'src/app/services/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;

  constructor( public _subir: SubirArchivoService,
    public _modal: ModalUploadService ) { }


  ngOnInit() {
    }

    cerrarModal() {
      this.imagenSubir = null;
      this.imagenTemp = null;

      this._modal.ocultarModal();
    }

   seleccionImage(archivo: File) {

    if (!archivo) {
    this.imagenSubir = null;

      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      swal('Solo Imagenes', 'El archivo seleccionado no es una imagen', 'error');
    this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader;
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onload = () => this.imagenTemp = reader.result.toString();

}


  subirImagen() {
    this._subir.subirArchivo(this.imagenSubir, this._modal.tipo, this._modal.id)
          .subscribe(( res: Usuario) => {
            console.log(res);
            this._modal.notificacion.emit(res);
            this.cerrarModal();
          });
  }

}
