/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { AbstractControl } from '@angular/forms';
import { ControlRelation } from './control-relation';
export class ControlRelations {
    /**
     * @param {?} relationFor
     * @param {?=} relatedTo
     */
    constructor(relationFor, relatedTo) {
        this._otherRelations = [];
        this._relationFor = relationFor;
        this._relations = [];
        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }
    /**
     * @return {?}
     */
    get relationsFor() {
        return this._relationFor;
    }
    /**
     * @return {?}
     */
    get relations() {
        return this._relations;
    }
    /**
     * @return {?}
     */
    get otherRelations() {
        return this._otherRelations;
    }
    /**
     * @param {?} relatedTo
     * @return {?}
     */
    addRelatedControls(relatedTo) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }
        if (relatedTo instanceof Array) {
            for (let i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    ControlRelations.prototype._relationFor;
    /**
     * @type {?}
     * @private
     */
    ControlRelations.prototype._relations;
    /**
     * @type {?}
     * @private
     */
    ControlRelations.prototype._otherRelations;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsTUFBTTs7Ozs7SUFNRixZQUFZLFdBQTRCLEVBQUUsU0FBK0M7UUFGakYsb0JBQWUsR0FBUSxFQUFFLENBQUM7UUFHOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN2QyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUVELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFRCxJQUFJLFNBQVM7UUFDVCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRUQsSUFBSSxjQUFjO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsU0FBOEM7UUFDN0QsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztDQUNKOzs7Ozs7SUFwQ0csd0NBQXNDOzs7OztJQUN0QyxzQ0FBc0M7Ozs7O0lBQ3RDLDJDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xSZWxhdGlvbiB9IGZyb20gJy4vY29udHJvbC1yZWxhdGlvbic7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29udHJvbFJlbGF0aW9ucyB7XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVsYXRpb25Gb3I6IEFic3RyYWN0Q29udHJvbDtcclxuICAgIHByaXZhdGUgX3JlbGF0aW9uczogQ29udHJvbFJlbGF0aW9uW107XHJcbiAgICBwcml2YXRlIF9vdGhlclJlbGF0aW9uczogYW55ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocmVsYXRpb25Gb3I6IEFic3RyYWN0Q29udHJvbCwgcmVsYXRlZFRvPzogQWJzdHJhY3RDb250cm9sIHwgQWJzdHJhY3RDb250cm9sW10pIHtcclxuICAgICAgICB0aGlzLl9yZWxhdGlvbkZvciA9IHJlbGF0aW9uRm9yO1xyXG4gICAgICAgIHRoaXMuX3JlbGF0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAocmVsYXRlZFRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWRUbyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWxhdGlvbnNGb3IoKTogQWJzdHJhY3RDb250cm9sIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25Gb3I7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlbGF0aW9ucygpOiBDb250cm9sUmVsYXRpb25bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgb3RoZXJSZWxhdGlvbnMoKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9vdGhlclJlbGF0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBhZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZFRvOiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xyXG4gICAgICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBYnN0cmFjdENvbnRyb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG8pKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlbGF0ZWRUby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG9baV0pKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXX0=