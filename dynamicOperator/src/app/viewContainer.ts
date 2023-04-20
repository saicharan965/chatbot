import { Directive, ViewContainerRef } from "@angular/core";


@Directive ({
    selector: '[appViewContainer]'
})
export class viewContainerRefDirective {
    constructor(public _viewCOntainerRef: ViewContainerRef){}
}