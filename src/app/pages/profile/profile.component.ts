import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuario: UsuarioService) {

    this.usuario = this._usuario.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.email = usuario.email;

    this._usuario.actualizarUsuario(this.usuario)
        .subscribe(res => {
          console.log(res);
        });

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

cambiarImagen() {

  this._usuario.cambiarImagen(this.imagenSubir, this.usuario._id);
}

}
