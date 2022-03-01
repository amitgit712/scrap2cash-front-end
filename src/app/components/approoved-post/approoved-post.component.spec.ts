import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproovedPostComponent } from './approoved-post.component';

describe('ApproovedPostComponent', () => {
  let component: ApproovedPostComponent;
  let fixture: ComponentFixture<ApproovedPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproovedPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproovedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
