/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            _.forEach(schema.pages, (/**
             * @param {?} page
             * @return {?}
             */
            function (page) {
                /** @type {?} */
                var l = _this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            }));
        }
        if (schema.sections) {
            _.forEach(schema.sections, (/**
             * @param {?} section
             * @return {?}
             */
            function (section) {
                /** @type {?} */
                var l = _this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            }));
        }
        if (schema.questions) {
            _.forEach(schema.questions, (/**
             * @param {?} question
             * @return {?}
             */
            function (question) {
                if (question.questions) {
                    /** @type {?} */
                    var l = _this.resolveSelectedValueFromSchema(answerUuid, question);
                    if (l) {
                        label = l;
                    }
                }
                else {
                    if (question.questionOptions.answers) {
                        _.forEach(question.questionOptions.answers, (/**
                         * @param {?} answer
                         * @return {?}
                         */
                        function (answer) {
                            if (answer.concept === answerUuid) {
                                label = answer.label;
                            }
                        }));
                    }
                    else if (question.questionOptions.selectableOrders) {
                        _.forEach(question.questionOptions.selectableOrders, (/**
                         * @param {?} order
                         * @return {?}
                         */
                        function (order) {
                            if (order.concept === answerUuid) {
                                label = order.label;
                            }
                        }));
                    }
                }
            }));
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
            _.forEach(node.children, (/**
             * @param {?} childNode
             * @return {?}
             */
            function (childNode) {
                _this.questionsAnswered(childNode, $answered);
            }));
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, (/**
             * @param {?} childNode
             * @return {?}
             */
            function (childNode) {
                if (childNode.question.renderingType === 'group') {
                    _.forEach(childNode.children, (/**
                     * @param {?} child
                     * @return {?}
                     */
                    function (child) {
                        /** @type {?} */
                        var ans = _this.questionsAnswered(child, $answered);
                        if (ans) {
                            $answered.push(ans);
                        }
                    }));
                }
                else if (_this.hasAnswer(childNode)) {
                    $answered.push(true);
                }
            }));
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
        { type: Injectable },
    ];
    EncounterViewerService.ctorParameters = function () { return []; };
    return EncounterViewerService;
}());
export { EncounterViewerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O0lBSXRCLEtBQUssR0FBRyxJQUFJOztJQUNaLE9BQU8sR0FBRyxJQUFJO0FBRXBCO0lBR0k7SUFBZSxDQUFDOzs7OztJQUNULHFEQUFvQjs7OztJQUEzQixVQUE0QixLQUFVO1FBQ2xDLE1BQU0sQ0FBQztJQUNYLENBQUM7Ozs7O0lBQ00sOENBQWE7Ozs7SUFBcEIsVUFBcUIsVUFBZTtRQUNoQyxNQUFNLENBQUM7SUFDWCxDQUFDOzs7OztJQUNNLDJDQUFVOzs7O0lBQWpCLFVBQWtCLElBQVM7UUFDdkIsTUFBTSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFDTSwwQ0FBUzs7OztJQUFoQixVQUFpQixHQUFRO1FBQ3JCLE1BQU0sQ0FBQztJQUNYLENBQUM7Ozs7OztJQUVNLCtEQUE4Qjs7Ozs7SUFBckMsVUFBdUMsVUFBa0IsRUFBRSxNQUFXO1FBQXRFLGlCQXVDQzs7WUF0Q08sS0FBSztRQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSzs7OztZQUFFLFVBQUMsSUFBSTs7b0JBQ3JCLENBQUMsR0FBRyxLQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztnQkFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFD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QUFHLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDeEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFaEIsQ0FBQzs7Z0JBakhKLFVBQVU7OztJQWtIWCw2QkFBQztDQUFBLEFBbEhELElBa0hDO1NBakhZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgR3JvdXBOb2RlLCBMZWFmTm9kZSwgQXJyYXlOb2RlLCBOb2RlQmFzZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcclxuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvc2VsZWN0LW9wdGlvbic7XHJcbmNvbnN0IGNvbW1hID0gJywgJztcclxuY29uc3QgbmV3TGluZSA9ICdcXG4nO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgRW5jb3VudGVyVmlld2VyU2VydmljZSBpbXBsZW1lbnRzIERhdGFTb3VyY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge31cclxuICAgIHB1YmxpYyByZXNvbHZlU2VsZWN0ZWRWYWx1ZSh2YWx1ZTogYW55KTogT2JzZXJ2YWJsZTxTZWxlY3RPcHRpb24+IHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0OiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbltdPiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZpbGVVcGxvYWQoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmV0Y2hGaWxlKHVybDogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSggYW5zd2VyVXVpZDogc3RyaW5nLCBzY2hlbWE6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGxhYmVsO1xyXG4gICAgICAgIGlmIChzY2hlbWEucGFnZXMpIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5wYWdlcywgKHBhZ2UpID0+IHtcclxuICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcGFnZSk7XHJcbiAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XHJcbiAgICAgICAgICAgIH0pOyB9XHJcblxyXG4gICAgICAgIGlmIChzY2hlbWEuc2VjdGlvbnMpIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5zZWN0aW9ucywgKHNlY3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBzZWN0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25zKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEucXVlc3Rpb25zLCAocXVlc3Rpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHF1ZXN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLCAoYW5zd2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbnN3ZXIuY29uY2VwdCA9PT0gYW5zd2VyVXVpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBhbnN3ZXIubGFiZWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMsIChvcmRlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3JkZXIuY29uY2VwdCA9PT0gYW5zd2VyVXVpZCkgeyBsYWJlbCA9IG9yZGVyLmxhYmVsOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhYmVsO1xyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhc0Fuc3dlcihub2RlOiBOb2RlQmFzZSkge1xyXG4gICAgICAgIGxldCBhbnN3ZXJlZCA9IGZhbHNlO1xyXG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xyXG4gICAgICAgICAgICBhbnN3ZXJlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhbnN3ZXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55LCBhbnN3ZXJlZD86IGJvb2xlYW5bXSkge1xyXG4gICAgICAgIGNvbnN0ICRhbnN3ZXJlZCA9IGFuc3dlcmVkIHx8IFtdO1xyXG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xyXG4gICAgICAgICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZTogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc0Fuc3dlcmVkKGNoaWxkTm9kZSwgJGFuc3dlcmVkKTsgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2dyb3VwJykge1xyXG4gICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGNoaWxkTm9kZS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5zID0gdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZCwgJGFuc3dlcmVkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zKSB7ICRhbnN3ZXJlZC5wdXNoKGFucyk7IH1cclxuICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0Fuc3dlcihjaGlsZE5vZGUpKSB7ICRhbnN3ZXJlZC5wdXNoKHRydWUpOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7IHJldHVybiB0aGlzLmhhc0Fuc3dlcihub2RlKTsgfVxyXG5cclxuICAgICAgICBpZiAoJGFuc3dlcmVkLmxlbmd0aCA+IDApIHtyZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBpc0RhdGUodmFsOiBhbnkpIHtcclxuICAgICAgICBpZiAoRGF0ZS5wYXJzZSh2YWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29udmVydFRpbWUodW5peFRpbWVzdGFtcDogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgYSA9IG5ldyBEYXRlKHVuaXhUaW1lc3RhbXApO1xyXG4gICAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcclxuICAgICAgICBjb25zdCB5ZWFyID0gYS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGNvbnN0IG1vbnRoID0gbW9udGhzW2EuZ2V0TW9udGgoKV07XHJcbiAgICAgICAgY29uc3QgZGF0ZSA9IGEuZ2V0RGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IGhvdXIgPSBhLmdldEhvdXJzKCk7XHJcbiAgICAgICAgY29uc3QgbWluID0gYS5nZXRNaW51dGVzKCk7XHJcbiAgICAgICAgY29uc3Qgc2VjID0gYS5nZXRTZWNvbmRzKCk7XHJcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gaG91ciA8IDEyID8gJ0FNJyA6ICdQTSc7XHJcbiAgICAgICAgbGV0IHRpbWU7XHJcbiAgICAgICAgaWYgKGhvdXIgPT09IDAgJiYgbWluID09PSAwKSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBkYXRlICsgJyAnICsgbW9udGggKyAnICcgKyB5ZWFyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRpbWUgPSBkYXRlICsgJyAnICsgbW9udGggKyAnICcgKyB5ZWFyICsgJyAnICsgaG91ciArICc6JyArIG1pbiArIHN1ZmZpeCArICcgKEVBVCknO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZTtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19