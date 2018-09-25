/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ConditionalRequiredValidator } from '../validators/conditional-required.validator';
import { ConditionalAnsweredValidator } from '../validators/conditional-answered.validator';
import { RequiredValidator } from '../validators/required.validator';
import { DateValidator } from '../validators/date.validator';
import { MinValidator } from '../validators/min.validator';
import { MaxValidator } from '../validators/max.validator';
import { MinDateValidator } from '../validators/min-date.validator';
import { MaxDateValidator } from '../validators/max-date.validator';
import { FutureDateRestrictionValidator } from '../validators/future-date-restriction.validator';
import { JsExpressionValidator } from '../validators/js-expression.validator';
import { Messages } from '../utils/messages';
var ValidationFactory = /** @class */ (function () {
    function ValidationFactory() {
    }
    /**
     * @param {?} question
     * @param {?=} form
     * @return {?}
     */
    ValidationFactory.prototype.getValidators = /**
     * @param {?} question
     * @param {?=} form
     * @return {?}
     */
    function (question, form) {
        var _this = this;
        var /** @type {?} */ list = [];
        if (question.validators) {
            _.forEach(question.validators, function (validator) {
                switch (validator.type) {
                    case 'date':
                        list.push(_this.dateValidator);
                        var /** @type {?} */ allowFutureDates = (/** @type {?} */ (validator)).allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(_this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(_this.jsExpressionValidator.validate(/** @type {?} */ (validator), form));
                        break;
                    case 'max':
                        list.push(_this.getMaxValueValidator((/** @type {?} */ (validator)).max));
                        break;
                    case 'min':
                        list.push(_this.getMinValueValidator((/** @type {?} */ (validator)).min));
                        break;
                    case 'conditionalRequired':
                        list.push(_this.conditionalRequiredValidator.validate(/** @type {?} */ (validator)));
                        break;
                    case 'conditionalAnswered':
                        list.push(_this.conditionalAnsweredValidator.validate(/** @type {?} */ (validator)));
                        break;
                }
            });
        }
        if (question.required && typeof (question.required) === 'string' && question.required === 'true') {
            list.push(this.requiredValidator);
        }
        else {
            // TODO - handle custom required validator
        }
        return list;
    };
    Object.defineProperty(ValidationFactory.prototype, "conditionalRequiredValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new ConditionalRequiredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "conditionalAnsweredValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new ConditionalAnsweredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "requiredValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new RequiredValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "dateValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new DateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "futureDateRestrictionValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new FutureDateRestrictionValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxDateValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new MaxDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minDateValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new MinDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minLengthValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.minLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxLengthValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return Validators.maxLength;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} min
     * @return {?}
     */
    ValidationFactory.prototype.getMinValueValidator = /**
     * @param {?} min
     * @return {?}
     */
    function (min) {
        return new MinValidator().validate(min);
    };
    /**
     * @param {?} max
     * @return {?}
     */
    ValidationFactory.prototype.getMaxValueValidator = /**
     * @param {?} max
     * @return {?}
     */
    function (max) {
        return new MaxValidator().validate(max);
    };
    Object.defineProperty(ValidationFactory.prototype, "jsExpressionValidator", {
        get: /**
         * @return {?}
         */
        function () {
            return new JsExpressionValidator();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} errors
     * @param {?} question
     * @return {?}
     */
    ValidationFactory.prototype.errors = /**
     * @param {?} errors
     * @param {?} question
     * @return {?}
     */
    function (errors, question) {
        var /** @type {?} */ messages = [];
        for (var /** @type {?} */ property in errors) {
            if (errors.hasOwnProperty(property)) {
                switch (property) {
                    case 'required':
                        messages.push(Messages.REQUIRED_FIELD_MSG);
                        break;
                    case 'date':
                        messages.push(Messages.INVALID_DATE_MSG);
                        break;
                    case 'futureDateRestriction':
                        messages.push(Messages.FUTURE_DATE_RESTRICTION_MSG);
                        break;
                    case 'minlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{minLength}', errors.minlength.requiredLength));
                        break;
                    case 'maxlength':
                        messages.push(Messages.MIN_LENGTH_MSG.replace('{maxLength}', errors.maxlength.requiredLength));
                        break;
                    case 'maxdate':
                        messages.push(Messages.MAX_DATE_MSG.replace('{maxDate}', errors.maxdate.requiredDate));
                        break;
                    case 'mindate':
                        messages.push(Messages.MIN_DATE_MSG.replace('{minDate}', errors.mindate.requiredDate));
                        break;
                    case 'max':
                        messages.push(Messages.MAX_MSG.replace('{max}', errors.max.requiredValue));
                        break;
                    case 'min':
                        messages.push(Messages.MIN_MSG.replace('{min}', errors.min.requiredValue));
                        break;
                    case 'js_expression':
                        messages.push(errors['js_expression'].message);
                        break;
                    case 'conditional_required':
                        messages.push(errors['conditional_required'].message);
                        break;
                    case 'conditional_answered':
                        messages.push(errors['conditional_answered'].message);
                        break;
                }
            }
        }
        return messages;
    };
    ValidationFactory.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ValidationFactory.ctorParameters = function () { return []; };
    return ValidationFactory;
}());
export { ValidationFactory };
function ValidationFactory_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ValidationFactory.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ValidationFactory.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0lBVzNDO0tBQWdCOzs7Ozs7SUFFaEIseUNBQWE7Ozs7O0lBQWIsVUFBYyxRQUFzQixFQUFFLElBQVU7UUFBaEQsaUJBNENDO1FBMUNDLHFCQUFNLElBQUksR0FBZSxFQUFFLENBQUM7UUFFNUIsRUFBRSxDQUFD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QUNSLEtBQUssZUFBZTt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUM7aUJBQ1Q7YUFDSjtTQUNKO1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQzs7O2dCQXJKbkIsVUFBVTs7Ozs0QkF2Qlg7O1NBd0JhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuXHJcbmltcG9ydCB7IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IFJlcXVpcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9yZXF1aXJlZC52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9kYXRlLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IE1pblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IE1heFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWF4LnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IE1pbkRhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IE1heERhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21heC1kYXRlLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvZnV0dXJlLWRhdGUtcmVzdHJpY3Rpb24udmFsaWRhdG9yJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcclxuaW1wb3J0IHsgTWVzc2FnZXMgfSBmcm9tICcuLi91dGlscy9tZXNzYWdlcyc7XHJcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgRGF0ZVZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBNYXhWYWxpZGF0aW9uTW9kZWx9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9tYXgtdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IE1pblZhbGlkYXRpb25Nb2RlbH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21pbi12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2NvbmRpdGlvbmFsLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdGlvbkZhY3Rvcnkge1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHt9XHJcblxyXG4gIGdldFZhbGlkYXRvcnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZm9ybT86IGFueSkge1xyXG5cclxuICAgIGNvbnN0IGxpc3Q6IEFycmF5PGFueT4gPSBbXTtcclxuXHJcbiAgICBpZiAocXVlc3Rpb24udmFsaWRhdG9ycykge1xyXG5cclxuICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnZhbGlkYXRvcnMsICh2YWxpZGF0b3I6IFZhbGlkYXRpb25Nb2RlbCkgPT4ge1xyXG5cclxuICAgICAgICBzd2l0Y2ggKHZhbGlkYXRvci50eXBlKSB7XHJcbiAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZGF0ZVZhbGlkYXRvcik7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbG93RnV0dXJlRGF0ZXM6IGJvb2xlYW4gPSAoIDxEYXRlVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvciApLmFsbG93RnV0dXJlRGF0ZXM7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWFsbG93RnV0dXJlRGF0ZXMpIHtcclxuICAgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5mdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnanNfZXhwcmVzc2lvbic6XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmpzRXhwcmVzc2lvblZhbGlkYXRvci52YWxpZGF0ZSg8SnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvciwgZm9ybSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ21heCc6XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmdldE1heFZhbHVlVmFsaWRhdG9yKCg8TWF4VmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWF4KSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnbWluJzpcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZ2V0TWluVmFsdWVWYWxpZGF0b3IoKDxNaW5WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5taW4pKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbFJlcXVpcmVkJzpcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvci52YWxpZGF0ZSg8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxBbnN3ZXJlZCc6XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IudmFsaWRhdGUoPENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChxdWVzdGlvbi5yZXF1aXJlZCAmJiB0eXBlb2YocXVlc3Rpb24ucmVxdWlyZWQpID09PSAnc3RyaW5nJyAmJiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgIGxpc3QucHVzaCh0aGlzLnJlcXVpcmVkVmFsaWRhdG9yKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAvLyBUT0RPIC0gaGFuZGxlIGN1c3RvbSByZXF1aXJlZCB2YWxpZGF0b3JcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbGlzdDtcclxuICB9XHJcblxyXG4gIGdldCBjb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgY29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvcigpOiBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIHtcclxuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvcigpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IHJlcXVpcmVkVmFsaWRhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCkudmFsaWRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXQgZGF0ZVZhbGlkYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIG5ldyBEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXQgZnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpLnZhbGlkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heERhdGVWYWxpZGF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBuZXcgTWF4RGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pbkRhdGVWYWxpZGF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBuZXcgTWluRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1pbkxlbmd0aFZhbGlkYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubWluTGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgZ2V0IG1heExlbmd0aFZhbGlkYXRvcigpIHtcclxuICAgIHJldHVybiBWYWxpZGF0b3JzLm1heExlbmd0aDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNaW5WYWx1ZVZhbGlkYXRvcihtaW46IG51bWJlcik6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IE1pblZhbGlkYXRvcigpLnZhbGlkYXRlKG1pbik7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0TWF4VmFsdWVWYWxpZGF0b3IobWF4OiBudW1iZXIpOiBhbnkge1xyXG5cclxuICAgIHJldHVybiBuZXcgTWF4VmFsaWRhdG9yKCkudmFsaWRhdGUobWF4KTtcclxuICB9XHJcblxyXG4gIGdldCBqc0V4cHJlc3Npb25WYWxpZGF0b3IoKSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBKc0V4cHJlc3Npb25WYWxpZGF0b3IoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBlcnJvcnMoZXJyb3JzOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBBcnJheTxzdHJpbmc+IHtcclxuXHJcbiAgICBjb25zdCBtZXNzYWdlczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cclxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZXJyb3JzKSB7XHJcbiAgICAgICAgaWYgKGVycm9ycy5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICBjYXNlICdyZXF1aXJlZCc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLlJFUVVJUkVEX0ZJRUxEX01TRyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuSU5WQUxJRF9EQVRFX01TRyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdmdXR1cmVEYXRlUmVzdHJpY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5GVVRVUkVfREFURV9SRVNUUklDVElPTl9NU0cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbWlubGVuZ3RoJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0xFTkdUSF9NU0cucmVwbGFjZSgne21pbkxlbmd0aH0nLCBlcnJvcnMubWlubGVuZ3RoLnJlcXVpcmVkTGVuZ3RoKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdtYXhsZW5ndGgnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKCd7bWF4TGVuZ3RofScsIGVycm9ycy5tYXhsZW5ndGgucmVxdWlyZWRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ21heGRhdGUnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NQVhfREFURV9NU0cucmVwbGFjZSgne21heERhdGV9JywgZXJyb3JzLm1heGRhdGUucmVxdWlyZWREYXRlKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdtaW5kYXRlJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0RBVEVfTVNHLnJlcGxhY2UoJ3ttaW5EYXRlfScsIGVycm9ycy5taW5kYXRlLnJlcXVpcmVkRGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbWF4JzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUFYX01TRy5yZXBsYWNlKCd7bWF4fScsIGVycm9ycy5tYXgucmVxdWlyZWRWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbWluJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX01TRy5yZXBsYWNlKCd7bWlufScsIGVycm9ycy5taW4ucmVxdWlyZWRWYWx1ZSkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnanNfZXhwcmVzc2lvbic6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snanNfZXhwcmVzc2lvbiddLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxfcmVxdWlyZWQnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJ10ubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdjb25kaXRpb25hbF9hbnN3ZXJlZCc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfYW5zd2VyZWQnXS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBtZXNzYWdlcztcclxuICB9XHJcbn1cclxuIl19