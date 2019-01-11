/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
/** @type {?} */
var comma = ', ';
/** @type {?} */
var newLine = '\n';
var EncounterViewerService = /** @class */ (function () {
    function EncounterViewerService() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    EncounterViewerService.prototype.resolveSelectedValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return;
    };
    /**
     * @param {?} searchText
     * @return {?}
     */
    EncounterViewerService.prototype.searchOptions = /**
     * @param {?} searchText
     * @return {?}
     */
    function (searchText) {
        return;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    EncounterViewerService.prototype.fileUpload = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    EncounterViewerService.prototype.fetchFile = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return;
    };
    /**
     * @param {?} answerUuid
     * @param {?} schema
     * @return {?}
     */
    EncounterViewerService.prototype.resolveSelectedValueFromSchema = /**
     * @param {?} answerUuid
     * @param {?} schema
     * @return {?}
     */
    function (answerUuid, schema) {
        var _this = this;
        /** @type {?} */
        var label;
        if (schema.pages) {
            _.forEach(schema.pages, function (page) {
                /** @type {?} */
                var l = _this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, function (section) {
                /** @type {?} */
                var l = _this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, function (question) {
                if (question.questions) {
                    /** @type {?} */
                    var l = _this.resolveSelectedValueFromSchema(answerUuid, question);
                    if (l) {
                        label = l;
                    }
                }
                else {
                    if (question.questionOptions.answers) {
                        _.forEach(question.questionOptions.answers, function (answer) {
                            if (answer.concept === answerUuid) {
                                label = answer.label;
                            }
                        });
                    }
                    else if (question.questionOptions.selectableOrders) {
                        _.forEach(question.questionOptions.selectableOrders, function (order) {
                            if (order.concept === answerUuid) {
                                label = order.label;
                            }
                        });
                    }
                }
            });
        }
        return label;
    };
    /**
     * @param {?} node
     * @return {?}
     */
    EncounterViewerService.prototype.hasAnswer = /**
     * @param {?} node
     * @return {?}
     */
    function (node) {
        /** @type {?} */
        var answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    };
    /**
     * @param {?} node
     * @param {?=} answered
     * @return {?}
     */
    EncounterViewerService.prototype.questionsAnswered = /**
     * @param {?} node
     * @param {?=} answered
     * @return {?}
     */
    function (node, answered) {
        var _this = this;
        /** @type {?} */
        var $answered = answered || [];
        if (node.question.renderingType === 'page') {
            _.forEach(node.children, function (childNode) {
                _this.questionsAnswered(childNode, $answered);
            });
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, function (childNode) {
                if (childNode.question.renderingType === 'group') {
                    _.forEach(childNode.children, function (child) {
                        /** @type {?} */
                        var ans = _this.questionsAnswered(child, $answered);
                        if (ans) {
                            $answered.push(ans);
                        }
                    });
                }
                else if (_this.hasAnswer(childNode)) {
                    $answered.push(true);
                }
            });
        }
        else {
            return this.hasAnswer(node);
        }
        if ($answered.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    EncounterViewerService.prototype.isDate = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        if (Date.parse(val)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} unixTimestamp
     * @return {?}
     */
    EncounterViewerService.prototype.convertTime = /**
     * @param {?} unixTimestamp
     * @return {?}
     */
    function (unixTimestamp) {
        /** @type {?} */
        var a = new Date(unixTimestamp);
        /** @type {?} */
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        /** @type {?} */
        var year = a.getFullYear();
        /** @type {?} */
        var month = months[a.getMonth()];
        /** @type {?} */
        var date = a.getDate();
        /** @type {?} */
        var hour = a.getHours();
        /** @type {?} */
        var min = a.getMinutes();
        /** @type {?} */
        var sec = a.getSeconds();
        /** @type {?} */
        var suffix = hour < 12 ? 'AM' : 'PM';
        /** @type {?} */
        var time;
        if (hour === 0 && min === 0) {
            time = date + ' ' + month + ' ' + year;
        }
        else {
            time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + suffix + ' (EAT)';
        }
        return time;
    };
    EncounterViewerService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    EncounterViewerService.ctorParameters = function () { return []; };
    return EncounterViewerService;
}());
export { EncounterViewerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O0lBSXRCLEtBQUssR0FBRyxJQUFJOztJQUNaLE9BQU8sR0FBRyxJQUFJO0FBRXBCO0lBR0k7SUFBZSxDQUFDOzs7OztJQUNULHFEQUFvQjs7OztJQUEzQixVQUE0QixLQUFVO1FBQ2xDLE9BQU87SUFDWCxDQUFDOzs7OztJQUNNLDhDQUFhOzs7O0lBQXBCLFVBQXFCLFVBQWU7UUFDaEMsT0FBTztJQUNYLENBQUM7Ozs7O0lBQ00sMkNBQVU7Ozs7SUFBakIsVUFBa0IsSUFBUztRQUN2QixPQUFPO0lBQ1gsQ0FBQzs7Ozs7SUFDTSwwQ0FBUzs7OztJQUFoQixVQUFpQixHQUFRO1FBQ3JCLE9BQU87SUFDWCxDQUFDOzs7Ozs7SUFFTSwrREFBOEI7Ozs7O0lBQXJDLFVBQXVDLFVBQWtCLEVBQUUsTUFBVztRQUF0RSxpQkF1Q0M7O1lBdENPLEtBQUs7UUFDVCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJOztvQkFDckIsQ0FBQyxHQUFHLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO2dCQUMvRCxJQUFJLENBQUMsRUFBRTtvQkFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDO2lCQUFFO1lBQ3ZCLENBQUMsQ0FBQyxDQUFDO1NBQUU7UUFFVCxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDakIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxN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QUksSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQzFDO2FBQU07WUFDSCxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztTQUN2RjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7O2dCQWpISixVQUFVOzs7O0lBa0hYLDZCQUFDO0NBQUEsQUFsSEQsSUFrSEM7U0FqSFksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlLCBOb2RlQmFzZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL3NlbGVjdC1vcHRpb24nO1xuY29uc3QgY29tbWEgPSAnLCAnO1xuY29uc3QgbmV3TGluZSA9ICdcXG4nO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyU2VydmljZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuICAgIHB1YmxpYyByZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZTogYW55KTogT2JzZXJ2YWJsZTxTZWxlY3RPcHRpb24+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwdWJsaWMgc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0OiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbltdPiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHVibGljIGZpbGVVcGxvYWQoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwdWJsaWMgZmV0Y2hGaWxlKHVybDogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHB1YmxpYyByZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoIGFuc3dlclV1aWQ6IHN0cmluZywgc2NoZW1hOiBhbnkpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbGFiZWw7XG4gICAgICAgIGlmIChzY2hlbWEucGFnZXMpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBwYWdlKTtcbiAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XG4gICAgICAgICAgICB9KTsgfVxuXG4gICAgICAgIGlmIChzY2hlbWEuc2VjdGlvbnMpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEuc2VjdGlvbnMsIChzZWN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHNlY3Rpb24pO1xuICAgICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NoZW1hLnF1ZXN0aW9ucykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5xdWVzdGlvbnMsIChxdWVzdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBxdWVzdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycykge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMsIChhbnN3ZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbnN3ZXIuY29uY2VwdCA9PT0gYW5zd2VyVXVpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gYW5zd2VyLmxhYmVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycywgKG9yZGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIuY29uY2VwdCA9PT0gYW5zd2VyVXVpZCkgeyBsYWJlbCA9IG9yZGVyLmxhYmVsOyB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYWJlbDtcblxuXG4gICAgfVxuXG4gICAgcHVibGljIGhhc0Fuc3dlcihub2RlOiBOb2RlQmFzZSkge1xuICAgICAgICBsZXQgYW5zd2VyZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XG4gICAgICAgICAgICBhbnN3ZXJlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFuc3dlcmVkO1xuICAgIH1cblxuICAgIHB1YmxpYyBxdWVzdGlvbnNBbnN3ZXJlZChub2RlOiBhbnksIGFuc3dlcmVkPzogYm9vbGVhbltdKSB7XG4gICAgICAgIGNvbnN0ICRhbnN3ZXJlZCA9IGFuc3dlcmVkIHx8IFtdO1xuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZScpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc0Fuc3dlcmVkKGNoaWxkTm9kZSwgJGFuc3dlcmVkKTsgfSk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgICAgICAgICAgICBfLmZvckVhY2goY2hpbGROb2RlLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5zID0gdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZCwgJGFuc3dlcmVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFucykgeyAkYW5zd2VyZWQucHVzaChhbnMpOyB9XG4gICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0Fuc3dlcihjaGlsZE5vZGUpKSB7ICRhbnN3ZXJlZC5wdXNoKHRydWUpOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHRoaXMuaGFzQW5zd2VyKG5vZGUpOyB9XG5cbiAgICAgICAgaWYgKCRhbnN3ZXJlZC5sZW5ndGggPiAwKSB7cmV0dXJuIHRydWU7IH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxuICAgIH1cblxuXG4gICAgcHVibGljIGlzRGF0ZSh2YWw6IGFueSkge1xuICAgICAgICBpZiAoRGF0ZS5wYXJzZSh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY29udmVydFRpbWUodW5peFRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGEgPSBuZXcgRGF0ZSh1bml4VGltZXN0YW1wKTtcbiAgICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcbiAgICAgICAgY29uc3QgeWVhciA9IGEuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgY29uc3QgbW9udGggPSBtb250aHNbYS5nZXRNb250aCgpXTtcbiAgICAgICAgY29uc3QgZGF0ZSA9IGEuZ2V0RGF0ZSgpO1xuICAgICAgICBjb25zdCBob3VyID0gYS5nZXRIb3VycygpO1xuICAgICAgICBjb25zdCBtaW4gPSBhLmdldE1pbnV0ZXMoKTtcbiAgICAgICAgY29uc3Qgc2VjID0gYS5nZXRTZWNvbmRzKCk7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IGhvdXIgPCAxMiA/ICdBTScgOiAnUE0nO1xuICAgICAgICBsZXQgdGltZTtcbiAgICAgICAgaWYgKGhvdXIgPT09IDAgJiYgbWluID09PSAwKSB7XG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpbWUgPSBkYXRlICsgJyAnICsgbW9udGggKyAnICcgKyB5ZWFyICsgJyAnICsgaG91ciArICc6JyArIG1pbiArIHN1ZmZpeCArICcgKEVBVCknO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aW1lO1xuXG4gICAgfVxufVxuIl19