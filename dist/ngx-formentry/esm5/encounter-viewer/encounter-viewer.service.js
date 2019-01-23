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
        { type: Injectable },
    ];
    EncounterViewerService.ctorParameters = function () { return []; };
    return EncounterViewerService;
}());
export { EncounterViewerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O0lBSXRCLEtBQUssR0FBRyxJQUFJOztJQUNaLE9BQU8sR0FBRyxJQUFJO0FBRXBCO0lBR0k7SUFBZSxDQUFDOzs7OztJQUNULHFEQUFvQjs7OztJQUEzQixVQUE0QixLQUFVO1FBQ2xDLE1BQU0sQ0FBQztJQUNYLENBQUM7Ozs7O0lBQ00sOENBQWE7Ozs7SUFBcEIsVUFBcUIsVUFBZTtRQUNoQyxNQUFNLENBQUM7SUFDWCxDQUFDOzs7OztJQUNNLDJDQUFVOzs7O0lBQWpCLFVBQWtCLElBQVM7UUFDdkIsTUFBTSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFDTSwwQ0FBUzs7OztJQUFoQixVQUFpQixHQUFRO1FBQ3JCLE1BQU0sQ0FBQztJQUNYLENBQUM7Ozs7OztJQUVNLCtEQUE4Qjs7Ozs7SUFBckMsVUFBdUMsVUFBa0IsRUFBRSxNQUFXO1FBQXRFLGlCQXVDQzs7WUF0Q08sS0FBSztRQUNULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTs7b0JBQ3JCLENBQUMsR0FBRyxLQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztnQkFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDdkIsQ0FBQyxDQUFDLENB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RyxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7UUFDeEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFaEIsQ0FBQzs7Z0JBakhKLFVBQVU7OztJQWtIWCw2QkFBQztDQUFBLEFBbEhELElBa0hDO1NBakhZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSwgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9zZWxlY3Qtb3B0aW9uJztcbmNvbnN0IGNvbW1hID0gJywgJztcbmNvbnN0IG5ld0xpbmUgPSAnXFxuJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlclNlcnZpY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWU6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uPiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHVibGljIHNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dDogYW55KTogT2JzZXJ2YWJsZTxTZWxlY3RPcHRpb25bXT4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHB1YmxpYyBmaWxlVXBsb2FkKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHVibGljIGZldGNoRmlsZSh1cmw6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKCBhbnN3ZXJVdWlkOiBzdHJpbmcsIHNjaGVtYTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICBpZiAoc2NoZW1hLnBhZ2VzKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnBhZ2VzLCAocGFnZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcGFnZSk7XG4gICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxuICAgICAgICAgICAgfSk7IH1cblxuICAgICAgICBpZiAoc2NoZW1hLnNlY3Rpb25zKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBzZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEucXVlc3Rpb25zLCAocXVlc3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcXVlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLCAoYW5zd2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGFuc3dlci5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycykge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMsIChvcmRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHsgbGFiZWwgPSBvcmRlci5sYWJlbDsgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFiZWw7XG5cblxuICAgIH1cblxuICAgIHB1YmxpYyBoYXNBbnN3ZXIobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgbGV0IGFuc3dlcmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgYW5zd2VyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbnN3ZXJlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55LCBhbnN3ZXJlZD86IGJvb2xlYW5bXSkge1xuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSBhbnN3ZXJlZCB8fCBbXTtcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZE5vZGUsICRhbnN3ZXJlZCk7IH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGNoaWxkTm9kZS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFucyA9IHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGQsICRhbnN3ZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChhbnMpIHsgJGFuc3dlcmVkLnB1c2goYW5zKTsgfVxuICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbnN3ZXIoY2hpbGROb2RlKSkgeyAkYW5zd2VyZWQucHVzaCh0cnVlKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IHJldHVybiB0aGlzLmhhc0Fuc3dlcihub2RlKTsgfVxuXG4gICAgICAgIGlmICgkYW5zd2VyZWQubGVuZ3RoID4gMCkge3JldHVybiB0cnVlOyB9IGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICAgICAgaWYgKERhdGUucGFyc2UodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNvbnZlcnRUaW1lKHVuaXhUaW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gbmV3IERhdGUodW5peFRpbWVzdGFtcCk7XG4gICAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG4gICAgICAgIGNvbnN0IHllYXIgPSBhLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gbW9udGhzW2EuZ2V0TW9udGgoKV07XG4gICAgICAgIGNvbnN0IGRhdGUgPSBhLmdldERhdGUoKTtcbiAgICAgICAgY29uc3QgaG91ciA9IGEuZ2V0SG91cnMoKTtcbiAgICAgICAgY29uc3QgbWluID0gYS5nZXRNaW51dGVzKCk7XG4gICAgICAgIGNvbnN0IHNlYyA9IGEuZ2V0U2Vjb25kcygpO1xuICAgICAgICBjb25zdCBzdWZmaXggPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcbiAgICAgICAgbGV0IHRpbWU7XG4gICAgICAgIGlmIChob3VyID09PSAwICYmIG1pbiA9PT0gMCkge1xuICAgICAgICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhciArICcgJyArIGhvdXIgKyAnOicgKyBtaW4gKyBzdWZmaXggKyAnIChFQVQpJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZTtcblxuICAgIH1cbn1cbiJdfQ==