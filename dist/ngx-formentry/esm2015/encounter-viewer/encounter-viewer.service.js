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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O01BSXRCLEtBQUssR0FBRyxJQUFJOztNQUNaLE9BQU8sR0FBRyxJQUFJO0FBR3BCLE1BQU07SUFFRixnQkFBZSxDQUFDOzs7OztJQUNULG9CQUFvQixDQUFDLEtBQVU7UUFDbEMsTUFBTSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7SUFDTSxhQUFhLENBQUMsVUFBZTtRQUNoQyxNQUFNLENBQUM7SUFDWCxDQUFDOzs7OztJQUNNLFVBQVUsQ0FBQyxJQUFTO1FBQ3ZCLE1BQU0sQ0FBQztJQUNYLENBQUM7Ozs7O0lBQ00sU0FBUyxDQUFDLEdBQVE7UUFDckIsTUFBTSxDQUFDO0lBQ1gsQ0FBQzs7Ozs7O0lBRU0sOEJBQThCLENBQUUsVUFBa0IsRUFBRSxNQUFXOztZQUM5RCxLQUFLO1FBQ1QsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLOzs7O1lBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7c0JBQ3pCLENBQUMsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztnQkFDL0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDdkIsQ0FBQyxFQUFDLENBQUM7UUFBQyxDQUFDO1FBRVQsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEs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QU0sR0FBRyxRQUFRLENBQUM7UUFDeEYsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFFaEIsQ0FBQzs7O1lBakhKLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUsIE5vZGVCYXNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvc2VsZWN0LW9wdGlvbic7XG5jb25zdCBjb21tYSA9ICcsICc7XG5jb25zdCBuZXdMaW5lID0gJ1xcbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlOiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbj4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHB1YmxpYyBzZWFyY2hPcHRpb25zKHNlYXJjaFRleHQ6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uW10+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwdWJsaWMgZmlsZVVwbG9hZChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHB1YmxpYyBmZXRjaEZpbGUodXJsOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSggYW5zd2VyVXVpZDogc3RyaW5nLCBzY2hlbWE6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgaWYgKHNjaGVtYS5wYWdlcykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5wYWdlcywgKHBhZ2UpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHBhZ2UpO1xuICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cbiAgICAgICAgICAgIH0pOyB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5zZWN0aW9ucykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5zZWN0aW9ucywgKHNlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25zKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHF1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2VycywgKGFuc3dlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuc3dlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBhbnN3ZXIubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzLCAob3JkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7IGxhYmVsID0gb3JkZXIubGFiZWw7IH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzQW5zd2VyKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGxldCBhbnN3ZXJlZCA9IGZhbHNlO1xuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGFuc3dlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSwgYW5zd2VyZWQ/OiBib29sZWFuW10pIHtcbiAgICAgICAgY29uc3QgJGFuc3dlcmVkID0gYW5zd2VyZWQgfHwgW107XG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGROb2RlLCAkYW5zd2VyZWQpOyB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICAgICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChjaGlsZE5vZGUuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbnMgPSB0aGlzLnF1ZXN0aW9uc0Fuc3dlcmVkKGNoaWxkLCAkYW5zd2VyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zKSB7ICRhbnN3ZXJlZC5wdXNoKGFucyk7IH1cbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQW5zd2VyKGNoaWxkTm9kZSkpIHsgJGFuc3dlcmVkLnB1c2godHJ1ZSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5oYXNBbnN3ZXIobm9kZSk7IH1cblxuICAgICAgICBpZiAoJGFuc3dlcmVkLmxlbmd0aCA+IDApIHtyZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaXNEYXRlKHZhbDogYW55KSB7XG4gICAgICAgIGlmIChEYXRlLnBhcnNlKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBjb252ZXJ0VGltZSh1bml4VGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IG5ldyBEYXRlKHVuaXhUaW1lc3RhbXApO1xuICAgICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuICAgICAgICBjb25zdCB5ZWFyID0gYS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBjb25zdCBtb250aCA9IG1vbnRoc1thLmdldE1vbnRoKCldO1xuICAgICAgICBjb25zdCBkYXRlID0gYS5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IGhvdXIgPSBhLmdldEhvdXJzKCk7XG4gICAgICAgIGNvbnN0IG1pbiA9IGEuZ2V0TWludXRlcygpO1xuICAgICAgICBjb25zdCBzZWMgPSBhLmdldFNlY29uZHMoKTtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gaG91ciA8IDEyID8gJ0FNJyA6ICdQTSc7XG4gICAgICAgIGxldCB0aW1lO1xuICAgICAgICBpZiAoaG91ciA9PT0gMCAmJiBtaW4gPT09IDApIHtcbiAgICAgICAgICAgIHRpbWUgPSBkYXRlICsgJyAnICsgbW9udGggKyAnICcgKyB5ZWFyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXIgKyAnICcgKyBob3VyICsgJzonICsgbWluICsgc3VmZml4ICsgJyAoRUFUKSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWU7XG5cbiAgICB9XG59XG4iXX0=