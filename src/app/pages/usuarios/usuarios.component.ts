import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';


declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario [] = [];
  desde = 0;

  totalRegistros = 0;

  cargando = true;

  constructor(public _usuario: UsuarioService,
              public _modal: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modal.notificacion
        .subscribe( res => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modal.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuario.caragarUsuarios(this.desde)
          .subscribe( (res: any) => {
            this.totalRegistros = res.total;
            this.usuarios = res.usuarios;
            this.cargando = false;
          });
  }

  cambiarDesde(valor: number) {

    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }
  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._usuario.buscarUsuarios(termino)
          .subscribe( (usuarios: Usuario []) => {
            this.usuarios = usuarios;
            console.log('usuarios ' + this.usuarios);
            this.cargando = false;
          });
  }

  borrarUsuario(usuario: Usuario) {

    if (usuario._id === this._usuario.usuario._id) {
      swal('No se puede borrar usuario', 'No te puedes borrar a ti mismo', 'error');
    }

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a'  + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then( borrar => {

      console.log(borrar);

      if (borrar) {

        this._usuario.borrarUsuario(usuario._id)
            .subscribe( borrado => {
              console.log(borrado);
              this.cargarUsuarios();
            });
      }
    });
  }

  guardarUsuario( usuario: Usuario ) {
    this._usuario.actualizarUsuario(usuario)
        .subscribe();
  }
}
