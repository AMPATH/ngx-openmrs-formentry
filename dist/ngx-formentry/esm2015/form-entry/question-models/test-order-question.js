/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1vcmRlci1xdWVzdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImZvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL3Rlc3Qtb3JkZXItcXVlc3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sb0RBQW9ELENBQUM7QUFFcEYsTUFBTSx3QkFBeUIsU0FBUSxZQUFZOzs7O0lBTS9DLFlBQVksT0FBaUM7UUFDekMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO1FBQ25DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDMUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxjQUFjLENBQUMsY0FBYyxDQUFDO0lBQ3JELENBQUM7Q0FDSjs7O0lBZkcsc0NBQWtCOztJQUNsQiw2Q0FBdUQ7O0lBQ3ZELDZDQUF5Qjs7SUFDekIsc0NBQWtCOztJQUNsQixvQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4vcXVlc3Rpb24tYmFzZSc7XHJcbmltcG9ydCB7IFRlc3RPcmRlclF1ZXN0aW9uT3B0aW9ucyB9IGZyb20gJy4vaW50ZXJmYWNlcy90ZXN0LW9yZGVyLXF1ZXN0aW9uLW9wdGlvbnMnO1xyXG5pbXBvcnQgeyBBZmVDb250cm9sVHlwZSB9IGZyb20gJy4uLy4uL2Fic3RyYWN0LWNvbnRyb2xzLWV4dGVuc2lvbi9hZmUtY29udHJvbC10eXBlJztcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXN0T3JkZXJRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XHJcbiAgICBvcmRlclR5cGU6IHN0cmluZztcclxuICAgIHNlbGVjdGFibGVPcmRlcnM6IHsgY29uY2VwdDogc3RyaW5nLCBsYWJlbDogc3RyaW5nIH1bXTtcclxuICAgIG9yZGVyU2V0dGluZ1V1aWQ6IHN0cmluZztcclxuICAgIHJlbmRlcmluZzogc3RyaW5nO1xyXG4gICAgb3B0aW9uczogYW55W107XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zOiBUZXN0T3JkZXJRdWVzdGlvbk9wdGlvbnMpIHtcclxuICAgICAgICBzdXBlcihvcHRpb25zKTtcclxuICAgICAgICB0aGlzLnJlbmRlcmluZ1R5cGUgPSAnc2VsZWN0JztcclxuICAgICAgICB0aGlzLm9yZGVyVHlwZSA9IG9wdGlvbnMub3JkZXJUeXBlO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0YWJsZU9yZGVycyA9IG9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycztcclxuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zLm9wdGlvbnM7XHJcbiAgICAgICAgdGhpcy5vcmRlclNldHRpbmdVdWlkID0gb3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xyXG4gICAgICAgIHRoaXMucmVuZGVyaW5nID0gb3B0aW9ucy5vcmRlclNldHRpbmdVdWlkO1xyXG4gICAgICAgIHRoaXMuY29udHJvbFR5cGUgPSBBZmVDb250cm9sVHlwZS5BZmVGb3JtQ29udHJvbDtcclxuICAgIH1cclxufVxyXG4iXX0=