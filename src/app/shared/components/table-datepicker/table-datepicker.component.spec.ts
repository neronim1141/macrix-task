import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatepickerComponent } from './table-datepicker.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableDatepickerComponent', () => {
  let component: TableDatepickerComponent;
  let fixture: ComponentFixture<TableDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatepickerComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
