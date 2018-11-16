import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
  }

  cambiarColor(tema: string) {
    this._ajustes.aplicarAjustes(tema);
    console.log(tema);


  }
}
