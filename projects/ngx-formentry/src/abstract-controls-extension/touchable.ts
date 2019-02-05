import { Subject } from 'rxjs';

export interface Touchable {
    touchedStatusChanges: Subject<boolean>;
    markAsTouched(opts: { onlySelf?: boolean; }): void;
    markAsUntouched(opts: { onlySelf?: boolean; }): void;
}
