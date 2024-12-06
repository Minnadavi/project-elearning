import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApphomeComponent } from './apphome.component';

describe('ApphomeComponent', () => {
  let component: ApphomeComponent;
  let fixture: ComponentFixture<ApphomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApphomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
