import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YahooFinanceComponent } from './yahoo-finance.component';

describe('YahooFinanceComponent', () => {
  let component: YahooFinanceComponent;
  let fixture: ComponentFixture<YahooFinanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YahooFinanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YahooFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
