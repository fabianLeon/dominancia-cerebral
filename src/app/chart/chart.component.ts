import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DominanciaService } from '../dominancia.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  /**
   * The ChartJS Object
   * @var {any} chart
   */
  public chart: any = null;
  public resultados: any;
  chartColors = {
    red: 'rgb(235, 47, 6)',
    yellow: 'rgb(251, 197, 49)',
    green: 'rgb(76, 209, 55)',
    blue: 'rgb(0, 168, 255)',
  };

  constructor(private dominancia: DominanciaService) {

    this.resultados = [
      {
        color: 'azul',
        data: 100
      },
      {
        color: 'amarillo',
        data: 100
      },
      {
        color: 'verde',
        data: 100
      }, {
        color: 'rojo',
        data: 100
      },
    ];
  }

  atras() {
    this.dominancia.navegateTest();
  }

  ngAfterViewInit() {
    if (this.resultados[0].data == 100 && this.resultados[1].data == 100
      && this.resultados[2].data == 100 && this.resultados[3].data == 100) {
      this.dominancia.navegateTest();
    }
  }

  ngOnInit(): void {
    Chart.defaults.polarArea.animation.animateScale = false;

    this.chart = new Chart('dominancia', {
      type: 'polarArea',
      options: {

      },
      data: {
        datasets: [{
          data: [100, 100, 100, 100],
          backgroundColor: [
            this.chartColors.yellow,
            this.chartColors.red,
            this.chartColors.green,
            this.chartColors.blue,
          ],
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
          'D - Amarillo',
          'C - Rojo',
          'B - Verde',
          'A - Azul',
        ]
      }

    })
    this.dominancia.$dominancia.subscribe((data) => {
      if (data.length > 0) {
        this.resultados = [
          {
            color: 'azul',
            data: data[3]
          }, {
            color: 'amarillo',
            data: data[0]
          }, {
            color: 'verde',
            data: data[2]
          }, {
            color: 'rojo',
            data: data[1]
          },
        ];

        this.chart.data.datasets = [{
          data: data,
          backgroundColor: [
            this.chartColors.yellow,
            this.chartColors.red,
            this.chartColors.green,
            this.chartColors.blue,
          ],
        }]
      }
      this.chart.update();
    });
  }

}
