import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DominanciaService } from '../dominancia.service';

const PALABRAS_MINIMAS = 2;
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  palabras_minimas = PALABRAS_MINIMAS;
  @ViewChild('mapa1') mapa1: any;
  @ViewChild('mapa2') mapa2: any;
  @ViewChild('mapa3') mapa3: any;

  mapa1Info: string[] = [
    'mapa1-palabra1', 'mapa1-palabra2', 'mapa1-palabra3', 'mapa1-palabra4',
  ];
  mapa2Info: string[] = [
    'mapa2-palabra1', 'mapa2-palabra2', 'mapa2-palabra3'
  ];
  mapa3Info: string[] = [
    'mapa3-palabra1', 'mapa3-palabra2', 'mapa3-palabra3'
  ];

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  selectedMapa1: any;
  selectedMapa2: any;
  selectedMapa3: any;
  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dominancia: DominanciaService,
  ) {
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
    if (this.mapa1.selectedOptions.selected.length === PALABRAS_MINIMAS) {
      this.firstFormGroup.setValue({ firstCtrl: 'NewData' });
    } else {
      this.firstFormGroup.setValue({ firstCtrl: '' });
    }
  }

  validator2() {
    if (this.mapa2.selectedOptions.selected.length === PALABRAS_MINIMAS) {
      this.secondFormGroup.setValue({ secondCtrl: 'NewData' });
    } else {
      this.secondFormGroup.setValue({ secondCtrl: '' });
    }
  }

  Siguiente1() {
    this.selectedMapa1 = this.mapa1.selectedOptions.selected.map((item: any) => {
      return item._text.nativeElement.innerText
    });
    this.validacionMensaje(this.selectedMapa1);
  }

  Siguiente2() {
    this.selectedMapa2 = this.mapa2.selectedOptions.selected.map((item: any) => {
      return item._text.nativeElement.innerText
    });
    this.validacionMensaje(this.selectedMapa2);
  }

  Siguiente3() {
    this.selectedMapa3 = this.mapa3.selectedOptions.selected.map((item: any) => {
      return item._text.nativeElement.innerText
    });
    if (this.validacionMensaje(this.selectedMapa3)) {
      this.dominancia.calcularDominancia([...this.selectedMapa1, ...this.selectedMapa2, ...this.selectedMapa3]);
      this.dominancia.navegateChart()
    }

  }

  limpiar() {
    this.mapa1.deselectAll();
    this.mapa2.deselectAll();
    this.mapa3.deselectAll();
    this.dominancia.calcularDominancia([100, 100, 100]);

  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'ok', {
      duration: 2000,
    });
  }
}