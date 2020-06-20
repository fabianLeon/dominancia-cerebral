import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DominanciaService } from '../dominancia.service';
import { mapa1, mapa2, mapa3 } from './mapasCuadrantes';
const PALABRAS_MINIMAS = 8;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  palabras_minimas = PALABRAS_MINIMAS;
  labelPalabras = `Escoge las primeras ${PALABRAS_MINIMAS} palabras con las que te identificas`;
  @ViewChild('mapa1') mapa1: any;
  @ViewChild('mapa2') mapa2: any;
  @ViewChild('mapa3') mapa3: any;

  mapa1Info: any;
  mapa2Info: any;
  mapa3Info: any;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedMapa1: any = [];
  selectedMapa2: any = [];
  selectedMapa3: any = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dominancia: DominanciaService,
  ) {
    this.mapa1Info = mapa1.map((data: any) => { return { ...data, ...{ selected: false, color: 'accent' } } });
    this.mapa2Info = mapa2.map((data: any) => { return { ...data, ...{ selected: false, color: 'accent' } } });
    this.mapa3Info = mapa3.map((data: any) => { return { ...data, ...{ selected: false, color: 'accent' } } });
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  validacionMensaje(listado: any) {
    if (!(listado.length === PALABRAS_MINIMAS)) {
      const message = listado.length > PALABRAS_MINIMAS ?
        `Debe seleccionar solo ${PALABRAS_MINIMAS} palabras ! ` : `Debe seleccionar almenos ${PALABRAS_MINIMAS} palabras ! `;
      this.openSnackBar(message);
    }
    return (listado.length === PALABRAS_MINIMAS);
  }

  validator1() {
    if (this.selectedMapa1.length === PALABRAS_MINIMAS) {
      this.firstFormGroup.setValue({ firstCtrl: 'NewData' });
    } else {
      this.firstFormGroup.setValue({ firstCtrl: '' });
    }
  }

  validator2() {

    if (this.selectedMapa2.length === PALABRAS_MINIMAS) {
      this.secondFormGroup.setValue({ secondCtrl: 'NewData' });
    } else {
      this.secondFormGroup.setValue({ secondCtrl: '' });
    }
  }

  Siguiente1() {
    this.validacionMensaje(this.selectedMapa1);
  }

  Siguiente2() {
    this.validacionMensaje(this.selectedMapa2);
  }

  Siguiente3() {
    if (this.validacionMensaje(this.selectedMapa3)) {
      this.dominancia.calcularDominancia([...this.selectedMapa1, ...this.selectedMapa2, ...this.selectedMapa3]);
      this.dominancia.navegateChart();
    }

  }

  select(mapa, palabra: any) {
    palabra.selected = !palabra.selected;
    if (!palabra.selected) {
      palabra.color = 'accent'
    } else {
      palabra.color = 'primary'
    }
    return (mapa.filter((palabra) => (palabra.selected)));
  }

  selectMapa1(palabra) {
    console.log(palabra);
    if (this.selectedMapa1.length < this.palabras_minimas || palabra.selected) {
      this.selectedMapa1 = this.select(this.mapa1Info, palabra);
      this.validator1();
    } else {
      const message = `Puede seleccionar máximo ${PALABRAS_MINIMAS}`;
      this.openSnackBar(message);
    }
  }

  selectMapa2(palabra) {

    if (this.selectedMapa2.length < this.palabras_minimas || palabra.selected) {
      this.selectedMapa2 = this.select(this.mapa2Info, palabra);
      this.validator2();
    } else {
      const message = `Puede seleccionar máximo ${PALABRAS_MINIMAS}`;
      this.openSnackBar(message);
    }
  }

  selectMapa3(palabra) {
    if (this.selectedMapa3.length < this.palabras_minimas || palabra.selected) {
      this.selectedMapa3 = this.select(this.mapa3Info, palabra);
    } else {
      const message = `Puede seleccionar máximo ${PALABRAS_MINIMAS}`;
      this.openSnackBar(message);
    }
  }



  limpiar() {

    this.mapa1Info = mapa1.map((data: any) => { return { ...data, ...{ selected: false, color: 'accent' } } });
    this.mapa2Info = mapa2.map((data: any) => { return { ...data, ...{ selected: false, color: 'accent' } } });
    this.mapa3Info = mapa3.map((data: any) => { return { ...data, ...{ selected: false, color: 'accent' } } });

    this.selectedMapa1 = [];
    this.selectedMapa2 = [];
    this.selectedMapa3 = [];

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ok', {
      duration: 2000,
    });
  }
}
