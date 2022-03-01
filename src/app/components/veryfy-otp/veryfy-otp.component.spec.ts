import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeryfyOtpComponent } from './veryfy-otp.component';

describe('VeryfyOtpComponent', () => {
  let component: VeryfyOtpComponent;
  let fixture: ComponentFixture<VeryfyOtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeryfyOtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeryfyOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
