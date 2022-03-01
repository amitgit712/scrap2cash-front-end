import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessImageComponent } from './bussiness-image.component';

describe('BussinessImageComponent', () => {
  let component: BussinessImageComponent;
  let fixture: ComponentFixture<BussinessImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
