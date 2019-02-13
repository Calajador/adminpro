import { Component, OnInit } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Departamento } from 'src/app/models/departamento.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styles: []
})
export class DepartamentosComponent implements OnInit {

  departamentos: Departamento [] = [];

  totalRegistros = 0;

  cargando = true;

  constructor(public _dept: DepartamentoService, public _modal: ModalUploadService) {  }

  ngOnInit() {
    this.cargarDepartamentos();

    this._modal.notificacion
        .subscribe( () => this.cargarDepartamentos());
  }

  cargarDepartamentos() {
    this._dept.cargarDepartamentos()
        .subscribe((res: any) => {
          console.log(res);
          this.totalRegistros = res.total;
          this.departamentos  = res.departamentos;
          this.cargando = false;
        });
  }

  buscarDepartamento(termino: string) {
    if (termino.length <= 0) {
      this.cargarDepartamentos();
      return;
    }

    this._dept.buscarDepartamento(termino)
      .subscribe(res => this.departamentos = res);
  }

  actualizarDepartamento(departamento: Departamento) {

  }

  borrarDepartamento(departamento: Departamento) {
    this._dept.borrarDepartamento(departamento._id)
      .subscribe( () => this.cargarDepartamentos() );
  }

  crearDepartamento() {
    swal({
      title: 'Crear Departamento',
      text: 'Ingrese el nombre del departamento',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._dept.crearDepartamento(valor)
        .subscribe( () => this.cargarDepartamentos());
    });
  }

  actualizarImagen(departamento: Departamento) {
    this._modal.mostrarModal('departamentos', departamento._id);
  }

}
