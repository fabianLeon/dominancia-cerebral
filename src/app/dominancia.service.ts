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

  constructor(private router: Router) { }

  
  calcularDominancia(palabras) {
    const calculoCuadranteD = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteD.filter((data) => (data === palabra));
      return (palabrasEncontradas.length/this.CuadranteD.length);
    })).reduce((a,b) => a + b );

    const calculoCuadranteC = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteC.filter((data) => (data === palabra));
      return (palabrasEncontradas.length/this.CuadranteC.length);
    })).reduce((a,b) => a + b );

    const calculoCuadranteB = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteB.filter((data) => (data === palabra));
      return (palabrasEncontradas.length/this.CuadranteB.length);
    })).reduce((a,b) => a + b );

    const calculoCuadranteA = (palabras.map((palabra) => { 
      const palabrasEncontradas = this.CuadranteA.filter((data) => (data === palabra));
      return (palabrasEncontradas.length/this.CuadranteA.length);
    })).reduce((a,b) => a + b );

    let cuadrantes = [
      (calculoCuadranteD*100).toFixed(2),
      (calculoCuadranteC*100).toFixed(2),
      (calculoCuadranteB*100).toFixed(2),
      (calculoCuadranteA*100).toFixed(2),
    ];
    this.dominancia.next(cuadrantes);
  }

  navegateTest(){
    this.router.navigateByUrl('/test');
  }

  navegateChart(){
    this.router.navigateByUrl('/chart');
  }

}
