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
  
  
  constructor(private dominancia: DominanciaService) { }
  
  atras(){
    this.dominancia.navegateTest();
  }
  
  ngOnInit(): void {
    Chart.defaults.polarArea.animation.animateScale = false;
    let chartColors = {
      red: 'rgb(235, 47, 6)',
      yellow: 'rgb(251, 197, 49)',
      green: 'rgb(76, 209, 55)',
      blue: 'rgb(0, 168, 255)',
    };

    this.chart = new Chart('dominancia', {
      type: 'polarArea',
      options: {

      },
      data: {
        datasets: [{
          data: [100, 100, 100, 100],
          backgroundColor: [
            chartColors.yellow,
            chartColors.red,
            chartColors.green,
            chartColors.blue,
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
      if (data.length > 0){
        console.log(data);
        this.chart.data.datasets = [{
          data: data,
          backgroundColor: [
            chartColors.yellow,
            chartColors.red,
            chartColors.green,
            chartColors.blue,
          ],
        }]
      }
      this.chart.update();
    });
  }

}
