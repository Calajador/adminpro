import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Departamento } from 'src/app/models/departamento.model';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { Personal } from 'src/app/models/personal.model';
import { TrabajadorService } from 'src/app/services/trabajador.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-trabajador',
  templateUrl: './trabajador.component.html',
  styles: []
})
export class TrabajadorComponent implements OnInit {

  departamentos: Departamento [] = [];
  trabajador: Personal = new Personal('', '', '', '', '');
  departamento: Departamento = new Departamento('');

  constructor(public _dep: DepartamentoService,
              public _trab: TrabajadorService,
              public router: Router,
              public aroute: ActivatedRoute,
              public _modal: ModalUploadService) {

                aroute.params.subscribe(paramas => {

                  let id = paramas ['id'];

                  if (id !== 'nuevo') {
                    this.cargarTrabajador(id);
                  }
                });
              }

  ngOnInit() {
    this._dep.cargarDepartamentos()
      .subscribe((res: any) => {
        this.departamentos = res.departamentos;
      });

    this._modal.notificacion
    .subscribe(() => {
      this.cargarTrabajador(this.trabajador._id);
    });
  }

  cargarTrabajador(id: string) {
    this._trab.cargarTrabajador(id)
      .subscribe(personal => {
        this.trabajador = personal;
        this.trabajador.departamento = personal.departamento._id;
        this.cambioDepartamento(this.trabajador.departamento);
      });
  }

  guardarTrabajador(f: NgForm) {
    console.log(f.valid);
    console.log(f.value);

    if (f.invalid) {
      return;
    }

    this._trab.guardarTrabajador(this.trabajador)
        .subscribe( personal => {
          this.trabajador._id = personal._id;
          this.router.navigate(['/trabajador', personal._id]);
        });
  }

  cambioDepartamento(id: string) {
    this._dep.obtenerDepartamento(id)
      .subscribe(departamento => this.departamento = departamento);
  }

  cambiarFoto() {
    this._modal.mostrarModal('personal', this.trabajador._id);
  }
}
