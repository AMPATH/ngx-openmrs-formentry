/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { ExpressionRunner } from '../expression-runner/expression-runner';
import { JsExpressionHelper } from '../helpers/js-expression-helper';
export class AlertsFactory {
    /**
     * @param {?} expressionRunner
     * @param {?} expressionHelper
     */
    constructor(expressionRunner, expressionHelper) {
        this.expressionRunner = expressionRunner;
        this.expressionHelper = expressionHelper;
    }
    /**
     * @param {?} question
     * @param {?} control
     * @param {?=} form
     * @return {?}
     */
    getJsExpressionshowAlert(question, control, form) {
        const /** @type {?} */ runnable = this.expressionRunner.getRunnable(question.alert.alertWhenExpression, control, this.expressionHelper.helperFunctions, {}, form);
        const /** @type {?} */ showAlert = {
            shown: false,
            alertWhenExpression: question.alert.alertWhenExpression,
            alertMessage: question.alert.message,
            reEvaluateAlertExpression: () => {
                const /** @type {?} */ result = runnable.run();
                showAlert.shown = result;
            }
        };
        return showAlert;
    }
}
AlertsFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
AlertsFactory.ctorParameters = () => [
    { type: ExpressionRunner, },
    { type: JsExpressionHelper, },
];
function AlertsFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AlertsFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AlertsFactory.ctorParameters;
    /** @type {?} */
    AlertsFactory.prototype.expressionRunner;
    /** @type {?} */
    AlertsFactory.prototype.expressionHelper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvdy1tZXNzYWdlcy5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3Rvcnkvc2hvdy1tZXNzYWdlcy5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBWSxNQUFNLHdDQUF3QyxDQUFDO0FBR3BGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBSXJFLE1BQU07Ozs7O0lBQ0YsWUFBb0IsZ0JBQWtDLEVBQVUsZ0JBQW9DO1FBQWhGLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQW9CO0tBQ25HOzs7Ozs7O0lBQ0Qsd0JBQXdCLENBQUMsUUFBc0IsRUFBRSxPQUFxRCxFQUNsRyxJQUFXO1FBQ1gsdUJBQU0sUUFBUSxHQUNWLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsRUFBRSxPQUFPLEVBQ3pFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELHVCQUFNLFNBQVMsR0FBVTtZQUNyQixLQUFLLEVBQUUsS0FBSztZQUNaLG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CO1lBQ3ZELFlBQVksRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU87WUFDcEMseUJBQXlCLEVBQUUsR0FBRyxFQUFFO2dCQUM1Qix1QkFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUM5QixTQUFTLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQzthQUM1QjtTQUNKLENBQUM7UUFDRixNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3BCOzs7WUFuQkosVUFBVTs7OztZQU5GLGdCQUFnQjtZQUdoQixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBBbGVydCB9IGZyb20gJy4uL2NvbnRyb2wtYWxlcnRzL2Nhbi1nZW5lcmF0ZS1hbGVydCc7XHJcblxyXG5pbXBvcnQgeyBFeHByZXNzaW9uUnVubmVyLCBSdW5uYWJsZSB9IGZyb20gJy4uL2V4cHJlc3Npb24tcnVubmVyL2V4cHJlc3Npb24tcnVubmVyJztcclxuaW1wb3J0IHsgQWZlRm9ybUNvbnRyb2wsIEFmZUZvcm1BcnJheSwgQWZlRm9ybUdyb3VwIH0gZnJvbSAnLi4vLi4vYWJzdHJhY3QtY29udHJvbHMtZXh0ZW5zaW9uJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25IZWxwZXIgfSBmcm9tICcuLi9oZWxwZXJzL2pzLWV4cHJlc3Npb24taGVscGVyJztcclxuaW1wb3J0IHsgRm9ybX0gZnJvbSAnLi9mb3JtJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEFsZXJ0c0ZhY3Rvcnkge1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBleHByZXNzaW9uUnVubmVyOiBFeHByZXNzaW9uUnVubmVyLCBwcml2YXRlIGV4cHJlc3Npb25IZWxwZXI6IEpzRXhwcmVzc2lvbkhlbHBlcikge1xyXG4gICAgfVxyXG4gICAgZ2V0SnNFeHByZXNzaW9uc2hvd0FsZXJ0KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGNvbnRyb2w6IEFmZUZvcm1Db250cm9sIHwgQWZlRm9ybUFycmF5IHwgQWZlRm9ybUdyb3VwLFxyXG4gICAgICAgIGZvcm0/OiBGb3JtKTogQWxlcnQge1xyXG4gICAgICAgIGNvbnN0IHJ1bm5hYmxlOiBSdW5uYWJsZSA9XHJcbiAgICAgICAgICAgIHRoaXMuZXhwcmVzc2lvblJ1bm5lci5nZXRSdW5uYWJsZShxdWVzdGlvbi5hbGVydC5hbGVydFdoZW5FeHByZXNzaW9uLCBjb250cm9sLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5leHByZXNzaW9uSGVscGVyLmhlbHBlckZ1bmN0aW9ucywge30sIGZvcm0pO1xyXG4gICAgICAgIGNvbnN0IHNob3dBbGVydDogQWxlcnQgPSB7XHJcbiAgICAgICAgICAgIHNob3duOiBmYWxzZSxcclxuICAgICAgICAgICAgYWxlcnRXaGVuRXhwcmVzc2lvbjogcXVlc3Rpb24uYWxlcnQuYWxlcnRXaGVuRXhwcmVzc2lvbixcclxuICAgICAgICAgICAgYWxlcnRNZXNzYWdlOiBxdWVzdGlvbi5hbGVydC5tZXNzYWdlLFxyXG4gICAgICAgICAgICByZUV2YWx1YXRlQWxlcnRFeHByZXNzaW9uOiAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBydW5uYWJsZS5ydW4oKTtcclxuICAgICAgICAgICAgICAgIHNob3dBbGVydC5zaG93biA9IHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIHNob3dBbGVydDtcclxuICAgIH1cclxufVxyXG4iXX0=