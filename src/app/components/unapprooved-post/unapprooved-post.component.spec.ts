import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapproovedPostComponent } from './unapprooved-post.component';

describe('UnapproovedPostComponent', () => {
  let component: UnapproovedPostComponent;
  let fixture: ComponentFixture<UnapproovedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnapproovedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnapproovedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
