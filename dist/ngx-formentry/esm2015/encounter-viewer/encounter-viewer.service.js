/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
/** @type {?} */
const comma = ', ';
/** @type {?} */
const newLine = '\n';
export class EncounterViewerService {
    constructor() { }
    /**
     * @param {?} value
     * @return {?}
     */
    resolveSelectedValue(value) {
        return;
    }
    /**
     * @param {?} searchText
     * @return {?}
     */
    searchOptions(searchText) {
        return;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    fileUpload(data) {
        return;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    fetchFile(url) {
        return;
    }
    /**
     * @param {?} answerUuid
     * @param {?} schema
     * @return {?}
     */
    resolveSelectedValueFromSchema(answerUuid, schema) {
        /** @type {?} */
        let label;
        if (schema.pages) {
            _.forEach(schema.pages, (/**
             * @param {?} page
             * @return {?}
             */
            (page) => {
                /** @type {?} */
                const l = this.resolveSelectedValueFromSchema(answerUuid, page);
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
            (section) => {
                /** @type {?} */
                const l = this.resolveSelectedValueFromSchema(answerUuid, section);
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
            (question) => {
                if (question.questions) {
                    /** @type {?} */
                    const l = this.resolveSelectedValueFromSchema(answerUuid, question);
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
                        (answer) => {
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
                        (order) => {
                            if (order.concept === answerUuid) {
                                label = order.label;
                            }
                        }));
                    }
                }
            }));
        }
        return label;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    hasAnswer(node) {
        /** @type {?} */
        let answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    }
    /**
     * @param {?} node
     * @param {?=} answered
     * @return {?}
     */
    questionsAnswered(node, answered) {
        /** @type {?} */
        const $answered = answered || [];
        if (node.question.renderingType === 'page') {
            _.forEach(node.children, (/**
             * @param {?} childNode
             * @return {?}
             */
            (childNode) => {
                this.questionsAnswered(childNode, $answered);
            }));
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, (/**
             * @param {?} childNode
             * @return {?}
             */
            (childNode) => {
                if (childNode.question.renderingType === 'group') {
                    _.forEach(childNode.children, (/**
                     * @param {?} child
                     * @return {?}
                     */
                    (child) => {
                        /** @type {?} */
                        const ans = this.questionsAnswered(child, $answered);
                        if (ans) {
                            $answered.push(ans);
                        }
                    }));
                }
                else if (this.hasAnswer(childNode)) {
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
    }
    /**
     * @param {?} val
     * @return {?}
     */
    isDate(val) {
        if (Date.parse(val)) {
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * @param {?} unixTimestamp
     * @return {?}
     */
    convertTime(unixTimestamp) {
        /** @type {?} */
        const a = new Date(unixTimestamp);
        /** @type {?} */
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        /** @type {?} */
        const year = a.getFullYear();
        /** @type {?} */
        const month = months[a.getMonth()];
        /** @type {?} */
        const date = a.getDate();
        /** @type {?} */
        const hour = a.getHours();
        /** @type {?} */
        const min = a.getMinutes();
        /** @type {?} */
        const sec = a.getSeconds();
        /** @type {?} */
        const suffix = hour < 12 ? 'AM' : 'PM';
        /** @type {?} */
        let time;
        if (hour === 0 && min === 0) {
            time = date + ' ' + month + ' ' + year;
        }
        else {
            time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + suffix + ' (EAT)';
        }
        return time;
    }
}
EncounterViewerService.decorators = [
    { type: Injectable },
];
EncounterViewerService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O01BSXRCLEtBQUssR0FBRyxJQUFJOztNQUNaLE9BQU8sR0FBRyxJQUFJO0FBR3BCLE1BQU07SUFFRixnQkFBZSxDQUFDOzs7OztJQUNULG9CQUFvQixDQUFDLEtBQVU7UUFDbEMsTUFBTSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFDTSxhQUFhLENBQUMsVUFBZTtRQUNoQyxNQUFNLENBQUM7SUFDWCxDQUFDOzs7OztJQUNNLFVBQVUsQ0FBQyxJQUFTO1FBQ3ZCLE1BQU0sQ0FBQztJQUNYLENBQUM7Ozs7O0lBQ00sU0FBUyxDQUFDLEdBQVE7UUFDckIsTUFBTSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7O0lBRU0sOEJBQThCLENBQUUsVUFBa0IsRUFBRSxNQUFXOztZQUM5RCxLQUFLO1FBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7c0JBQ3pCLENBQUMsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztnQkFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7UUFBQyxDQUFDO1FBRVQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEs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QU0sR0FBRyxRQUFRLENBQUM7UUFDeEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFaEIsQ0FBQzs7O1lBakhKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSwgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBTZWxlY3RPcHRpb24gfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL3NlbGVjdC1vcHRpb24nO1xyXG5jb25zdCBjb21tYSA9ICcsICc7XHJcbmNvbnN0IG5ld0xpbmUgPSAnXFxuJztcclxuXHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlclNlcnZpY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHt9XHJcbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWU6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uPiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dDogYW55KTogT2JzZXJ2YWJsZTxTZWxlY3RPcHRpb25bXT4ge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmaWxlVXBsb2FkKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZldGNoRmlsZSh1cmw6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoIGFuc3dlclV1aWQ6IHN0cmluZywgc2NoZW1hOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBsYWJlbDtcclxuICAgICAgICBpZiAoc2NoZW1hLnBhZ2VzKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHBhZ2UpO1xyXG4gICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxyXG4gICAgICAgICAgICB9KTsgfVxyXG5cclxuICAgICAgICBpZiAoc2NoZW1hLnNlY3Rpb25zKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEuc2VjdGlvbnMsIChzZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgc2VjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoc2NoZW1hLnF1ZXN0aW9ucykge1xyXG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBxdWVzdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycykge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2VycywgKGFuc3dlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsID0gYW5zd2VyLmxhYmVsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzLCAob3JkZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHsgbGFiZWwgPSBvcmRlci5sYWJlbDsgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsYWJlbDtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNBbnN3ZXIobm9kZTogTm9kZUJhc2UpIHtcclxuICAgICAgICBsZXQgYW5zd2VyZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcclxuICAgICAgICAgICAgYW5zd2VyZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSwgYW5zd2VyZWQ/OiBib29sZWFuW10pIHtcclxuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSBhbnN3ZXJlZCB8fCBbXTtcclxuICAgICAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZScpIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGU6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZE5vZGUsICRhbnN3ZXJlZCk7IH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcpIHtcclxuICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChjaGlsZE5vZGUuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFucyA9IHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGQsICRhbnN3ZXJlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFucykgeyAkYW5zd2VyZWQucHVzaChhbnMpOyB9XHJcbiAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbnN3ZXIoY2hpbGROb2RlKSkgeyAkYW5zd2VyZWQucHVzaCh0cnVlKTsgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5oYXNBbnN3ZXIobm9kZSk7IH1cclxuXHJcbiAgICAgICAgaWYgKCRhbnN3ZXJlZC5sZW5ndGggPiAwKSB7cmV0dXJuIHRydWU7IH0gZWxzZSB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgaXNEYXRlKHZhbDogYW55KSB7XHJcbiAgICAgICAgaWYgKERhdGUucGFyc2UodmFsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbnZlcnRUaW1lKHVuaXhUaW1lc3RhbXA6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IGEgPSBuZXcgRGF0ZSh1bml4VGltZXN0YW1wKTtcclxuICAgICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XHJcbiAgICAgICAgY29uc3QgeWVhciA9IGEuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBjb25zdCBtb250aCA9IG1vbnRoc1thLmdldE1vbnRoKCldO1xyXG4gICAgICAgIGNvbnN0IGRhdGUgPSBhLmdldERhdGUoKTtcclxuICAgICAgICBjb25zdCBob3VyID0gYS5nZXRIb3VycygpO1xyXG4gICAgICAgIGNvbnN0IG1pbiA9IGEuZ2V0TWludXRlcygpO1xyXG4gICAgICAgIGNvbnN0IHNlYyA9IGEuZ2V0U2Vjb25kcygpO1xyXG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IGhvdXIgPCAxMiA/ICdBTScgOiAnUE0nO1xyXG4gICAgICAgIGxldCB0aW1lO1xyXG4gICAgICAgIGlmIChob3VyID09PSAwICYmIG1pbiA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhciArICcgJyArIGhvdXIgKyAnOicgKyBtaW4gKyBzdWZmaXggKyAnIChFQVQpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbWU7XHJcblxyXG4gICAgfVxyXG59XHJcbiJdfQ==