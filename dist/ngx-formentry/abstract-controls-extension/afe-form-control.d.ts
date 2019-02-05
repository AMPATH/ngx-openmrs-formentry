import { FormControl, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from '@angular/forms';
import { ControlRelations } from '../change-tracking/control-relations';
import { ValueChangeListener } from './value-change.listener';
import { CanHide, Hider } from '../form-entry/control-hiders-disablers/can-hide';
import { CanDisable, Disabler } from '../form-entry/control-hiders-disablers/can-disable';
import { CanGenerateAlert, Alert } from '../form-entry/control-alerts/can-generate-alert';
import { CanCalculate } from '../form-entry/control-calculators/can-calculate';
import { Subject } from 'rxjs';
import { Touchable } from './touchable';
declare class AfeFormControl extends FormControl implements CanHide, CanDisable, Touchable, CanCalculate, CanGenerateAlert, ValueChangeListener {
    private _controlRelations;
    private _valueChangeListener;
    private _previousValue;
    uuid: string;
    pathFromRoot: string;
    hiddenStatusChanges: Subject<boolean>;
    disabledStatusChanges: Subject<boolean>;
    touchedStatusChanges: Subject<boolean>;
    hidden: boolean;
    hiders: Hider[];
    alert: string;
    alerts: Alert[];
    calculator: Function;
    disablers: Disabler[];
    private hiderHelper;
    private disablerHelper;
    private AlertHelper;
    constructor(formState?: any, validator?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null);
    readonly controlRelations: ControlRelations;
    disable(param?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    enable(param?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void;
    hide(): void;
    show(): void;
    markAsTouched(opts?: {
        onlySelf?: boolean;
    }): void;
    markAsUntouched(opts?: {
        onlySelf?: boolean;
    }): void;
    setHidingFn(newHider: Hider): void;
    setCalculatorFn(newCalculator: Function): void;
    updateCalculatedValue(): void;
    clearHidingFns(): void;
    updateHiddenState(): void;
    setDisablingFn(newDisabler: Disabler): void;
    clearDisablingFns(): void;
    updateDisabledState(): void;
    setAlertFn(newHider: Alert): void;
    clearMessageFns(): void;
    updateAlert(): void;
    addValueChangeListener(func: any): void;
    fireValueChangeListener(value: any): void;
    setValue(value: any): void;
}
export { AfeFormControl };
