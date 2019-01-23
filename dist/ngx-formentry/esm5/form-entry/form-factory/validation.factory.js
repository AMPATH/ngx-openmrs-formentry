/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            _.forEach(question.validators, function (validator) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvdmFsaWRhdGlvbi5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUU1QixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsOEJBQThCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQUNqRyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1Q0FBdUMsQ0FBQztBQUU5RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFRN0M7SUFHRTtJQUFlLENBQUM7Ozs7OztJQUVoQix5Q0FBYTs7Ozs7SUFBYixVQUFjLFFBQXNCLEVBQUUsSUFBVTtRQUFoRCxpQkE0Q0M7O1lBMUNPLElBQUksR0FBZSxFQUFFO1FBRTNCLEVBQUUsQ0FBQyxD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QUMsQ0FBQyxDQUFDO3dCQUMzRSxLQUFLLENBQUM7b0JBQ1IsS0FBSyxLQUFLO3dCQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDM0UsS0FBSyxDQUFDO29CQUNSLEtBQUssZUFBZTt3QkFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQy9DLEtBQUssQ0FBQztvQkFDUixLQUFLLHNCQUFzQjt3QkFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDdEQsS0FBSyxDQUFDO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxLQUFLLENBQUM7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDOztnQkF0SkYsVUFBVTs7O0lBdUpYLHdCQUFDO0NBQUEsQUF2SkQsSUF1SkM7U0F0SlksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLXJlcXVpcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9jb25kaXRpb25hbC1hbnN3ZXJlZC52YWxpZGF0b3InO1xuaW1wb3J0IHsgUmVxdWlyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL3JlcXVpcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNaW5WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWF4VmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgudmFsaWRhdG9yJztcbmltcG9ydCB7IE1pbkRhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21pbi1kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNYXhEYXRlVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9tYXgtZGF0ZS52YWxpZGF0b3InO1xuaW1wb3J0IHsgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9mdXR1cmUtZGF0ZS1yZXN0cmljdGlvbi52YWxpZGF0b3InO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdG9yIH0gZnJvbSAnLi4vdmFsaWRhdG9ycy9qcy1leHByZXNzaW9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBRdWVzdGlvbkJhc2UgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvcXVlc3Rpb24tYmFzZSc7XG5pbXBvcnQgeyBNZXNzYWdlcyB9IGZyb20gJy4uL3V0aWxzL21lc3NhZ2VzJztcbmltcG9ydCB7IFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy92YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IERhdGVWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvZGF0ZS12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1heFZhbGlkYXRpb25Nb2RlbH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21heC12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IE1pblZhbGlkYXRpb25Nb2RlbH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL21pbi12YWxpZGF0aW9uLm1vZGVsJztcbmltcG9ydCB7IEpzRXhwcmVzc2lvblZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9qcy1leHByZXNzaW9uLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWwgfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvY29uZGl0aW9uYWwtdmFsaWRhdGlvbi5tb2RlbCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWYWxpZGF0aW9uRmFjdG9yeSB7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFZhbGlkYXRvcnMocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgZm9ybT86IGFueSkge1xuXG4gICAgY29uc3QgbGlzdDogQXJyYXk8YW55PiA9IFtdO1xuXG4gICAgaWYgKHF1ZXN0aW9uLnZhbGlkYXRvcnMpIHtcblxuICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnZhbGlkYXRvcnMsICh2YWxpZGF0b3I6IFZhbGlkYXRpb25Nb2RlbCkgPT4ge1xuXG4gICAgICAgIHN3aXRjaCAodmFsaWRhdG9yLnR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkYXRlJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmRhdGVWYWxpZGF0b3IpO1xuICAgICAgICAgICAgY29uc3QgYWxsb3dGdXR1cmVEYXRlczogYm9vbGVhbiA9ICggPERhdGVWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yICkuYWxsb3dGdXR1cmVEYXRlcztcblxuICAgICAgICAgICAgaWYgKCFhbGxvd0Z1dHVyZURhdGVzKSB7XG4gICAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmpzRXhwcmVzc2lvblZhbGlkYXRvci52YWxpZGF0ZSg8SnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvciwgZm9ybSkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbWF4JzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmdldE1heFZhbHVlVmFsaWRhdG9yKCg8TWF4VmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikubWF4KSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZ2V0TWluVmFsdWVWYWxpZGF0b3IoKDxNaW5WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5taW4pKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsUmVxdWlyZWQnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvci52YWxpZGF0ZSg8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjb25kaXRpb25hbEFuc3dlcmVkJzpcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLmNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IudmFsaWRhdGUoPENvbmRpdGlvbmFsVmFsaWRhdGlvbk1vZGVsPnZhbGlkYXRvcikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChxdWVzdGlvbi5yZXF1aXJlZCAmJiB0eXBlb2YocXVlc3Rpb24ucmVxdWlyZWQpID09PSAnc3RyaW5nJyAmJiBxdWVzdGlvbi5yZXF1aXJlZCA9PT0gJ3RydWUnKSB7XG4gICAgICBsaXN0LnB1c2godGhpcy5yZXF1aXJlZFZhbGlkYXRvcik7XG4gICAgfSBlbHNlIHtcblxuICAgICAgLy8gVE9ETyAtIGhhbmRsZSBjdXN0b20gcmVxdWlyZWQgdmFsaWRhdG9yXG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH1cblxuICBnZXQgY29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpOiBDb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yIHtcbiAgICByZXR1cm4gbmV3IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3IoKTtcbiAgfVxuXG4gIGdldCBjb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvcigpO1xuICB9XG5cbiAgZ2V0IHJlcXVpcmVkVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1aXJlZFZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IGRhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBmdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IEZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1heERhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1heERhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtaW5EYXRlVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNaW5EYXRlVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWluTGVuZ3RoVmFsaWRhdG9yKCk6IGFueSB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubWluTGVuZ3RoO1xuICB9XG5cbiAgZ2V0IG1heExlbmd0aFZhbGlkYXRvcigpIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXhMZW5ndGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0TWluVmFsdWVWYWxpZGF0b3IobWluOiBudW1iZXIpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWluVmFsaWRhdG9yKCkudmFsaWRhdGUobWluKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNYXhWYWx1ZVZhbGlkYXRvcihtYXg6IG51bWJlcik6IGFueSB7XG5cbiAgICByZXR1cm4gbmV3IE1heFZhbGlkYXRvcigpLnZhbGlkYXRlKG1heCk7XG4gIH1cblxuICBnZXQganNFeHByZXNzaW9uVmFsaWRhdG9yKCkge1xuXG4gICAgcmV0dXJuIG5ldyBKc0V4cHJlc3Npb25WYWxpZGF0b3IoKTtcbiAgfVxuXG4gIHB1YmxpYyBlcnJvcnMoZXJyb3JzOiBhbnksIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBBcnJheTxzdHJpbmc+IHtcblxuICAgIGNvbnN0IG1lc3NhZ2VzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IGluIGVycm9ycykge1xuICAgICAgICBpZiAoZXJyb3JzLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHByb3BlcnR5KSB7XG4gICAgICAgICAgICAgIGNhc2UgJ3JlcXVpcmVkJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLlJFUVVJUkVEX0ZJRUxEX01TRyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuSU5WQUxJRF9EQVRFX01TRyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Z1dHVyZURhdGVSZXN0cmljdGlvbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5GVVRVUkVfREFURV9SRVNUUklDVElPTl9NU0cpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtaW5sZW5ndGgnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0xFTkdUSF9NU0cucmVwbGFjZSgne21pbkxlbmd0aH0nLCBlcnJvcnMubWlubGVuZ3RoLnJlcXVpcmVkTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21heGxlbmd0aCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKCd7bWF4TGVuZ3RofScsIGVycm9ycy5tYXhsZW5ndGgucmVxdWlyZWRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWF4ZGF0ZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NQVhfREFURV9NU0cucmVwbGFjZSgne21heERhdGV9JywgZXJyb3JzLm1heGRhdGUucmVxdWlyZWREYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21pbmRhdGUnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX0RBVEVfTVNHLnJlcGxhY2UoJ3ttaW5EYXRlfScsIGVycm9ycy5taW5kYXRlLnJlcXVpcmVkRGF0ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUFYX01TRy5yZXBsYWNlKCd7bWF4fScsIGVycm9ycy5tYXgucmVxdWlyZWRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtaW4nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuTUlOX01TRy5yZXBsYWNlKCd7bWlufScsIGVycm9ycy5taW4ucmVxdWlyZWRWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdqc19leHByZXNzaW9uJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snanNfZXhwcmVzc2lvbiddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjb25kaXRpb25hbF9yZXF1aXJlZCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChlcnJvcnNbJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX2Fuc3dlcmVkJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfYW5zd2VyZWQnXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxufVxuIl19