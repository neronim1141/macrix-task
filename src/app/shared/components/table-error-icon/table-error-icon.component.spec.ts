import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableErrorIconComponent } from './table-error-icon.component';

describe('TableErrorIconComponent', () => {
  let component: TableErrorIconComponent;
  let fixture: ComponentFixture<TableErrorIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableErrorIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableErrorIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
