import { Directive, ElementRef, HostListener, Input, NgModule } from '@angular/core';

@Directive({
  selector: 'input[numbersOnly]'
})
export class NumberDirective {

  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initalValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initalValue.replace(/[^0-9]*/g, '');
    if (initalValue !== this._el.nativeElement.value) {
      event.stopPropagation();
    }
  }
}

////Below code is used for import multiple modules.
@NgModule({
  declarations: [NumberDirective],
  exports: [NumberDirective]
})

export class NumberDirectiveModule { }
