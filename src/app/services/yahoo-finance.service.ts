import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { Chart } from '../model/chart';

@Injectable({
  providedIn: 'root'
})
export class YahooFinanceService {

  private readonly apiUrl = 'http://localhost:3000/finance';

  constructor(private http: HttpClient) { }

  getStockData(startDate: moment.Moment, endDate: moment.Moment): Observable<any> {
    const start = startDate.unix();
    const end = endDate.unix();
    const params = `?interval=1d&period1=${start}&period2=${end}`;

    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        const data = response.result[0].indicators.quote[0];
        const dates = response.result[0].timestamp;

        return {
          quote: data,
          timestamp: dates
        };
      })
    );
  }
}
