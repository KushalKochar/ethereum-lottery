import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyLotteryComponent } from './buy-lottery.component';

describe('BuyLotteryComponent', () => {
  let component: BuyLotteryComponent;
  let fixture: ComponentFixture<BuyLotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyLotteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
