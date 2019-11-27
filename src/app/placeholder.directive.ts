import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    // public - to be accessible from outside
    constructor(public viewContainerRef: ViewContainerRef) { }
}
