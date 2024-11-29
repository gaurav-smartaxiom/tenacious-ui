import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportShipmentComponent } from './report-shipment.component';

describe('ReportShipmentComponent', () => {
  let component: ReportShipmentComponent;
  let fixture: ComponentFixture<ReportShipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportShipmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
