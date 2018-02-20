import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotteryDetailsComponent } from './lottery-details.component';

describe('LotteryDetailsComponent', () => {
  let component: LotteryDetailsComponent;
  let fixture: ComponentFixture<LotteryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotteryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotteryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
