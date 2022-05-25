/* tslint:disable:component-class-suffix  */
import {
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    Output,
    HostListener,
    EventEmitter,
    TemplateRef,
    ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

/**
 * `ibm-select` provides a styled `select` component.
 *
 * [See demo](../../?path=/story/select--basic)
 *
 * Example:
 *
 * ```
 * <ibm-select [(ngModel)]="model">
 *     <option value="default" disabled selected hidden>Choose an option</option>
 *     <option value="option1">Option 1</option>
 *    <option value="option2">Option 2</option>
 *     <option value="option3">Option 3</option>
 * </ibm-select>
 *    ```
 *
 * <example-url>../../iframe.html?id=select--basic</example-url>
 */
@Component({
    selector: "ibm-select",
    template: `
        <div class="bx--form-item">
            <ng-template [ngIf]="skeleton">
                <div *ngIf="label" class="bx--label bx--skeleton"></div>
                <div class="bx--select bx--skeleton"></div>
            </ng-template>
            <div
                *ngIf="!skeleton"
                class="bx--select"
                [ngClass]="{
                    'bx--select--inline': display === 'inline',
                    'bx--select--light': theme === 'light',
                    'bx--select--invalid': invalid,
                    'bx--select--warning': warn,
                    'bx--select--disabled': disabled
                }">
                <label *ngIf="label" [for]="id" class="bx--label">
                    <ng-container *ngIf="!isTemplate(label)">{{label}}</ng-container>
                    <ng-template *ngIf="isTemplate(label)" [ngTemplateOutlet]="label"></ng-template>
                </label>
                <div *ngIf="helperText" class="bx--form__helper-text">
                    <ng-container *ngIf="!isTemplate(helperText)">{{helperText}}</ng-container>
                    <ng-template *ngIf="isTemplate(helperText)" [ngTemplateOutlet]="helperText"></ng-template>
                </div>
                <div *ngIf="display === 'inline'; else noInline" class="bx--select-input--inline__wrapper">
                    <ng-container *ngTemplateOutlet="noInline"></ng-container>
                </div>
            </div>
        </div>

        <!-- select element: dynamically projected based on 'display' variant -->
        <ng-template #noInline>
            <div class="bx--select-input__wrapper extend" [attr.data-invalid]="(invalid ? true : null)">
                <select
                    #select
                    [attr.id]="id"
                    [attr.aria-label]="ariaLabel"
                    [disabled]="disabled"
                    (change)="onChange($event)"
                    [attr.aria-invalid]="invalid ? 'true' : null"
                    class="bx--select-input"
                    [ngClass]="{
                        'bx--select-input--xl': size === 'xl',
                        'bx--select-input--sm': size === 'sm'
                    }">
                    <ng-content></ng-content>
                </select>
                <svg
                    focusable="false"
                    preserveAspectRatio="xMidYMid meet"
                    style="will-change: transform;"
                    xmlns="http://www.w3.org/2000/svg"
                    class="bx--select__arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    aria-hidden="true">
                    <path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path>
                </svg>
                <svg *ngIf="invalid"focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--text-input__invalid-icon" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8,1C4.2,1,1,4.2,1,8s3.2,7,7,7s7-3.1,7-7S11.9,1,8,1z M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2    c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z"></path><path d="M7.5,4h1v5h-1C7.5,9,7.5,4,7.5,4z M8,12.2c-0.4,0-0.8-0.4-0.8-0.8s0.3-0.8,0.8-0.8    c0.4,0,0.8,0.4,0.8,0.8S8.4,12.2,8,12.2z" data-icon-path="inner-path" opacity="0"></path></svg>
            </div>
            <div *ngIf="invalid && invalidText && !warn" role="alert" class="bx--form-requirement" aria-live="polite">
                <ng-container *ngIf="!isTemplate(invalidText)">{{invalidText}}</ng-container>
                <ng-template *ngIf="isTemplate(invalidText)" [ngTemplateOutlet]="invalidText"></ng-template>
            </div>
            <div *ngIf="!invalid && warn" class="bx--form-requirement">
                <ng-container *ngIf="!isTemplate(warnText)">{{warnText}}</ng-container>
                <ng-template *ngIf="isTemplate(warnText)" [ngTemplateOutlet]="warnText"></ng-template>
            </div>
        </ng-template>
    `,
    styles: [`
        .bx--select--inline .bx--form__helper-text {
            order: 4;
        }

        .bx--select--inline:not(.bx--select--invalid) .bx--form__helper-text {
            margin-top: 0;
        }
        .bx--select-input__wrapper{
            max-width: 18rem;
            width:100%
        }
    `],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: Select,
            multi: true
        }
    ]
})
export class Select implements ControlValueAccessor, AfterViewInit {
    /**
     * Tracks the total number of selects instantiated. Used to generate unique IDs
     */
    static selectCount = 0;

    /**
     * `inline` or `default` select displays
     */
    @Input() display: "inline" | "default" = "default";
    /**
     * Label for the select. Appears above the input.
     */
    @Input() label: string | TemplateRef<any>;
    /**
     * Optional helper text that appears under the label.
     */
    @Input() helperText: string | TemplateRef<any>;
    /**
     * Sets the invalid text.
     */
    @Input() invalidText: string | TemplateRef<any>;
    /**
      * Set to `true` to show a warning (contents set by warningText)
      */
    @Input() warn = false;
    /**
     * Sets the warning text
     */
    @Input() warnText: string | TemplateRef<any>;
    /**
     * Sets the unique ID. Defaults to `select-${total count of selects instantiated}`
     */
    @Input() id = `select-${Select.selectCount++}`;
    /**
     * Number input field render size
     */
    @Input() size: "sm" | "md" | "xl" = "md";
    /**
     * Set to true to disable component.
     */
    @Input() disabled = false;
    /**
     * Set to true for a loading select.
     */
    @Input() skeleton = false;
    /**
     * Set to `true` for an invalid select component.
     */
    @Input() invalid = false;

    /**
     * `light` or `dark` select theme
     */
    @Input() theme: "light" | "dark" = "dark";
    @Input() ariaLabel: string;

    @Output() valueChange = new EventEmitter();

    // @ts-ignore
    @ViewChild("select", { static: false }) select: ElementRef;

    @Input() set value(v) {
        this._value = v;
        if (this.select) {
            this.select.nativeElement.value = this._value;
        }
    }

    get value() {
        return this._value;
    }

    protected _value;

    ngAfterViewInit() {
        if (
            this.value !== undefined &&
            this.value !== null &&
            this.select &&
            this.select.nativeElement.value !== this.value
        ) {
            this.select.nativeElement.value = this.value;
        }
    }

    /**
     * Receives a value from the model.
     */
    writeValue(obj: any) {
        this.value = obj;
    }

    /**
     * Registers a listener that notifies the model when the control updates
     */
    registerOnChange(fn: any) {
        this.onChangeHandler = fn;
    }

    /**
     * Registers a listener that notifies the model when the control is blurred
     */
    registerOnTouched(fn: any) {
        this.onTouchedHandler = fn;
    }

    /**
     * Sets the disabled state through the model
     */
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    /**
     * Handles the change event from the `select`.
     * Sends events to the change handler and emits a `selected` event.
     */
    onChange(event) {
        this.value = event.target.value;
        this.onChangeHandler(event.target.value);
        this.valueChange.emit(event.target.value);
    }

    /**
     * Listens for the host blurring, and notifies the model
     */
    @HostListener("focusout")
    focusOut() {
        this.onTouchedHandler();
    }

    public isTemplate(value) {
        return value instanceof TemplateRef;
    }

    /**
     * placeholder declarations. Replaced by the functions provided to `registerOnChange` and `registerOnTouched`
     */
    protected onChangeHandler = (_: any) => { };
    protected onTouchedHandler = () => { };
}
