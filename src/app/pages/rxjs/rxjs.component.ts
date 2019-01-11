import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  constructor() {

    this.retonarObservable()
    .subscribe(
       numero => console.log( 'subs ', numero),
       error => console.error('error ', error),
       () => console.log('termimo')
       );
  }

  ngOnInit() {
  }

  ngOnDestroy() {

  }

  retonarObservable(): Observable<any> {

    return new Observable( (observer: Subscriber <any>) => {

      let contador = 0;

      const intervalo = setInterval( () => {

        contador ++;

        observer.next(contador);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilio');
        // }

      }, 1000);

    }).pipe(
      map( res => res.valor),
      filter( (valor, index) => {

        if ((valor % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
     );
  }

}
