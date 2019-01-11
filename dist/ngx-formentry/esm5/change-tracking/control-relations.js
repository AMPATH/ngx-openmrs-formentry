/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1yZWxhdGlvbnMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJjaGFuZ2UtdHJhY2tpbmcvY29udHJvbC1yZWxhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVqRCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFckQ7SUFNSSwwQkFBWSxXQUE0QixFQUFFLFNBQStDO1FBRmpGLG9CQUFlLEdBQVEsRUFBRSxDQUFDO1FBRzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDO1FBRXJCLElBQUksU0FBUyxFQUFFO1lBQ1gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3RDO0lBQ0wsQ0FBQztJQUVELHNCQUFJLDBDQUFZOzs7O1FBQWhCO1lBQ0ksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdCLENBQUM7OztPQUFBO0lBRUQsc0JBQUksdUNBQVM7Ozs7UUFBYjtZQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDRDQUFjOzs7O1FBQWxCO1lBQ0UsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLENBQUM7OztPQUFBOzs7OztJQUVELDZDQUFrQjs7OztJQUFsQixVQUFtQixTQUE4QztRQUM3RCxJQUFJLFNBQVMsWUFBWSxlQUFlLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO1NBQzFFO1FBRUQsSUFBSSxTQUFTLFlBQVksS0FBSyxFQUFFO1lBQzVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0U7U0FDSjtJQUNMLENBQUM7SUFDTCx1QkFBQztBQUFELENBQUMsQUF0Q0QsSUFzQ0M7Ozs7Ozs7SUFwQ0csd0NBQXNDOzs7OztJQUN0QyxzQ0FBc0M7Ozs7O0lBQ3RDLDJDQUFrQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ29udHJvbFJlbGF0aW9uIH0gZnJvbSAnLi9jb250cm9sLXJlbGF0aW9uJztcblxuZXhwb3J0IGNsYXNzIENvbnRyb2xSZWxhdGlvbnMge1xuXG4gICAgcHJpdmF0ZSBfcmVsYXRpb25Gb3I6IEFic3RyYWN0Q29udHJvbDtcbiAgICBwcml2YXRlIF9yZWxhdGlvbnM6IENvbnRyb2xSZWxhdGlvbltdO1xuICAgIHByaXZhdGUgX290aGVyUmVsYXRpb25zOiBhbnkgPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHJlbGF0aW9uRm9yOiBBYnN0cmFjdENvbnRyb2wsIHJlbGF0ZWRUbz86IEFic3RyYWN0Q29udHJvbCB8IEFic3RyYWN0Q29udHJvbFtdKSB7XG4gICAgICAgIHRoaXMuX3JlbGF0aW9uRm9yID0gcmVsYXRpb25Gb3I7XG4gICAgICAgIHRoaXMuX3JlbGF0aW9ucyA9IFtdO1xuXG4gICAgICAgIGlmIChyZWxhdGVkVG8pIHtcbiAgICAgICAgICAgIHRoaXMuYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWRUbyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcmVsYXRpb25zRm9yKCk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWxhdGlvbkZvcjtcbiAgICB9XG5cbiAgICBnZXQgcmVsYXRpb25zKCk6IENvbnRyb2xSZWxhdGlvbltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlbGF0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgb3RoZXJSZWxhdGlvbnMoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fb3RoZXJSZWxhdGlvbnM7XG4gICAgfVxuXG4gICAgYWRkUmVsYXRlZENvbnRyb2xzKHJlbGF0ZWRUbzogQWJzdHJhY3RDb250cm9sIHwgQWJzdHJhY3RDb250cm9sW10pIHtcbiAgICAgICAgaWYgKHJlbGF0ZWRUbyBpbnN0YW5jZW9mIEFic3RyYWN0Q29udHJvbCkge1xuICAgICAgICAgICAgdGhpcy5yZWxhdGlvbnMucHVzaChuZXcgQ29udHJvbFJlbGF0aW9uKHRoaXMuX3JlbGF0aW9uRm9yLCByZWxhdGVkVG8pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZWxhdGVkVG8gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZWxhdGVkVG8ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbGF0aW9ucy5wdXNoKG5ldyBDb250cm9sUmVsYXRpb24odGhpcy5fcmVsYXRpb25Gb3IsIHJlbGF0ZWRUb1tpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19