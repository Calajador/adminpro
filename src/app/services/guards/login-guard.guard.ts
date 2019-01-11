import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(public _usuario: UsuarioService, public router: Router) {  }


  canActivate() {

    if (this._usuario.estaLogueado()) {
      console.log('PASO EL GUARD');
      return true;
    } else {
      console.log('BLOQUEADO POR EL GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
