import { AfeFormControl, AfeFormArray, AfeFormGroup } from '../../abstract-controls-extension/control-extensions';
import { Form } from '../form-factory/form';
export declare class ExpressionRunner {
    getRunnable(expression: string, control: AfeFormArray | AfeFormGroup | AfeFormControl, helper: any, dataDependencies: any, form?: Form): Runnable;
    private getControlRelationValueString;
    private setControlArrayValues;
    private _getFormControlKeys;
    private _getValuesForKey;
    private getHelperMethods;
    private getDataDependencies;
}
export interface Runnable {
    run(): any;
}
