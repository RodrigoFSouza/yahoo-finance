import { Chart } from './chart';
import { Finance } from './finance';


export class FinanceAdapter {
  chart!: Chart;
  valores: Finance[] = [];

  public convert(): void {
    let count = 0;

    this.chart?.timestamp.forEach(data => {
      let finance = {} as Finance;
      let valor = this.chart?.quote.open[count];
      let valorPrimeiraData = this.chart?.quote.open[0];

      finance.valor = valor;
      finance.data = this.formatTimestamp(data);
      finance.variacaoD1 = count === 0 ? '0.00' : this.calcularDiferencaPercentual(this.chart?.quote.open[count - 1], valor,);
      finance.variacaoPrimeiraData = count === 0 ? '0.00' : this.calcularDiferencaPercentual(valorPrimeiraData, valor);
      finance.dia = count++;
      this.valores.push(finance);
    });
  }

  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp * 1000);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  calcularDiferencaPercentual(valorAntigo: number, valorNovo: number): string {
    const diferenca = valorNovo - valorAntigo;
    const diferencaPercentual = (diferenca / valorAntigo);

    let valor = diferencaPercentual.toLocaleString('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return valor;
  }
}
