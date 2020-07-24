import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class DominanciaService {

  private dominancia = new BehaviorSubject([]);
  public $dominancia = this.dominancia.asObservable();

  constructor(private router: Router) {
  }

  calculoPesoCuadrante(label, palabras) {
    return (palabras.map((palabra: any) => {return palabra[label]})).reduce((a,b) => a + b );
  }

  calcularDominancia(palabras) {
    const calculoCuadranteD = this.calculoPesoCuadrante('d', palabras);
    const calculoCuadranteC = this.calculoPesoCuadrante('c',  palabras);
    const calculoCuadranteB = this.calculoPesoCuadrante('b', palabras);
    const calculoCuadranteA = this.calculoPesoCuadrante('a',  palabras);
    const total = calculoCuadranteA + calculoCuadranteB + calculoCuadranteD + calculoCuadranteC;
    let cuadrantes = [
      (calculoCuadranteD * 100 / total).toFixed(2),
      (calculoCuadranteC * 100 / total).toFixed(2),
      (calculoCuadranteB * 100 / total).toFixed(2),
      (calculoCuadranteA * 100 / total).toFixed(2),
    ];

    this.dominancia.next(cuadrantes);
  }

  navegateTest() {
    this.router.navigateByUrl('/test');
  }

  navegateChart() {
    this.router.navigateByUrl('/chart');
  }

}
