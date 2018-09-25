/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { AbstractControl } from '@angular/forms';
import { ControlRelation } from './control-relation';
var ControlRelations = /** @class */ (function () {
    function ControlRelations(relationFor, relatedTo) {
        this._otherRelations = [];
        this._relationFor = relationFor;
        this._relations = [];
        if (relatedTo) {
            this.addRelatedControls(relatedTo);
        }
    }
    Object.defineProperty(ControlRelations.prototype, "relationsFor", {
        get: /**
         * @return {?}
         */
        function () {
            return this._relationFor;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelations.prototype, "relations", {
        get: /**
         * @return {?}
         */
        function () {
            return this._relations;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlRelations.prototype, "otherRelations", {
        get: /**
         * @return {?}
         */
        function () {
            return this._otherRelations;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} relatedTo
     * @return {?}
     */
    ControlRelations.prototype.addRelatedControls = /**
     * @param {?} relatedTo
     * @return {?}
     */
    function (relatedTo) {
        if (relatedTo instanceof AbstractControl) {
            this.relations.push(new ControlRelation(this._relationFor, relatedTo));
        }
        if (relatedTo instanceof Array) {
            for (var /** @type {?} */ i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    };
    return ControlRelations;
}());
export { ControlRelations };
function ControlRelations_tsickle_Closure_declarations() {
    /** @type {?} */
    ControlRelations.prototype._relationFor;
    /** @type {?} */
    ControlRelations.prototype._relations;
    /** @type {?} */
    ControlRelations.prototype._otherRelations;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQsSUFBQTtJQU1JLDBCQUFZLFdBQTRCLEVBQUUsU0FBK0M7K0JBRjFELEVBQUU7UUFHN0IsSUFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7UUFFckIsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUN0QztLQUNKO0lBRUQsc0JBQUksMENBQVk7Ozs7UUFBaEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztTQUM1Qjs7O09BQUE7SUFFRCxzQkFBSSx1Q0FBUzs7OztRQUFiO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7OztPQUFBO0lBRUQsc0JBQUksNENBQWM7Ozs7UUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUM3Qjs7O09BQUE7Ozs7O0lBRUQsNkNBQWtCOzs7O0lBQWxCLFVBQW1CLFNBQThDO1FBQzdELEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUVELEVBQUUsQ0FBQyxDQUFDLFNBQVMsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdFO1NBQ0o7S0FDSjsyQkF6Q0w7SUEwQ0MsQ0FBQTtBQXRDRCw0QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBYnN0cmFjdENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcblxyXG5pbXBvcnQgeyBDb250cm9sUmVsYXRpb24gfSBmcm9tICcuL2NvbnRyb2wtcmVsYXRpb24nO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnMge1xyXG5cclxuICAgIHByaXZhdGUgX3JlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2w7XHJcbiAgICBwcml2YXRlIF9yZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbltdO1xyXG4gICAgcHJpdmF0ZSBfb3RoZXJSZWxhdGlvbnM6IGFueSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHJlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2wsIHJlbGF0ZWRUbz86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpb25Gb3IgPSByZWxhdGlvbkZvcjtcclxuICAgICAgICB0aGlzLl9yZWxhdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgaWYgKHJlbGF0ZWRUbykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG8pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVsYXRpb25zRm9yKCk6IEFic3RyYWN0Q29udHJvbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9uRm9yO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCByZWxhdGlvbnMoKTogQ29udHJvbFJlbGF0aW9uW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IG90aGVyUmVsYXRpb25zKCkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fb3RoZXJSZWxhdGlvbnM7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sIHwgQWJzdHJhY3RDb250cm9sW10pIHtcclxuICAgICAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQWJzdHJhY3RDb250cm9sKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVsYXRlZFRvIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxhdGVkVG8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVsYXRpb25zLnB1c2gobmV3IENvbnRyb2xSZWxhdGlvbih0aGlzLl9yZWxhdGlvbkZvciwgcmVsYXRlZFRvW2ldKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19