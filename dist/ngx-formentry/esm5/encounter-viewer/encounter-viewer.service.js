/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var /** @type {?} */ comma = ', ';
var /** @type {?} */ newLine = '\n';
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
        var /** @type {?} */ label;
        if (schema.pages) {
            _.forEach(schema.pages, function (page) {
                var /** @type {?} */ l = _this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, function (section) {
                var /** @type {?} */ l = _this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, function (question) {
                if (question.questions) {
                    var /** @type {?} */ l = _this.resolveSelectedValueFromSchema(answerUuid, question);
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
        var /** @type {?} */ answered = false;
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
        var /** @type {?} */ $answered = answered || [];
        if (node.question.renderingType === 'page') {
            _.forEach(node.children, function (childNode) {
                _this.questionsAnswered(childNode, $answered);
            });
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, function (childNode) {
                if (childNode.question.renderingType === 'group') {
                    _.forEach(childNode.children, function (child) {
                        var /** @type {?} */ ans = _this.questionsAnswered(child, $answered);
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
        var /** @type {?} */ a = new Date(unixTimestamp);
        var /** @type {?} */ months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var /** @type {?} */ year = a.getFullYear();
        var /** @type {?} */ month = months[a.getMonth()];
        var /** @type {?} */ date = a.getDate();
        var /** @type {?} */ hour = a.getHours();
        var /** @type {?} */ min = a.getMinutes();
        var /** @type {?} */ sec = a.getSeconds();
        var /** @type {?} */ suffix = hour < 12 ? 'AM' : 'PM';
        var /** @type {?} */ time;
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
    /** @nocollapse */
    EncounterViewerService.ctorParameters = function () { return []; };
    return EncounterViewerService;
}());
export { EncounterViewerService };
function EncounterViewerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterViewerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterViewerService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFJNUIscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQixxQkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDOztJQUtqQjtLQUFnQjs7Ozs7SUFDVCxxREFBb0I7Ozs7Y0FBQyxLQUFVO1FBQ2xDLE1BQU0sQ0FBQzs7Ozs7O0lBRUosOENBQWE7Ozs7Y0FBQyxVQUFlO1FBQ2hDLE1BQU0sQ0FBQzs7Ozs7O0lBRUosMkNBQVU7Ozs7Y0FBQyxJQUFTO1FBQ3ZCLE1BQU0sQ0FBQzs7Ozs7O0lBRUosMENBQVM7Ozs7Y0FBQyxHQUFRO1FBQ3JCLE1BQU0sQ0FBQzs7Ozs7OztJQUdKLCtEQUE4Qjs7Ozs7Y0FBRSxVQUFrQixFQUFFLE1BQVc7O1FBQ2xFLHFCQUFJLEtBQUssQ0FBQztRQUNWLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFVBQUMsSUFBSTtnQkFDM0IscUJBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFBRTthQUN0QixDQUFDLENBQUM7U0FBRTtRQUVULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lB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ZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSwgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL3NlbGVjdC1vcHRpb24nO1xyXG5jb25zdCBjb21tYSA9ICcsICc7XHJcbmNvbnN0IG5ld0xpbmUgPSAnXFxuJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlclNlcnZpY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWU6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dDogYW55KTogT2JzZXJ2YWJsZTxTZWxlY3RPcHRpb25bXT4ge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmaWxlVXBsb2FkKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZldGNoRmlsZSh1cmw6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoIGFuc3dlclV1aWQ6IHN0cmluZywgc2NoZW1hOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBsYWJlbDtcclxuICAgICAgICBpZiAoc2NoZW1hLnBhZ2VzKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHBhZ2UpO1xyXG4gICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxyXG4gICAgICAgICAgICB9KTsgfVxyXG5cclxuICAgICAgICBpZiAoc2NoZW1hLnNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEuc2VjdGlvbnMsIChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgc2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NoZW1hLnF1ZXN0aW9ucykge1xyXG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBxdWVzdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2VycywgKGFuc3dlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gYW5zd2VyLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzLCAob3JkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHsgbGFiZWwgPSBvcmRlci5sYWJlbDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNBbnN3ZXIobm9kZTogTm9kZUJhc2UpIHtcclxuICAgICAgICBsZXQgYW5zd2VyZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcclxuICAgICAgICAgICAgYW5zd2VyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSwgYW5zd2VyZWQ/OiBib29sZWFuW10pIHtcclxuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSBhbnN3ZXJlZCB8fCBbXTtcclxuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZScpIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZE5vZGUsICRhbnN3ZXJlZCk7IH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcpIHtcclxuICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChjaGlsZE5vZGUuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFucyA9IHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGQsICRhbnN3ZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFucykgeyAkYW5zd2VyZWQucHVzaChhbnMpOyB9XHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbnN3ZXIoY2hpbGROb2RlKSkgeyAkYW5zd2VyZWQucHVzaCh0cnVlKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5oYXNBbnN3ZXIobm9kZSk7IH1cclxuXHJcbiAgICAgICAgaWYgKCRhbnN3ZXJlZC5sZW5ndGggPiAwKSB7cmV0dXJuIHRydWU7IH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaXNEYXRlKHZhbDogYW55KSB7XHJcbiAgICAgICAgaWYgKERhdGUucGFyc2UodmFsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbnZlcnRUaW1lKHVuaXhUaW1lc3RhbXA6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGEgPSBuZXcgRGF0ZSh1bml4VGltZXN0YW1wKTtcclxuICAgICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XHJcbiAgICAgICAgY29uc3QgeWVhciA9IGEuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBjb25zdCBtb250aCA9IG1vbnRoc1thLmdldE1vbnRoKCldO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBhLmdldERhdGUoKTtcclxuICAgICAgICBjb25zdCBob3VyID0gYS5nZXRIb3VycygpO1xyXG4gICAgICAgIGNvbnN0IG1pbiA9IGEuZ2V0TWludXRlcygpO1xyXG4gICAgICAgIGNvbnN0IHNlYyA9IGEuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IGhvdXIgPCAxMiA/ICdBTScgOiAnUE0nO1xyXG4gICAgICAgIGxldCB0aW1lO1xyXG4gICAgICAgIGlmIChob3VyID09PSAwICYmIG1pbiA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhciArICcgJyArIGhvdXIgKyAnOicgKyBtaW4gKyBzdWZmaXggKyAnIChFQVQpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbWU7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==