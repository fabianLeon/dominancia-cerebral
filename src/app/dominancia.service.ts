import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import {cuadranteD, cuadranteC, cuadranteB, cuadranteA } from "./test/mapasCuadrantes"
@Injectable({
  providedIn: 'root'
})
export class DominanciaService {

  private dominancia = new BehaviorSubject([]);
  public $dominancia = this.dominancia.asObservable();

  CuadranteD: string[]  = cuadranteD;
  CuadranteC: string[]  = cuadranteC;
  CuadranteB: string[]  = cuadranteB;
  CuadranteA: string[]  = cuadranteA;

  constructor(private router: Router) {
    console.log("cuadranteD", this.CuadranteD.length)
    console.log("cuadranteA", this.CuadranteA.length)
    console.log("cuadranteC", this.CuadranteC.length)
    console.log("cuadranteB", this.CuadranteB.length)
  }

  
  calcularDominancia(palabras) {
    const calculoCuadranteD = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteD.filter((data) => (data === palabra));
      return (palabrasEncontradas.length);
    })).reduce((a,b) => a + b );

    const calculoCuadranteC = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteC.filter((data) => (data === palabra));
      return (palabrasEncontradas.length);
    })).reduce((a,b) => a + b );

    const calculoCuadranteB = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteB.filter((data) => (data === palabra));
      return (palabrasEncontradas.length);
    })).reduce((a,b) => a + b );

    const calculoCuadranteA = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteA.filter((data) => (data === palabra));
      return (palabrasEncontradas.length);
    })).reduce((a,b) => a + b );

    const total = calculoCuadranteA + calculoCuadranteB + calculoCuadranteD + calculoCuadranteC;
    let cuadrantes = [
      (calculoCuadranteD*100 / total).toFixed(2),
      (calculoCuadranteC*100 / total).toFixed(2),
      (calculoCuadranteB*100 / total).toFixed(2),
      (calculoCuadranteA*100 / total).toFixed(2),
    ];
    console.log("calculo cuadranteD", calculoCuadranteD)
    console.log("calculo cuadranteC", calculoCuadranteC)
    console.log("calculo cuadranteB", calculoCuadranteB)
    console.log("calculo cuadranteA", calculoCuadranteA)

    this.dominancia.next(cuadrantes);
  }

  navegateTest(){
    this.router.navigateByUrl('/test');
  }

  navegateChart(){
    this.router.navigateByUrl('/chart');
  }

}
