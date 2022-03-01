import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PgaeNotFoundComponent } from './pgae-not-found.component';

describe('PgaeNotFoundComponent', () => {
  let component: PgaeNotFoundComponent;
  let fixture: ComponentFixture<PgaeNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PgaeNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PgaeNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
