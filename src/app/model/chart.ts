export interface Chart {
  quote: Quote;
  timestamp:  number[];
}

export interface Quote {
  volume: number[];
  close:  number[];
  high:   number[];
  low:    number[];
  open:   number[];
}

