import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  usuarios: Usuario [] = [];
  desde = 0;
  totalRegistros = 0;

  constructor(public _user: UsuarioService) {

    // this.contarTres().then( () => {

    // }).catch(error => console.error('error en la promesa', error));

  }

  ngOnInit() {
    this.cargarUsuarios();
  }


  // contarTres(): Promise<boolean> {

  //   // tslint:disable-next-line:no-shadowed-variable
  //   return new Promise((resolve, reject) => {

  //     let contador = 0;

  //    const intervalo = setInterval( () => {

  //       contador += 1;
  //       console.log(contador);

  //       if (contador === 3) {
  //         resolve(true);
  //         clearInterval(intervalo);
  //       }

  //     }, 1000);

  //   });

  // }

  cargarUsuarios() {
    this._user.caragarUsuarios(this.desde)
      .subscribe((res: any) => {
        this.totalRegistros = res.total;
        this.usuarios = res.usuarios;
        console.log(res);
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

}
