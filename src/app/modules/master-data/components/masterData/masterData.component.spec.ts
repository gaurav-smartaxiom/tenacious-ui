import { ComponentFixture, TestBed } from '@angular/core/testing';

import { masterDataComponent } from './masterData.component';

describe('masterDataComponent', () => {
  let component: masterDataComponent;
  let fixture: ComponentFixture<masterDataComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ masterDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(masterDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
