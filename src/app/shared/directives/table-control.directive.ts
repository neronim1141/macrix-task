import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';

export class TableControlContext {
  constructor(private control: FormControl) {}
}

@Directive({
  standalone: true,
  selector: '[mcxTableControl]',
})
export class TableControlDirective {
  constructor(
    private templateRef: TemplateRef<TableControlContext>,
    private viewContainerRef: ViewContainerRef
  ) {}

  @Input()
  set mcxTableControl(control: FormControl) {
    this.viewContainerRef.createEmbeddedView(
      this.templateRef,
      new TableControlContext(control)
    );
  }
}
