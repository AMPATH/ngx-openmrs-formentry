import * as tslib_1 from "tslib";
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
    ValidationFactory.prototype.getValidators = function (question, form) {
        var _this = this;
        var list = [];
        if (question.validators) {
            _.forEach(question.validators, function (validator) {
                switch (validator.type) {
                    case 'date':
                        list.push(_this.dateValidator);
                        var allowFutureDates = validator.allowFutureDates;
                        if (!allowFutureDates) {
                            list.push(_this.futureDateRestrictionValidator);
                        }
                        break;
                    case 'js_expression':
                        list.push(_this.jsExpressionValidator.validate(validator, form));
                        break;
                    case 'max':
                        list.push(_this.getMaxValueValidator(validator.max));
                        break;
                    case 'min':
                        list.push(_this.getMinValueValidator(validator.min));
                        break;
                    case 'conditionalRequired':
                        list.push(_this.conditionalRequiredValidator.validate(validator));
                        break;
                    case 'conditionalAnswered':
                        list.push(_this.conditionalAnsweredValidator.validate(validator));
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
        get: function () {
            return new ConditionalRequiredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "conditionalAnsweredValidator", {
        get: function () {
            return new ConditionalAnsweredValidator();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "requiredValidator", {
        get: function () {
            return new RequiredValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "dateValidator", {
        get: function () {
            return new DateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "futureDateRestrictionValidator", {
        get: function () {
            return new FutureDateRestrictionValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxDateValidator", {
        get: function () {
            return new MaxDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minDateValidator", {
        get: function () {
            return new MinDateValidator().validate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "minLengthValidator", {
        get: function () {
            return Validators.minLength;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationFactory.prototype, "maxLengthValidator", {
        get: function () {
            return Validators.maxLength;
        },
        enumerable: true,
        configurable: true
    });
    ValidationFactory.prototype.getMinValueValidator = function (min) {
        return new MinValidator().validate(min);
    };
    ValidationFactory.prototype.getMaxValueValidator = function (max) {
        return new MaxValidator().validate(max);
    };
    Object.defineProperty(ValidationFactory.prototype, "jsExpressionValidator", {
        get: function () {
            return new JsExpressionValidator();
        },
        enumerable: true,
        configurable: true
    });
    ValidationFactory.prototype.errors = function (errors, question) {
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
    ValidationFactory = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], ValidationFactory);
    return ValidationFactory;
}());
export { ValidationFactory };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJmb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS92YWxpZGF0aW9uLmZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzVDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBRTVCLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSw0QkFBNEIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBQzVGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzNELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQ2pHLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVDQUF1QyxDQUFDO0FBRTlFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQVM3QztJQUVFO0lBQWUsQ0FBQztJQUVoQix5Q0FBYSxHQUFiLFVBQWMsUUFBc0IsRUFBRSxJQUFVO1FBQWhELGlCQTRDQztRQTFDQyxJQUFNLElBQUksR0FBZSxFQUFFLENBQUM7UUFFNUIsSUFBSSxRQUFRLENBQUMsVUFBVSxFQUFFO1lBRXZCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxVQUFDLFNBQTBCO2dCQUV4RCxRQUFRLFNBQVMsQ0FBQyxJQUFJLEVBQUU7b0JBQ3RCLEtBQUssTUFBTTt3QkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFDOUIsSUFBTSxnQkFBZ0IsR0FBbUMsU0FBVyxDQUFDLGdCQUFnQixDQUFDO3dCQUV0RixJQUFJLENBQUMsZ0JBQWdCLEVBQUU7NEJBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLDhCQUE4QixDQUFDLENBQUM7eUJBQ2hEO3dCQUNELE1BQU07b0JBQ1IsS0FBSyxlQUFlO3dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxRQUFRLENBQThCLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUM3RixNQUFNO29CQUNSLEtBQUssS0FBSzt3QkFDUixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxvQkFBb0IsQ0FBc0IsU0FBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQzFFLE1BQU07b0JBQ1IsS0FBSyxLQUFLO3dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLG9CQUFvQixDQUFzQixTQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDMUUsTUFBTTtvQkFDUixLQUFLLHFCQUFxQjt3QkFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsNEJBQTRCLENBQUMsUUFBUSxDQUE2QixTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUM3RixNQUFNO29CQUNSLEtBQUsscUJBQXFCO3dCQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLENBQTZCLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQzdGLE1BQU07aUJBQ1Q7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBRUQsSUFBSSxRQUFRLENBQUMsUUFBUSxJQUFJLE9BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxJQUFJLFFBQVEsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUFFO1lBQy9GLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDbkM7YUFBTTtZQUVMLDBDQUEwQztTQUMzQztRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHNCQUFJLDJEQUE0QjthQUFoQztZQUNFLE9BQU8sSUFBSSw0QkFBNEIsRUFBRSxDQUFDO1FBQzVDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksMkRBQTRCO2FBQWhDO1lBQ0UsT0FBTyxJQUFJLDRCQUE0QixFQUFFLENBQUM7UUFDNUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxnREFBaUI7YUFBckI7WUFDRSxPQUFPLElBQUksaUJBQWlCLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDMUMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw0Q0FBYTthQUFqQjtZQUNFLE9BQU8sSUFBSSxhQUFhLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSw2REFBOEI7YUFBbEM7WUFDRSxPQUFPLElBQUksOEJBQThCLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDdkQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQ0FBZ0I7YUFBcEI7WUFDRSxPQUFPLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSwrQ0FBZ0I7YUFBcEI7WUFDRSxPQUFPLElBQUksZ0JBQWdCLEVBQUUsQ0FBQyxRQUFRLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpREFBa0I7YUFBdEI7WUFDRSxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBSSxpREFBa0I7YUFBdEI7WUFDRSxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7UUFDOUIsQ0FBQzs7O09BQUE7SUFFTSxnREFBb0IsR0FBM0IsVUFBNEIsR0FBVztRQUNyQyxPQUFPLElBQUksWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxnREFBb0IsR0FBM0IsVUFBNEIsR0FBVztRQUVyQyxPQUFPLElBQUksWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxzQkFBSSxvREFBcUI7YUFBekI7WUFFRSxPQUFPLElBQUkscUJBQXFCLEVBQUUsQ0FBQztRQUNyQyxDQUFDOzs7T0FBQTtJQUVNLGtDQUFNLEdBQWIsVUFBYyxNQUFXLEVBQUUsUUFBc0I7UUFFL0MsSUFBTSxRQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUVuQyxLQUFLLElBQU0sUUFBUSxJQUFJLE1BQU0sRUFBRTtZQUMzQixJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBRWpDLFFBQVEsUUFBUSxFQUFFO29CQUNoQixLQUFLLFVBQVU7d0JBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsQ0FBQzt3QkFDM0MsTUFBTTtvQkFDUixLQUFLLE1BQU07d0JBQ1QsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDekMsTUFBTTtvQkFDUixLQUFLLHVCQUF1Qjt3QkFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLENBQUMsQ0FBQzt3QkFDcEQsTUFBTTtvQkFDUixLQUFLLFdBQVc7d0JBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO3dCQUMvRixNQUFNO29CQUNSLEtBQUssV0FBVzt3QkFDZCxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQy9GLE1BQU07b0JBQ1IsS0FBSyxTQUFTO3dCQUNaLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDdkYsTUFBTTtvQkFDUixLQUFLLFNBQVM7d0JBQ1osUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO3dCQUN2RixNQUFNO29CQUNSLEtBQUssS0FBSzt3QkFDUixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQzNFLE1BQU07b0JBQ1IsS0FBSyxLQUFLO3dCQUNSLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDM0UsTUFBTTtvQkFDUixLQUFLLGVBQWU7d0JBQ2xCLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUMvQyxNQUFNO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO29CQUNSLEtBQUssc0JBQXNCO3dCQUN6QixRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUVELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFySlUsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTs7T0FDQSxpQkFBaUIsQ0FzSjdCO0lBQUQsd0JBQUM7Q0FBQSxBQXRKRCxJQXNKQztTQXRKWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvY29uZGl0aW9uYWwtcmVxdWlyZWQudmFsaWRhdG9yJztcbmltcG9ydCB7IENvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2NvbmRpdGlvbmFsLWFuc3dlcmVkLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBSZXF1aXJlZFZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvcmVxdWlyZWQudmFsaWRhdG9yJztcbmltcG9ydCB7IERhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2RhdGUudmFsaWRhdG9yJztcbmltcG9ydCB7IE1pblZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBNYXhWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21heC52YWxpZGF0b3InO1xuaW1wb3J0IHsgTWluRGF0ZVZhbGlkYXRvciB9IGZyb20gJy4uL3ZhbGlkYXRvcnMvbWluLWRhdGUudmFsaWRhdG9yJztcbmltcG9ydCB7IE1heERhdGVWYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL21heC1kYXRlLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBGdXR1cmVEYXRlUmVzdHJpY3Rpb25WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2Z1dHVyZS1kYXRlLXJlc3RyaWN0aW9uLnZhbGlkYXRvcic7XG5pbXBvcnQgeyBKc0V4cHJlc3Npb25WYWxpZGF0b3IgfSBmcm9tICcuLi92YWxpZGF0b3JzL2pzLWV4cHJlc3Npb24udmFsaWRhdG9yJztcbmltcG9ydCB7IFF1ZXN0aW9uQmFzZSB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9xdWVzdGlvbi1iYXNlJztcbmltcG9ydCB7IE1lc3NhZ2VzIH0gZnJvbSAnLi4vdXRpbHMvbWVzc2FnZXMnO1xuaW1wb3J0IHsgVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL3ZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgRGF0ZVZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9kYXRlLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWF4VmFsaWRhdGlvbk1vZGVsfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWF4LXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgTWluVmFsaWRhdGlvbk1vZGVsfSBmcm9tICcuLi9xdWVzdGlvbi1tb2RlbHMvbWluLXZhbGlkYXRpb24ubW9kZWwnO1xuaW1wb3J0IHsgSnNFeHByZXNzaW9uVmFsaWRhdGlvbk1vZGVsIH0gZnJvbSAnLi4vcXVlc3Rpb24tbW9kZWxzL2pzLWV4cHJlc3Npb24tdmFsaWRhdGlvbi5tb2RlbCc7XG5pbXBvcnQgeyBDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbCB9IGZyb20gJy4uL3F1ZXN0aW9uLW1vZGVscy9jb25kaXRpb25hbC12YWxpZGF0aW9uLm1vZGVsJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25GYWN0b3J5IHtcblxuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgZ2V0VmFsaWRhdG9ycyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlLCBmb3JtPzogYW55KSB7XG5cbiAgICBjb25zdCBsaXN0OiBBcnJheTxhbnk+ID0gW107XG5cbiAgICBpZiAocXVlc3Rpb24udmFsaWRhdG9ycykge1xuXG4gICAgICBfLmZvckVhY2gocXVlc3Rpb24udmFsaWRhdG9ycywgKHZhbGlkYXRvcjogVmFsaWRhdGlvbk1vZGVsKSA9PiB7XG5cbiAgICAgICAgc3dpdGNoICh2YWxpZGF0b3IudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2RhdGUnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZGF0ZVZhbGlkYXRvcik7XG4gICAgICAgICAgICBjb25zdCBhbGxvd0Z1dHVyZURhdGVzOiBib29sZWFuID0gKCA8RGF0ZVZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IgKS5hbGxvd0Z1dHVyZURhdGVzO1xuXG4gICAgICAgICAgICBpZiAoIWFsbG93RnV0dXJlRGF0ZXMpIHtcbiAgICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuanNFeHByZXNzaW9uVmFsaWRhdG9yLnZhbGlkYXRlKDxKc0V4cHJlc3Npb25WYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yLCBmb3JtKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtYXgnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuZ2V0TWF4VmFsdWVWYWxpZGF0b3IoKDxNYXhWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKS5tYXgpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5nZXRNaW5WYWx1ZVZhbGlkYXRvcigoPE1pblZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpLm1pbikpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxSZXF1aXJlZCc6XG4gICAgICAgICAgICBsaXN0LnB1c2godGhpcy5jb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yLnZhbGlkYXRlKDxDb25kaXRpb25hbFZhbGlkYXRpb25Nb2RlbD52YWxpZGF0b3IpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsQW5zd2VyZWQnOlxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMuY29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvci52YWxpZGF0ZSg8Q29uZGl0aW9uYWxWYWxpZGF0aW9uTW9kZWw+dmFsaWRhdG9yKSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXN0aW9uLnJlcXVpcmVkICYmIHR5cGVvZihxdWVzdGlvbi5yZXF1aXJlZCkgPT09ICdzdHJpbmcnICYmIHF1ZXN0aW9uLnJlcXVpcmVkID09PSAndHJ1ZScpIHtcbiAgICAgIGxpc3QucHVzaCh0aGlzLnJlcXVpcmVkVmFsaWRhdG9yKTtcbiAgICB9IGVsc2Uge1xuXG4gICAgICAvLyBUT0RPIC0gaGFuZGxlIGN1c3RvbSByZXF1aXJlZCB2YWxpZGF0b3JcbiAgICB9XG5cbiAgICByZXR1cm4gbGlzdDtcbiAgfVxuXG4gIGdldCBjb25kaXRpb25hbFJlcXVpcmVkVmFsaWRhdG9yKCk6IENvbmRpdGlvbmFsUmVxdWlyZWRWYWxpZGF0b3Ige1xuICAgIHJldHVybiBuZXcgQ29uZGl0aW9uYWxSZXF1aXJlZFZhbGlkYXRvcigpO1xuICB9XG5cbiAgZ2V0IGNvbmRpdGlvbmFsQW5zd2VyZWRWYWxpZGF0b3IoKTogQ29uZGl0aW9uYWxBbnN3ZXJlZFZhbGlkYXRvciB7XG4gICAgcmV0dXJuIG5ldyBDb25kaXRpb25hbEFuc3dlcmVkVmFsaWRhdG9yKCk7XG4gIH1cblxuICBnZXQgcmVxdWlyZWRWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IFJlcXVpcmVkVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgZGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IGZ1dHVyZURhdGVSZXN0cmljdGlvblZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRnV0dXJlRGF0ZVJlc3RyaWN0aW9uVmFsaWRhdG9yKCkudmFsaWRhdGU7XG4gIH1cblxuICBnZXQgbWF4RGF0ZVZhbGlkYXRvcigpOiBhbnkge1xuICAgIHJldHVybiBuZXcgTWF4RGF0ZVZhbGlkYXRvcigpLnZhbGlkYXRlO1xuICB9XG5cbiAgZ2V0IG1pbkRhdGVWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gbmV3IE1pbkRhdGVWYWxpZGF0b3IoKS52YWxpZGF0ZTtcbiAgfVxuXG4gIGdldCBtaW5MZW5ndGhWYWxpZGF0b3IoKTogYW55IHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5taW5MZW5ndGg7XG4gIH1cblxuICBnZXQgbWF4TGVuZ3RoVmFsaWRhdG9yKCkge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLm1heExlbmd0aDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNaW5WYWx1ZVZhbGlkYXRvcihtaW46IG51bWJlcik6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBNaW5WYWxpZGF0b3IoKS52YWxpZGF0ZShtaW4pO1xuICB9XG5cbiAgcHVibGljIGdldE1heFZhbHVlVmFsaWRhdG9yKG1heDogbnVtYmVyKTogYW55IHtcblxuICAgIHJldHVybiBuZXcgTWF4VmFsaWRhdG9yKCkudmFsaWRhdGUobWF4KTtcbiAgfVxuXG4gIGdldCBqc0V4cHJlc3Npb25WYWxpZGF0b3IoKSB7XG5cbiAgICByZXR1cm4gbmV3IEpzRXhwcmVzc2lvblZhbGlkYXRvcigpO1xuICB9XG5cbiAgcHVibGljIGVycm9ycyhlcnJvcnM6IGFueSwgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IEFycmF5PHN0cmluZz4ge1xuXG4gICAgY29uc3QgbWVzc2FnZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gZXJyb3JzKSB7XG4gICAgICAgIGlmIChlcnJvcnMuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG5cbiAgICAgICAgICAgIHN3aXRjaCAocHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgY2FzZSAncmVxdWlyZWQnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goTWVzc2FnZXMuUkVRVUlSRURfRklFTERfTVNHKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZGF0ZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5JTlZBTElEX0RBVEVfTVNHKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZnV0dXJlRGF0ZVJlc3RyaWN0aW9uJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLkZVVFVSRV9EQVRFX1JFU1RSSUNUSU9OX01TRyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21pbmxlbmd0aCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTEVOR1RIX01TRy5yZXBsYWNlKCd7bWluTGVuZ3RofScsIGVycm9ycy5taW5sZW5ndGgucmVxdWlyZWRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWF4bGVuZ3RoJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1JTl9MRU5HVEhfTVNHLnJlcGxhY2UoJ3ttYXhMZW5ndGh9JywgZXJyb3JzLm1heGxlbmd0aC5yZXF1aXJlZExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdtYXhkYXRlJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKE1lc3NhZ2VzLk1BWF9EQVRFX01TRy5yZXBsYWNlKCd7bWF4RGF0ZX0nLCBlcnJvcnMubWF4ZGF0ZS5yZXF1aXJlZERhdGUpKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnbWluZGF0ZSc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fREFURV9NU0cucmVwbGFjZSgne21pbkRhdGV9JywgZXJyb3JzLm1pbmRhdGUucmVxdWlyZWREYXRlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21heCc6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NQVhfTVNHLnJlcGxhY2UoJ3ttYXh9JywgZXJyb3JzLm1heC5yZXF1aXJlZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ21pbic6XG4gICAgICAgICAgICAgICAgbWVzc2FnZXMucHVzaChNZXNzYWdlcy5NSU5fTVNHLnJlcGxhY2UoJ3ttaW59JywgZXJyb3JzLm1pbi5yZXF1aXJlZFZhbHVlKSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2pzX2V4cHJlc3Npb24nOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydqc19leHByZXNzaW9uJ10ubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2NvbmRpdGlvbmFsX3JlcXVpcmVkJzpcbiAgICAgICAgICAgICAgICBtZXNzYWdlcy5wdXNoKGVycm9yc1snY29uZGl0aW9uYWxfcmVxdWlyZWQnXS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY29uZGl0aW9uYWxfYW5zd2VyZWQnOlxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2goZXJyb3JzWydjb25kaXRpb25hbF9hbnN3ZXJlZCddLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VzO1xuICB9XG59XG4iXX0=