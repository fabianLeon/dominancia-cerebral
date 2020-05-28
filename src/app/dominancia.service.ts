import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DominanciaService {

  private dominancia = new BehaviorSubject([]);
  public $dominancia = this.dominancia.asObservable();

  CuadranteD: string[]  = [
    'mapa1-palabra1', 'mapa2-palabra2', 'mapa1-palabra3'
  ];
  CuadranteC: string[]  = [
    'mapa3-palabra1', 'mapa3-palabra2', 'mapa3-palabra3'
  ];
  CuadranteB: string[]  = [
    'mapa1-palabra1', 'mapa1-palabra2', 'mapa1-palabra3'
  ];
  CuadranteA: string[]  = [
    'mapa2-palabra2', 'mapa2-palabra2', 'mapa2-palabra3'
  ];

  constructor() { }

  
  calcularDominancia(palabras) {
    const calculoCuadranteD = (palabras.map((palabra) => { 
      return this.CuadranteD.indexOf(palabra) > -1 ? 1:0;
    })).reduce((a,b) => a + b );

    const calculoCuadranteC = (palabras.map((palabra) => { 
      return this.CuadranteC.indexOf(palabra) > -1 ? 1:0;
    })).reduce((a,b) => a + b );

    const calculoCuadranteB = (palabras.map((palabra) => { 
      return this.CuadranteB.indexOf(palabra) > -1 ? 1:0;
    })).reduce((a,b) => a + b );

    const calculoCuadranteA = (palabras.map((palabra) => { 
      return this.CuadranteA.indexOf(palabra) > -1 ? 1:0;
    })).reduce((a,b) => a + b );

    let cuadrantes = [
      calculoCuadranteD,
      calculoCuadranteC,
      calculoCuadranteB,
      calculoCuadranteA,
    ];
    this.dominancia.next(cuadrantes);
  }

}
