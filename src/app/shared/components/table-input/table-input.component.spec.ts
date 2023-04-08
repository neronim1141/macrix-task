import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TableInputComponent } from './table-input.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInput } from '@angular/material/input';

@Component({
  selector: `mcx-host-component`,
  template: `<mcx-table-input
    [control]="control"
    [type]="type"></mcx-table-input>`,
})
class TestHostComponent {
  control = new FormControl();
}

describe('TableInputComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableInputComponent, NoopAnimationsModule],
      declarations: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should provide input value for table-input', () => {
    component.control = new FormControl('testValue');
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input').value).toEqual(
      'testValue'
    );
  });
  it('should show error state if control is invalid', () => {
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('input.ng-invalid')
    ).toBeDefined();
  });

  it('should show error state if control is invalid', () => {
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
    fixture.nativeElement
      .querySelector('input')
      .dispatchEvent(new Event('blur'));

    fixture.detectChanges();

    expect(fixture.debugElement.query(By.directive(MatTooltip))).toBeDefined();
  });

  it('should show error messages if control is invalid', () => {
    component.control = new FormControl('', Validators.required);
    fixture.detectChanges();
    fixture.debugElement
      .query(By.directive(MatInput))
      .nativeElement.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    const tooltip = fixture.debugElement.query(By.directive(MatTooltip));
    expect(tooltip).toBeDefined();
    tooltip.nativeElement.dispatchEvent(new Event('hover'));
    fixture.detectChanges();
    const tooltipMessages = tooltip.attributes['ng-reflect-message'];
    expect(tooltipMessages).toEqual('This field is required');
  });
});
