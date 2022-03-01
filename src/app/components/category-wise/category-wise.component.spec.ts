import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryWiseComponent } from './category-wise.component';

describe('CategoryWiseComponent', () => {
  let component: CategoryWiseComponent;
  let fixture: ComponentFixture<CategoryWiseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryWiseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
