import { Observable, Subject } from 'rxjs';

import { EvaluateExpressionFn } from './can-disable';

export interface CanHide {
    hiders: Hider[];
    hidden: boolean;
    disabled?: boolean;
    valueChanges?: Observable<any>;
    hiddenStatusChanges: Subject<boolean>;
    disable?();
    hide();
    show();
    setHidingFn(newHider: Hider);
    clearHidingFns();
    updateHiddenState();
    setValue?(value: any);
}

export interface Hider {
    toHide: boolean;
    hideWhenExpression: string;
    reEvaluateHidingExpression: EvaluateExpressionFn;
}
