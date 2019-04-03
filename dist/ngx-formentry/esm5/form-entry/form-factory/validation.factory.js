/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        /** @type {?} */
        var list = [];
        if (question.validators) {
            _.forEach(question.validators, (/**
             * @param {?} validator
             * @return {?}
             */
            function (validator) {
                switch (validator.type) {
                    case 'date':
                        list.push(_this.dateValidator);
                        /** @type {?} */
                        var allowFutureDates = ((/** @type {?} */ (validator))).allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(_this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(_this.jsExpressionValidator.validate((/** @type {?} */ (validator)), form));
                        break;
                    case 'max':
                        list.push(_this.getMaxValueValidator(((/** @type {?} */ (validator))).max));
                        break;
                    case 'min':
                        list.push(_this.getMinValueValidator(((/** @type {?} */ (validator))).min));
                        break;
                    case 'conditionalRequired':
                        list.push(_this.conditionalRequiredValidator.validate((/** @type {?} */ (validator))));
                        break;
                    case 'conditionalAnswered':
                        list.push(_this.conditionalAnsweredValidator.validate((/** @type {?} */ (validator))));
                        break;
                }
            }));
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
        /** @type {?} */
        var messages = [];
        for (var property in errors) {
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
    ValidationFactory.ctorParameters = function () { return []; };
    return ValidationFactory;
}());
export { ValidationFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRN0M7SUFHRTtJQUFlLENBQUM7Ozs7OztJQUVoQix5Q0FBYTs7Ozs7SUFBYixVQUFjLFFBQXNCLEVBQUUsSUFBVTtRQUFoRCxpQkE0Q0M7O1lBMUNPLElBQUksR0FBZSxFQUFFO1FBRTNCLEVBQUUsQ0FBQyxD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LENBQUMsQ0FBQyxDQUFDO3dCQUMzRSxLQUFLLENBQUM7b0JBQ1IsS0FBSyxLQUFLO3dCQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDM0UsS0FBSyxDQUFDO29CQUNSLEtBQUssZUFBZTt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDOztnQkF0SkYsVUFBVTs7O0lBdUpYLHdCQUFDO0NBQUEsQUF2SkQsSUF1SkM7U0F0SlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5cclxuaW1wb3J0IHsgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtYW5zd2VyZWQudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvcic7XHJcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2RhdGUudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgTWluVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9taW4udmFsaWRhdG9yJztcclxuaW1wb3J0IHsgTWF4VmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgTWluRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLWRhdGUudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgTWF4RGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWF4LWRhdGUudmFsaWRhdG9yJztcclxuaW1wb3J0IHsgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mdXR1cmUtZGF0ZS1yZXN0cmljdGlvbi52YWxpZGF0b3InO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2pzLWV4cHJlc3Npb24udmFsaWRhdG9yJztcclxuaW1wb3J0IHsgUXVlc3Rpb25CYXNlIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3F1ZXN0aW9uLWJhc2UnO1xyXG5pbXBvcnQgeyBNZXNzYWdlcyB9IGZyb20gJy4uL3V0aWxzL21lc3NhZ2VzJztcclxuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3ZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBEYXRlVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2RhdGUtdmFsaWRhdGlvbi5tb2RlbCc7XHJcbmltcG9ydCB7IE1heFZhbGlkYXRpb25Nb2RlbH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21heC12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgTWluVmFsaWRhdGlvbk1vZGVsfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xyXG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvanMtZXhwcmVzc2lvbi12YWxpZGF0aW9uLm1vZGVsJztcclxuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRmFjdG9yeSB7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge31cclxuXHJcbiAgZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBmb3JtPzogYW55KSB7XHJcblxyXG4gICAgY29uc3QgbGlzdDogQXJyYXk8YW55PiA9IFtdO1xyXG5cclxuICAgIGlmIChxdWVzdGlvbi52YWxpZGF0b3JzKSB7XHJcblxyXG4gICAgICBfLmZvckVhY2gocXVlc3Rpb24udmFsaWRhdG9ycywgKHZhbGlkYXRvcjogVmFsaWRhdGlvbk1vZGVsKSA9PiB7XHJcblxyXG4gICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcclxuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5kYXRlVmFsaWRhdG9yKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsb3dGdXR1cmVEYXRlczogYm9vbGVhbiA9ICggPERhdGVWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yICkuYWxsb3dGdXR1cmVEYXRlcztcclxuXHJcbiAgICAgICAgICAgIGlmICghYWxsb3dGdXR1cmVEYXRlcykge1xyXG4gICAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuanNFeHByZXNzaW9uVmFsaWRhdG9yLnZhbGlkYXRlKDxKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yLCBmb3JtKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgY2FzZSAnbWF4JzpcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZ2V0TWF4VmFsdWVWYWxpZGF0b3IoKDxNYXhWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5tYXgpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdtaW4nOlxyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5nZXRNaW5WYWx1ZVZhbGlkYXRvcigoPE1pblZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpLm1pbikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsUmVxdWlyZWQnOlxyXG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5jb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yLnZhbGlkYXRlKDxDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuY29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvci52YWxpZGF0ZSg8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHF1ZXN0aW9uLnJlcXVpcmVkICYmIHR5cGVvZihxdWVzdGlvbi5yZXF1aXJlZCkgPT09ICdzdHJpbmcnICYmIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAndHJ1ZScpIHtcclxuICAgICAgbGlzdC5wdXNoKHRoaXMucmVxdWlyZWRWYWxpZGF0b3IpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIC8vIFRPRE8gLSBoYW5kbGUgY3VzdG9tIHJlcXVpcmVkIHZhbGlkYXRvclxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsaXN0O1xyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IoKTogQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvciB7XHJcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IoKTtcclxuICB9XHJcblxyXG4gIGdldCBjb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgcmVxdWlyZWRWYWxpZGF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBuZXcgUmVxdWlyZWRWYWxpZGF0b3IoKS52YWxpZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBkYXRlVmFsaWRhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcclxuICB9XHJcblxyXG4gIGdldCBmdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IoKTogYW55IHtcclxuICAgIHJldHVybiBuZXcgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKCkudmFsaWRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4RGF0ZVZhbGlkYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIG5ldyBNYXhEYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXQgbWluRGF0ZVZhbGlkYXRvcigpOiBhbnkge1xyXG4gICAgcmV0dXJuIG5ldyBNaW5EYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XHJcbiAgfVxyXG5cclxuICBnZXQgbWluTGVuZ3RoVmFsaWRhdG9yKCk6IGFueSB7XHJcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5taW5MZW5ndGg7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF4TGVuZ3RoVmFsaWRhdG9yKCkge1xyXG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubWF4TGVuZ3RoO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldE1pblZhbHVlVmFsaWRhdG9yKG1pbjogbnVtYmVyKTogYW55IHtcclxuICAgIHJldHVybiBuZXcgTWluVmFsaWRhdG9yKCkudmFsaWRhdGUobWluKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXRNYXhWYWx1ZVZhbGlkYXRvcihtYXg6IG51bWJlcik6IGFueSB7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBNYXhWYWxpZGF0b3IoKS52YWxpZGF0ZShtYXgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGpzRXhwcmVzc2lvblZhbGlkYXRvcigpIHtcclxuXHJcbiAgICByZXR1cm4gbmV3IEpzRXhwcmVzc2lvblZhbGlkYXRvcigpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGVycm9ycyhlcnJvcnM6IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IEFycmF5PHN0cmluZz4ge1xyXG5cclxuICAgIGNvbnN0IG1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblxyXG4gICAgZm9yIChjb25zdCBwcm9wZXJ0eSBpbiBlcnJvcnMpIHtcclxuICAgICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xyXG5cclxuICAgICAgICAgICAgc3dpdGNoIChwcm9wZXJ0eSkge1xyXG4gICAgICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuUkVRVUlSRURfRklFTERfTVNHKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5JTlZBTElEX0RBVEVfTVNHKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLkZVVFVSRV9EQVRFX1JFU1RSSUNUSU9OX01TRyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdtaW5sZW5ndGgnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKCd7bWluTGVuZ3RofScsIGVycm9ycy5taW5sZW5ndGgucmVxdWlyZWRMZW5ndGgpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ21heGxlbmd0aCc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9MRU5HVEhfTVNHLnJlcGxhY2UoJ3ttYXhMZW5ndGh9JywgZXJyb3JzLm1heGxlbmd0aC5yZXF1aXJlZExlbmd0aCkpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgY2FzZSAnbWF4ZGF0ZSc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1BWF9EQVRFX01TRy5yZXBsYWNlKCd7bWF4RGF0ZX0nLCBlcnJvcnMubWF4ZGF0ZS5yZXF1aXJlZERhdGUpKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ21pbmRhdGUnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fREFURV9NU0cucmVwbGFjZSgne21pbkRhdGV9JywgZXJyb3JzLm1pbmRhdGUucmVxdWlyZWREYXRlKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdtYXgnOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NQVhfTVNHLnJlcGxhY2UoJ3ttYXh9JywgZXJyb3JzLm1heC5yZXF1aXJlZFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdtaW4nOlxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTVNHLnJlcGxhY2UoJ3ttaW59JywgZXJyb3JzLm1pbi5yZXF1aXJlZFZhbHVlKSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydqc19leHByZXNzaW9uJ10ubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICBjYXNlICdjb25kaXRpb25hbF9yZXF1aXJlZCc6XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfcmVxdWlyZWQnXS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJzpcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9hbnN3ZXJlZCddLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xyXG4gIH1cclxufVxyXG4iXX0=