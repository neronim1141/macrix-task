import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableInputComponent } from './table-input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableInputComponent', () => {
  let component: TableInputComponent;
  let fixture: ComponentFixture<TableInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInputComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
