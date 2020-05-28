import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DominanciaService } from '../dominancia.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  @ViewChild('mapa1') mapa1: any;
  @ViewChild('mapa2') mapa2: any;
  @ViewChild('mapa3') mapa3: any;

  mapa1Info: string[]  = [ 
    'mapa1-palabra1', 'mapa1-palabra2', 'mapa1-palabra3', 'mapa1-palabra4',
  ];
  mapa2Info: string[]  = [
    'mapa2-palabra1', 'mapa2-palabra2', 'mapa2-palabra3'
  ];
  mapa3Info: string[] = [
    'mapa3-palabra1', 'mapa3-palabra2', 'mapa3-palabra3'
  ];
  isLinear = false;
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
  Siguiente1(){
    this.selectedMapa1 =  this.mapa1.selectedOptions.selected.map((item: any) => {
      return item._text.nativeElement.innerText
    });
  }

  Siguiente2(){
    this.selectedMapa2 =  this.mapa2.selectedOptions.selected.map((item: any) => {
      return item._text.nativeElement.innerText
    });
  }

  Siguiente3(){
    this.selectedMapa3 =  this.mapa3.selectedOptions.selected.map((item: any) => {
      return item._text.nativeElement.innerText
    });
    this.dominancia.calcularDominancia([...this.selectedMapa1, ...this.selectedMapa2, ...this.selectedMapa3]);
  }

  limpiar() {
    this.mapa1.deselectAll();
    this.mapa2.deselectAll();
    this.mapa3.deselectAll();
    this.dominancia.calcularDominancia([100,100,100]);

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}