import { Component, OnInit } from '@angular/core';
import { Personal } from '../../models/personal.model';
import { TrabajadorService } from 'src/app/services/trabajador.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styles: []
})
export class PersonalComponent implements OnInit {

  personal: Personal [] = [];

  constructor(public _trab: TrabajadorService) { }

  ngOnInit() {
    this.cargarPersonal();
  }

  cargarPersonal() {
    this._trab.cargarPersonal()
        .subscribe(personal => this.personal = personal);
  }

  buscarTrabajador(termino: string) {
    if (termino.length <= 0) {
      this.cargarPersonal();
      return;
    }

    this._trab.buscarPersonal(termino)
        .subscribe(personal => this.personal = personal);
  }

  borrartrabajador(trabajador: Personal) {
    this._trab.borrarPersonal(trabajador._id)
        .subscribe( () => this.cargarPersonal());
  }

}
