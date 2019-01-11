/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
            _.forEach(schema.pages, (page) => {
                /** @type {?} */
                const l = this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, (section) => {
                /** @type {?} */
                const l = this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, (question) => {
                if (question.questions) {
                    /** @type {?} */
                    const l = this.resolveSelectedValueFromSchema(answerUuid, question);
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
            _.forEach(node.children, (childNode) => {
                this.questionsAnswered(childNode, $answered);
            });
        }
        else if (node.question.renderingType === 'section') {
            _.forEach(node.children, (childNode) => {
                if (childNode.question.renderingType === 'group') {
                    _.forEach(childNode.children, (child) => {
                        /** @type {?} */
                        const ans = this.questionsAnswered(child, $answered);
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
    { type: Injectable }
];
/** @nocollapse */
EncounterViewerService.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxLQUFLLENBQUMsTUFBTSxRQUFRLENBQUM7O01BSXRCLEtBQUssR0FBRyxJQUFJOztNQUNaLE9BQU8sR0FBRyxJQUFJO0FBR3BCLE1BQU0sT0FBTyxzQkFBc0I7SUFFL0IsZ0JBQWUsQ0FBQzs7Ozs7SUFDVCxvQkFBb0IsQ0FBQyxLQUFVO1FBQ2xDLE9BQU87SUFDWCxDQUFDOzs7OztJQUNNLGFBQWEsQ0FBQyxVQUFlO1FBQ2hDLE9BQU87SUFDWCxDQUFDOzs7OztJQUNNLFVBQVUsQ0FBQyxJQUFTO1FBQ3ZCLE9BQU87SUFDWCxDQUFDOzs7OztJQUNNLFNBQVMsQ0FBQyxHQUFRO1FBQ3JCLE9BQU87SUFDWCxDQUFDOzs7Ozs7SUFFTSw4QkFBOEIsQ0FBRSxVQUFrQixFQUFFLE1BQVc7O1lBQzlELEtBQUs7UUFDVCxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDZCxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7c0JBQ3pCLENBQUMsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQztnQkFDL0QsSUFBSSxDQUFDLEVBQUU7b0JBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztpQkFBRTtZQUN2QixDQUFDLENBQUMsQ0FBQztTQUFFO1FBRVQsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2pCLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFF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R0FBRyxLQUFLLENBQUMsRUFBRTtZQUN6QixJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUMxQzthQUFNO1lBQ0gsSUFBSSxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7U0FDdkY7UUFDRCxPQUFPLElBQUksQ0FBQztJQUVoQixDQUFDOzs7WUFqSEosVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEdyb3VwTm9kZSwgTGVhZk5vZGUsIEFycmF5Tm9kZSwgTm9kZUJhc2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9zZWxlY3Qtb3B0aW9uJztcbmNvbnN0IGNvbW1hID0gJywgJztcbmNvbnN0IG5ld0xpbmUgPSAnXFxuJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlclNlcnZpY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge31cbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWU6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uPiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHVibGljIHNlYXJjaE9wdGlvbnMoc2VhcmNoVGV4dDogYW55KTogT2JzZXJ2YWJsZTxTZWxlY3RPcHRpb25bXT4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHB1YmxpYyBmaWxlVXBsb2FkKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcHVibGljIGZldGNoRmlsZSh1cmw6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKCBhbnN3ZXJVdWlkOiBzdHJpbmcsIHNjaGVtYTogYW55KTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGxhYmVsO1xuICAgICAgICBpZiAoc2NoZW1hLnBhZ2VzKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnBhZ2VzLCAocGFnZSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcGFnZSk7XG4gICAgICAgICAgICAgIGlmIChsKSB7IGxhYmVsID0gbDsgfVxuICAgICAgICAgICAgfSk7IH1cblxuICAgICAgICBpZiAoc2NoZW1hLnNlY3Rpb25zKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnNlY3Rpb25zLCAoc2VjdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBzZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChzY2hlbWEucXVlc3Rpb25zLCAocXVlc3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9ucykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcXVlc3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLCAoYW5zd2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zd2VyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbCA9IGFuc3dlci5sYWJlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycykge1xuICAgICAgICAgICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMsIChvcmRlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9yZGVyLmNvbmNlcHQgPT09IGFuc3dlclV1aWQpIHsgbGFiZWwgPSBvcmRlci5sYWJlbDsgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFiZWw7XG5cblxuICAgIH1cblxuICAgIHB1YmxpYyBoYXNBbnN3ZXIobm9kZTogTm9kZUJhc2UpIHtcbiAgICAgICAgbGV0IGFuc3dlcmVkID0gZmFsc2U7XG4gICAgICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgYW5zd2VyZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhbnN3ZXJlZDtcbiAgICB9XG5cbiAgICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55LCBhbnN3ZXJlZD86IGJvb2xlYW5bXSkge1xuICAgICAgICBjb25zdCAkYW5zd2VyZWQgPSBhbnN3ZXJlZCB8fCBbXTtcbiAgICAgICAgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3BhZ2UnKSB7XG4gICAgICAgICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZE5vZGUsICRhbnN3ZXJlZCk7IH0pO1xuXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnZ3JvdXAnKSB7XG4gICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKGNoaWxkTm9kZS5jaGlsZHJlbiwgKGNoaWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFucyA9IHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGQsICRhbnN3ZXJlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChhbnMpIHsgJGFuc3dlcmVkLnB1c2goYW5zKTsgfVxuICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbnN3ZXIoY2hpbGROb2RlKSkgeyAkYW5zd2VyZWQucHVzaCh0cnVlKTsgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IHJldHVybiB0aGlzLmhhc0Fuc3dlcihub2RlKTsgfVxuXG4gICAgICAgIGlmICgkYW5zd2VyZWQubGVuZ3RoID4gMCkge3JldHVybiB0cnVlOyB9IGVsc2UgeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9XG5cblxuICAgIHB1YmxpYyBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICAgICAgaWYgKERhdGUucGFyc2UodmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNvbnZlcnRUaW1lKHVuaXhUaW1lc3RhbXA6IG51bWJlcikge1xuICAgICAgICBjb25zdCBhID0gbmV3IERhdGUodW5peFRpbWVzdGFtcCk7XG4gICAgICAgIGNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ107XG4gICAgICAgIGNvbnN0IHllYXIgPSBhLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGNvbnN0IG1vbnRoID0gbW9udGhzW2EuZ2V0TW9udGgoKV07XG4gICAgICAgIGNvbnN0IGRhdGUgPSBhLmdldERhdGUoKTtcbiAgICAgICAgY29uc3QgaG91ciA9IGEuZ2V0SG91cnMoKTtcbiAgICAgICAgY29uc3QgbWluID0gYS5nZXRNaW51dGVzKCk7XG4gICAgICAgIGNvbnN0IHNlYyA9IGEuZ2V0U2Vjb25kcygpO1xuICAgICAgICBjb25zdCBzdWZmaXggPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcbiAgICAgICAgbGV0IHRpbWU7XG4gICAgICAgIGlmIChob3VyID09PSAwICYmIG1pbiA9PT0gMCkge1xuICAgICAgICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aW1lID0gZGF0ZSArICcgJyArIG1vbnRoICsgJyAnICsgeWVhciArICcgJyArIGhvdXIgKyAnOicgKyBtaW4gKyBzdWZmaXggKyAnIChFQVQpJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGltZTtcblxuICAgIH1cbn1cbiJdfQ==