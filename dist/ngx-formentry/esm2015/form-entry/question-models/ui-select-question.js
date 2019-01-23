/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class UiSelectQuestion extends QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'ui-select';
        this.options = options.options || [];
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    UiSelectQuestion.prototype.options;
    /** @type {?} */
    UiSelectQuestion.prototype.searchFunction;
    /** @type {?} */
    UiSelectQuestion.prototype.resolveFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdWktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0sdUJBQXdCLFNBQVEsWUFBWTs7OztJQUs5QyxZQUFZLE9BQWdDO1FBQ3hDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsV0FBVyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ3JELENBQUM7Q0FFSjs7O0lBVkcsbUNBQTBDOztJQUMxQywwQ0FBeUI7O0lBQ3pCLDJDQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBVaVNlbGVjdFF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy91aS1zZWxlY3QtcXVlc3Rpb24tb3B0aW9ucyc7XG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcblxuZXhwb3J0IGNsYXNzIFVpU2VsZWN0UXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2Uge1xuXG4gICAgb3B0aW9uczogeyBrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W107XG4gICAgc2VhcmNoRnVuY3Rpb246IEZ1bmN0aW9uO1xuICAgIHJlc29sdmVGdW5jdGlvbjogRnVuY3Rpb247XG4gICAgY29uc3RydWN0b3Iob3B0aW9uczogVWlTZWxlY3RRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICd1aS1zZWxlY3QnO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnMgfHwgW107XG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcbiAgICB9XG5cbn1cbiJdfQ==