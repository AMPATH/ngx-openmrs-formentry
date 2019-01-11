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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWktc2VsZWN0LXF1ZXN0aW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvdWktc2VsZWN0LXF1ZXN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFL0MsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBRXBGLE1BQU0sT0FBTyxnQkFBaUIsU0FBUSxZQUFZOzs7O0lBSzlDLFlBQVksT0FBZ0M7UUFDeEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQztDQUVKOzs7SUFWRyxtQ0FBMEM7O0lBQzFDLDBDQUF5Qjs7SUFDekIsMkNBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IFVpU2VsZWN0UXVlc3Rpb25PcHRpb25zIH0gZnJvbSAnLi9pbnRlcmZhY2VzL3VpLXNlbGVjdC1xdWVzdGlvbi1vcHRpb25zJztcbmltcG9ydCB7IEFmZUNvbnRyb2xUeXBlIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uL2FmZS1jb250cm9sLXR5cGUnO1xuXG5leHBvcnQgY2xhc3MgVWlTZWxlY3RRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XG5cbiAgICBvcHRpb25zOiB7IGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nIH1bXTtcbiAgICBzZWFyY2hGdW5jdGlvbjogRnVuY3Rpb247XG4gICAgcmVzb2x2ZUZ1bmN0aW9uOiBGdW5jdGlvbjtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBVaVNlbGVjdFF1ZXN0aW9uT3B0aW9ucykge1xuICAgICAgICBzdXBlcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5yZW5kZXJpbmdUeXBlID0gJ3VpLXNlbGVjdCc7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucyB8fCBbXTtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICAgIH1cblxufVxuIl19