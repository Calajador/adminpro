import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {

@Input() positivo: number;
@Input() negativo: number;
@Input() neutral: number;

  graficos: any = {
    'grafico1': {
      'labels': ['Positivo', 'Negativo', 'Neutro'],
      'data':  [33, 40, 25],
      'type': 'doughnut',
      'leyenda': 'Tratamiento 1'
    },
    'grafico2': {
      'labels': ['Positivo', 'Negativo'],
      'data':  [4500, 6000],
      'type': 'doughnut',
      'leyenda': 'Tratamiento 2'
    },
    'grafico3': {
      'labels': ['Positivo', 'Negativo'],
      'data':  [95, 5],
      'type': 'doughnut',
      'leyenda': 'Tratamiento 3'
    },
    'grafico4': {
      'labels': ['Positivo', 'Negativo'],
      'data':  [85, 15],
      'type': 'doughnut',
      'leyenda': 'Tratamiento 3'
    },
  };

  constructor() { }

  ngOnInit() {
  }

}
