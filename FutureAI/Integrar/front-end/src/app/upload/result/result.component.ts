import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';  // Isso deve ser suficiente, o 'auto' é desnecessário

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    const data = JSON.parse(localStorage.getItem('graficoData') || '{}');

    if (data && data.labels && data.values) {
      this.createChart(data);
    } else {
      console.warn('Nenhum dado de gráfico encontrado no localStorage.');
    }
  }

  createChart(data: any): void {
    const ctx = document.getElementById('grafico') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line', // Tipo de gráfico
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Inadimplência',
          data: data.values,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true,
            title: { display: true, text: 'Categorias' }
          },
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Valores' }
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        }
      }
    });
  }
}
