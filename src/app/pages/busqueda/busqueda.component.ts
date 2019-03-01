import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { Departamento } from 'src/app/models/departamento.model';
import { Personal } from 'src/app/models/personal.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario [] = [];
  departamentos: Departamento [] = [];
  personal: Personal [] = [];

  constructor(
    public aroute: ActivatedRoute,
    public http: HttpClient)
    {
      aroute.params.subscribe(params => {
        let termino = params ['termino'];
        this.buscar(termino);
      });
    }

  ngOnInit() {
  }

  buscar(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;
    this.http.get(url)
      .subscribe((res: any) => {
        console.log(res);

        this.usuarios = res.usuario;
        this.departamentos = res.departamento;
        this.personal = res.personal;
      });
  }
}
