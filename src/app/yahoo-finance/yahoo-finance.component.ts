import { Component, OnInit, ViewChild } from '@angular/core';
import { YahooFinanceService } from '../services/yahoo-finance.service';
import * as moment from 'moment';
import { Finance } from '../model/finance';
import { FinanceAdapter } from '../model/finance-adapter';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-yahoo-finance',
  templateUrl: './yahoo-finance.component.html',
  styleUrls: ['./yahoo-finance.component.css']
})
export class YahooFinanceComponent implements OnInit {
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };
  canvas: any;
  ctx: any;
  pieChart: any;
  cotacoes: Finance[] = [];
  dadosGrafico: any[] = [];

  constructor(private service: YahooFinanceService) { }

  ngOnInit(): void {
    this.getStockData();
  }

  pieChartBrowser(): void {
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');
    console.log(this.cotacoes);

    this.pieChart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.cotacoes.map(row => row.dia),
        datasets: [
          {
            label: 'Cotações dos últimos 30 dias',
            data: this.cotacoes.map(row => row.valor),
          },
        ],
      },
    });
  }

  getStockData() {
    const start = moment(new Date()).subtract(30, 'days').startOf('day');
    const end = moment(new Date()).endOf('day');

    this.service.getStockData(start, end).subscribe(data => {
      let financeAdapter = new FinanceAdapter();
      financeAdapter.chart = data;
      financeAdapter.convert();

      this.cotacoes = financeAdapter.valores;
      setInterval(() => {
        this.cotacoes.forEach(c => {
          const dados  = {
            valor: this.dadosGrafico.push(c.valor)
          }
          this.dadosGrafico.push(dados);
          this.pieChartBrowser();
        })
      }, 2000);

    });
  }
}
