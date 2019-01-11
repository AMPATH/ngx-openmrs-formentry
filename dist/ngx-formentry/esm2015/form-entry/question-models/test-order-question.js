/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { QuestionBase } from './question-base';
import { AfeControlType } from '../../abstract-controls-extension/afe-control-type';
export class TestOrderQuestion extends QuestionBase {
    /**
     * @param {?} options
     */
    constructor(options) {
        super(options);
        this.renderingType = 'select';
        this.orderType = options.orderType;
        this.selectableOrders = options.selectableOrders;
        this.options = options.options;
        this.orderSettingUuid = options.orderSettingUuid;
        this.rendering = options.orderSettingUuid;
        this.controlType = AfeControlType.AfeFormControl;
    }
}
if (false) {
    /** @type {?} */
    TestOrderQuestion.prototype.orderType;
    /** @type {?} */
    TestOrderQuestion.prototype.selectableOrders;
    /** @type {?} */
    TestOrderQuestion.prototype.orderSettingUuid;
    /** @type {?} */
    TestOrderQuestion.prototype.rendering;
    /** @type {?} */
    TestOrderQuestion.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSxPQUFPLGlCQUFrQixTQUFRLFlBQVk7Ozs7SUFNL0MsWUFBWSxPQUFpQztRQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQyxJQUFJLENBQUMsV0FBVyxHQUFHLGNBQWMsQ0FBQyxjQUFjLENBQUM7SUFDckQsQ0FBQztDQUNKOzs7SUFmRyxzQ0FBa0I7O0lBQ2xCLDZDQUF1RDs7SUFDdkQsNkNBQXlCOztJQUN6QixzQ0FBa0I7O0lBQ2xCLG9DQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IFRlc3RPcmRlclF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90ZXN0LW9yZGVyLXF1ZXN0aW9uLW9wdGlvbnMnO1xuaW1wb3J0IHsgQWZlQ29udHJvbFR5cGUgfSBmcm9tICcuLi8uLi9hYnN0cmFjdC1jb250cm9scy1leHRlbnNpb24vYWZlLWNvbnRyb2wtdHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBUZXN0T3JkZXJRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XG4gICAgb3JkZXJUeXBlOiBzdHJpbmc7XG4gICAgc2VsZWN0YWJsZU9yZGVyczogeyBjb25jZXB0OiBzdHJpbmcsIGxhYmVsOiBzdHJpbmcgfVtdO1xuICAgIG9yZGVyU2V0dGluZ1V1aWQ6IHN0cmluZztcbiAgICByZW5kZXJpbmc6IHN0cmluZztcbiAgICBvcHRpb25zOiBhbnlbXTtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXN0T3JkZXJRdWVzdGlvbk9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMucmVuZGVyaW5nVHlwZSA9ICdzZWxlY3QnO1xuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IG9wdGlvbnMub3JkZXJUeXBlO1xuICAgICAgICB0aGlzLnNlbGVjdGFibGVPcmRlcnMgPSBvcHRpb25zLnNlbGVjdGFibGVPcmRlcnM7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnMub3B0aW9ucztcbiAgICAgICAgdGhpcy5vcmRlclNldHRpbmdVdWlkID0gb3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xuICAgICAgICB0aGlzLnJlbmRlcmluZyA9IG9wdGlvbnMub3JkZXJTZXR0aW5nVXVpZDtcbiAgICAgICAgdGhpcy5jb250cm9sVHlwZSA9IEFmZUNvbnRyb2xUeXBlLkFmZUZvcm1Db250cm9sO1xuICAgIH1cbn1cbiJdfQ==