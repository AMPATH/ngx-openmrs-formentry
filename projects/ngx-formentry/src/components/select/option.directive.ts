/* tslint:disable:component-class-suffix directive-class-suffix*/
import { Directive, HostBinding } from "@angular/core";

@Directive({
    // tslint:disable-next-line
    selector: "option"
})
export class Option {
    @HostBinding("class") inputClass = "cds--select-option";
}
