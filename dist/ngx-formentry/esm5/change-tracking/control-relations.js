/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            for (var i = 0; i < relatedTo.length; i++) {
                this.relations.push(new ControlRelation(this._relationFor, relatedTo[i]));
            }
        }
    };
    return ControlRelations;
}());
export { ControlRelations };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7SUFNSSwwQkFBWSxXQUE0QixFQUFFLFNBQStDO1FBRmpGLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQkFBSSwwQ0FBWTs7OztRQUFoQjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVM7Ozs7UUFBYjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQzNCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksNENBQWM7Ozs7UUFBbEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUM5QixDQUFDOzs7T0FBQTs7Ozs7SUFFRCw2Q0FBa0I7Ozs7SUFBbEIsVUFBbUIsU0FBOEM7UUFDN0QsRUFBRSxDQUFDLENBQUMsU0FBUyxZQUFZLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzNFLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxTQUFTLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUM3QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNMLHVCQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQzs7Ozs7OztJQXBDRyx3Q0FBc0M7Ozs7O0lBQ3RDLHNDQUFzQzs7Ozs7SUFDdEMsMkNBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWJzdHJhY3RDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAnLi9jb250cm9sLXJlbGF0aW9uJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDb250cm9sUmVsYXRpb25zIHtcclxuXHJcbiAgICBwcml2YXRlIF9yZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sO1xyXG4gICAgcHJpdmF0ZSBfcmVsYXRpb25zOiBDb250cm9sUmVsYXRpb25bXTtcclxuICAgIHByaXZhdGUgX290aGVyUmVsYXRpb25zOiBhbnkgPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihyZWxhdGlvbkZvcjogQWJzdHJhY3RDb250cm9sLCByZWxhdGVkVG8/OiBBYnN0cmFjdENvbnRyb2wgfCBBYnN0cmFjdENvbnRyb2xbXSkge1xyXG4gICAgICAgIHRoaXMuX3JlbGF0aW9uRm9yID0gcmVsYXRpb25Gb3I7XHJcbiAgICAgICAgdGhpcy5fcmVsYXRpb25zID0gW107XHJcblxyXG4gICAgICAgIGlmIChyZWxhdGVkVG8pIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRSZWxhdGVkQ29udHJvbHMocmVsYXRlZFRvKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHJlbGF0aW9uc0ZvcigpOiBBYnN0cmFjdENvbnRyb2wge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGlvbkZvcjtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVsYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBvdGhlclJlbGF0aW9ucygpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuX290aGVyUmVsYXRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGFkZFJlbGF0ZWRDb250cm9scyhyZWxhdGVkVG86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XHJcbiAgICAgICAgaWYgKHJlbGF0ZWRUbyBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbGF0aW9ucy5wdXNoKG5ldyBDb250cm9sUmVsYXRpb24odGhpcy5fcmVsYXRpb25Gb3IsIHJlbGF0ZWRUbykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlbGF0ZWRUbyBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsYXRlZFRvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGF0aW9ucy5wdXNoKG5ldyBDb250cm9sUmVsYXRpb24odGhpcy5fcmVsYXRpb25Gb3IsIHJlbGF0ZWRUb1tpXSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==