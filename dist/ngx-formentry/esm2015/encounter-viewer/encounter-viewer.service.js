/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
const /** @type {?} */ comma = ', ';
const /** @type {?} */ newLine = '\n';
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
        let /** @type {?} */ label;
        if (schema.pages) {
            _.forEach(schema.pages, (page) => {
                const /** @type {?} */ l = this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, (section) => {
                const /** @type {?} */ l = this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, (question) => {
                if (question.questions) {
                    const /** @type {?} */ l = this.resolveSelectedValueFromSchema(answerUuid, question);
                    if (l) {
                        label = l;
                    }
                }
                else {
                    if (question.questionOptions.answers) {
                        _.forEach(question.questionOptions.answers, (answer) => {
                            if (answer.concept === answerUuid) {
                                label = answer.label;
                            }
                        });
                    }
                    else if (question.questionOptions.selectableOrders) {
                        _.forEach(question.questionOptions.selectableOrders, (order) => {
                            if (order.concept === answerUuid) {
                                label = order.label;
                            }
                        });
                    }
                }
            });
        }
        return label;
    }
    /**
     * @param {?} node
     * @return {?}
     */
    hasAnswer(node) {
        let /** @type {?} */ answered = false;
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
        const /** @type {?} */ $answered = answered || [];
        if (node.question.renderingType === 'page') {
            _.forEach(node.children, (childNode) => {
                this.questionsAnswered(childNode, $answered);
            });
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, (childNode) => {
                if (childNode.question.renderingType === 'group') {
                    _.forEach(childNode.children, (child) => {
                        const /** @type {?} */ ans = this.questionsAnswered(child, $answered);
                        if (ans) {
                            $answered.push(ans);
                        }
                    });
                }
                else if (this.hasAnswer(childNode)) {
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
        const /** @type {?} */ a = new Date(unixTimestamp);
        const /** @type {?} */ months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const /** @type {?} */ year = a.getFullYear();
        const /** @type {?} */ month = months[a.getMonth()];
        const /** @type {?} */ date = a.getDate();
        const /** @type {?} */ hour = a.getHours();
        const /** @type {?} */ min = a.getMinutes();
        const /** @type {?} */ sec = a.getSeconds();
        const /** @type {?} */ suffix = hour < 12 ? 'AM' : 'PM';
        let /** @type {?} */ time;
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
/** @nocollapse */
EncounterViewerService.ctorParameters = () => [];
function EncounterViewerService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    EncounterViewerService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    EncounterViewerService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7QUFJNUIsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQix1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBR3JCLE1BQU07SUFFRixpQkFBZ0I7Ozs7O0lBQ1Qsb0JBQW9CLENBQUMsS0FBVTtRQUNsQyxNQUFNLENBQUM7Ozs7OztJQUVKLGFBQWEsQ0FBQyxVQUFlO1FBQ2hDLE1BQU0sQ0FBQzs7Ozs7O0lBRUosVUFBVSxDQUFDLElBQVM7UUFDdkIsTUFBTSxDQUFDOzs7Ozs7SUFFSixTQUFTLENBQUMsR0FBUTtRQUNyQixNQUFNLENBQUM7Ozs7Ozs7SUFHSiw4QkFBOEIsQ0FBRSxVQUFrQixFQUFFLE1BQVc7UUFDbEUscUJBQUksS0FBSyxDQUFDO1FBQ1YsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDL0IsdUJBQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFBRTthQUN0QixDQUFDLENBQUM7U0FBRTtRQUVULEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lB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bnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUsIE5vZGVCYXNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xyXG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9kYXRhLXNvdXJjZSc7XHJcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9zZWxlY3Qtb3B0aW9uJztcclxuY29uc3QgY29tbWEgPSAnLCAnO1xyXG5jb25zdCBuZXdMaW5lID0gJ1xcbic7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7fVxyXG4gICAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlOiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbj4ge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZWFyY2hPcHRpb25zKHNlYXJjaFRleHQ6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uW10+IHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmlsZVVwbG9hZChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmZXRjaEZpbGUodXJsOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKCBhbnN3ZXJVdWlkOiBzdHJpbmcsIHNjaGVtYTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgbGFiZWw7XHJcbiAgICAgICAgaWYgKHNjaGVtYS5wYWdlcykge1xyXG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnBhZ2VzLCAocGFnZSkgPT4ge1xyXG4gICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBwYWdlKTtcclxuICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cclxuICAgICAgICAgICAgfSk7IH1cclxuXHJcbiAgICAgICAgaWYgKHNjaGVtYS5zZWN0aW9ucykge1xyXG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHNlY3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbnMpIHtcclxuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5xdWVzdGlvbnMsIChxdWVzdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcXVlc3Rpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMsIChhbnN3ZXIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuc3dlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGFuc3dlci5sYWJlbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycywgKG9yZGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7IGxhYmVsID0gb3JkZXIubGFiZWw7IH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbGFiZWw7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzQW5zd2VyKG5vZGU6IE5vZGVCYXNlKSB7XHJcbiAgICAgICAgbGV0IGFuc3dlcmVkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG5vZGUuaW5pdGlhbFZhbHVlKSB7XHJcbiAgICAgICAgICAgIGFuc3dlcmVkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFuc3dlcmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBxdWVzdGlvbnNBbnN3ZXJlZChub2RlOiBhbnksIGFuc3dlcmVkPzogYm9vbGVhbltdKSB7XHJcbiAgICAgICAgY29uc3QgJGFuc3dlcmVkID0gYW5zd2VyZWQgfHwgW107XHJcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XHJcbiAgICAgICAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlOiBhbnkpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGROb2RlLCAkYW5zd2VyZWQpOyB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdzZWN0aW9uJykge1xyXG4gICAgICAgICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZ3JvdXAnKSB7XHJcbiAgICAgICAgICAgICAgICAgICBfLmZvckVhY2goY2hpbGROb2RlLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbnMgPSB0aGlzLnF1ZXN0aW9uc0Fuc3dlcmVkKGNoaWxkLCAkYW5zd2VyZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChhbnMpIHsgJGFuc3dlcmVkLnB1c2goYW5zKTsgfVxyXG4gICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQW5zd2VyKGNoaWxkTm9kZSkpIHsgJGFuc3dlcmVkLnB1c2godHJ1ZSk7IH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHsgcmV0dXJuIHRoaXMuaGFzQW5zd2VyKG5vZGUpOyB9XHJcblxyXG4gICAgICAgIGlmICgkYW5zd2VyZWQubGVuZ3RoID4gMCkge3JldHVybiB0cnVlOyB9IGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIGlzRGF0ZSh2YWw6IGFueSkge1xyXG4gICAgICAgIGlmIChEYXRlLnBhcnNlKHZhbCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjb252ZXJ0VGltZSh1bml4VGltZXN0YW1wOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBhID0gbmV3IERhdGUodW5peFRpbWVzdGFtcCk7XHJcbiAgICAgICAgY29uc3QgbW9udGhzID0gWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xyXG4gICAgICAgIGNvbnN0IHllYXIgPSBhLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgY29uc3QgbW9udGggPSBtb250aHNbYS5nZXRNb250aCgpXTtcclxuICAgICAgICBjb25zdCBkYXRlID0gYS5nZXREYXRlKCk7XHJcbiAgICAgICAgY29uc3QgaG91ciA9IGEuZ2V0SG91cnMoKTtcclxuICAgICAgICBjb25zdCBtaW4gPSBhLmdldE1pbnV0ZXMoKTtcclxuICAgICAgICBjb25zdCBzZWMgPSBhLmdldFNlY29uZHMoKTtcclxuICAgICAgICBjb25zdCBzdWZmaXggPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcclxuICAgICAgICBsZXQgdGltZTtcclxuICAgICAgICBpZiAoaG91ciA9PT0gMCAmJiBtaW4gPT09IDApIHtcclxuICAgICAgICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXIgKyAnICcgKyBob3VyICsgJzonICsgbWluICsgc3VmZml4ICsgJyAoRUFUKSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aW1lO1xyXG5cclxuICAgIH1cclxufVxyXG4iXX0=