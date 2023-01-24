import { Injectable } from '@angular/core';
import * as _ from 'lodash';
const comma = ', ';
const newLine = '\n';
export class EncounterViewerService {
    constructor() { }
    resolveSelectedValue(value) {
        return;
    }
    searchOptions(searchText) {
        return;
    }
    fileUpload(data) {
        return;
    }
    fetchFile(url) {
        return;
    }
    resolveSelectedValueFromSchema(answerUuid, schema) {
        let label;
        if (schema.pages) {
            _.forEach(schema.pages, (page) => {
                const l = this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, (section) => {
                const l = this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, (question) => {
                if (question.questions) {
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
    hasAnswer(node) {
        let answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    }
    questionsAnswered(node, answered) {
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
    isDate(val) {
        if (Date.parse(val)) {
            return true;
        }
        else {
            return false;
        }
    }
    convertTime(unixTimestamp) {
        const a = new Date(unixTimestamp);
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        const min = a.getMinutes();
        const sec = a.getSeconds();
        const suffix = hour < 12 ? 'AM' : 'PM';
        let time;
        if (hour === 0 && min === 0) {
            time = date + ' ' + month + ' ' + year;
        }
        else {
            time =
                date +
                    ' ' +
                    month +
                    ' ' +
                    year +
                    ' ' +
                    hour +
                    ':' +
                    min +
                    suffix +
                    ' (EAT)';
        }
        return time;
    }
}
EncounterViewerService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
EncounterViewerService.ctorParameters = () => [];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBTzNDLE9BQU8sS0FBSyxDQUFDLE1BQU0sUUFBUSxDQUFDO0FBSTVCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQztBQUNuQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFHckIsTUFBTTtJQUNKLGdCQUFlLENBQUM7SUFDVCxvQkFBb0IsQ0FBQyxLQUFVO1FBQ3BDLE1BQU0sQ0FBQztJQUNULENBQUM7SUFDTSxhQUFhLENBQUMsVUFBZTtRQUNsQyxNQUFNLENBQUM7SUFDVCxDQUFDO0lBQ00sVUFBVSxDQUFDLElBQVM7UUFDekIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNNLFNBQVMsQ0FBQyxHQUFRO1FBQ3ZCLE1BQU0sQ0FBQztJQUNULENBQUM7SUFFTSw4QkFBOEIsQ0FDbkMsVUFBa0IsRUFDbEIsTUFBVztRQUVYLElBQUksS0FBSyxDQUFDO1FBQ1YsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQy9CLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ04sS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDWixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsRUFBRSxD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LENBQUM7WUFDTixJQUFJO2dCQUNGLElBQUk7b0JBQ0osR0FBRztvQkFDSCxLQUFLO29CQUNMLEdBQUc7b0JBQ0gsSUFBSTtvQkFDSixHQUFHO29CQUNILElBQUk7b0JBQ0osR0FBRztvQkFDSCxHQUFHO29CQUNILE1BQU07b0JBQ04sUUFBUSxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUF4SkYsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIEdyb3VwTm9kZSxcbiAgTGVhZk5vZGUsXG4gIEFycmF5Tm9kZSxcbiAgTm9kZUJhc2Vcbn0gZnJvbSAnLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvc2VsZWN0LW9wdGlvbic7XG5jb25zdCBjb21tYSA9ICcsICc7XG5jb25zdCBuZXdMaW5lID0gJ1xcbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlOiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbj4ge1xuICAgIHJldHVybjtcbiAgfVxuICBwdWJsaWMgc2VhcmNoT3B0aW9ucyhzZWFyY2hUZXh0OiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbltdPiB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHB1YmxpYyBmaWxlVXBsb2FkKGRhdGE6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHB1YmxpYyBmZXRjaEZpbGUodXJsOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHB1YmxpYyByZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoXG4gICAgYW5zd2VyVXVpZDogc3RyaW5nLFxuICAgIHNjaGVtYTogYW55XG4gICk6IHN0cmluZyB7XG4gICAgbGV0IGxhYmVsO1xuICAgIGlmIChzY2hlbWEucGFnZXMpIHtcbiAgICAgIF8uZm9yRWFjaChzY2hlbWEucGFnZXMsIChwYWdlKSA9PiB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBwYWdlKTtcbiAgICAgICAgaWYgKGwpIHtcbiAgICAgICAgICBsYWJlbCA9IGw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEuc2VjdGlvbnMpIHtcbiAgICAgIF8uZm9yRWFjaChzY2hlbWEuc2VjdGlvbnMsIChzZWN0aW9uKSA9PiB7XG4gICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBzZWN0aW9uKTtcbiAgICAgICAgaWYgKGwpIHtcbiAgICAgICAgICBsYWJlbCA9IGw7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChzY2hlbWEucXVlc3Rpb25zKSB7XG4gICAgICBfLmZvckVhY2goc2NoZW1hLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgcXVlc3Rpb24pO1xuICAgICAgICAgIGlmIChsKSB7XG4gICAgICAgICAgICBsYWJlbCA9IGw7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2Vycykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzLCAoYW5zd2VyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChhbnN3ZXIuY29uY2VwdCA9PT0gYW5zd2VyVXVpZCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gYW5zd2VyLmxhYmVsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzKSB7XG4gICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMsIChvcmRlcikgPT4ge1xuICAgICAgICAgICAgICBpZiAob3JkZXIuY29uY2VwdCA9PT0gYW5zd2VyVXVpZCkge1xuICAgICAgICAgICAgICAgIGxhYmVsID0gb3JkZXIubGFiZWw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBsYWJlbDtcbiAgfVxuXG4gIHB1YmxpYyBoYXNBbnN3ZXIobm9kZTogTm9kZUJhc2UpIHtcbiAgICBsZXQgYW5zd2VyZWQgPSBmYWxzZTtcbiAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgIGFuc3dlcmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGFuc3dlcmVkO1xuICB9XG5cbiAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSwgYW5zd2VyZWQ/OiBib29sZWFuW10pIHtcbiAgICBjb25zdCAkYW5zd2VyZWQgPSBhbnN3ZXJlZCB8fCBbXTtcbiAgICBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAncGFnZScpIHtcbiAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlOiBhbnkpID0+IHtcbiAgICAgICAgdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZE5vZGUsICRhbnN3ZXJlZCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGROb2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdncm91cCcpIHtcbiAgICAgICAgICBfLmZvckVhY2goY2hpbGROb2RlLmNoaWxkcmVuLCAoY2hpbGQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFucyA9IHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGQsICRhbnN3ZXJlZCk7XG4gICAgICAgICAgICBpZiAoYW5zKSB7XG4gICAgICAgICAgICAgICRhbnN3ZXJlZC5wdXNoKGFucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5oYXNBbnN3ZXIoY2hpbGROb2RlKSkge1xuICAgICAgICAgICRhbnN3ZXJlZC5wdXNoKHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuaGFzQW5zd2VyKG5vZGUpO1xuICAgIH1cblxuICAgIGlmICgkYW5zd2VyZWQubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaXNEYXRlKHZhbDogYW55KSB7XG4gICAgaWYgKERhdGUucGFyc2UodmFsKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcHVibGljIGNvbnZlcnRUaW1lKHVuaXhUaW1lc3RhbXA6IG51bWJlcikge1xuICAgIGNvbnN0IGEgPSBuZXcgRGF0ZSh1bml4VGltZXN0YW1wKTtcbiAgICBjb25zdCBtb250aHMgPSBbXG4gICAgICAnSmFuJyxcbiAgICAgICdGZWInLFxuICAgICAgJ01hcicsXG4gICAgICAnQXByJyxcbiAgICAgICdNYXknLFxuICAgICAgJ0p1bicsXG4gICAgICAnSnVsJyxcbiAgICAgICdBdWcnLFxuICAgICAgJ1NlcCcsXG4gICAgICAnT2N0JyxcbiAgICAgICdOb3YnLFxuICAgICAgJ0RlYydcbiAgICBdO1xuICAgIGNvbnN0IHllYXIgPSBhLmdldEZ1bGxZZWFyKCk7XG4gICAgY29uc3QgbW9udGggPSBtb250aHNbYS5nZXRNb250aCgpXTtcbiAgICBjb25zdCBkYXRlID0gYS5nZXREYXRlKCk7XG4gICAgY29uc3QgaG91ciA9IGEuZ2V0SG91cnMoKTtcbiAgICBjb25zdCBtaW4gPSBhLmdldE1pbnV0ZXMoKTtcbiAgICBjb25zdCBzZWMgPSBhLmdldFNlY29uZHMoKTtcbiAgICBjb25zdCBzdWZmaXggPSBob3VyIDwgMTIgPyAnQU0nIDogJ1BNJztcbiAgICBsZXQgdGltZTtcbiAgICBpZiAoaG91ciA9PT0gMCAmJiBtaW4gPT09IDApIHtcbiAgICAgIHRpbWUgPSBkYXRlICsgJyAnICsgbW9udGggKyAnICcgKyB5ZWFyO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aW1lID1cbiAgICAgICAgZGF0ZSArXG4gICAgICAgICcgJyArXG4gICAgICAgIG1vbnRoICtcbiAgICAgICAgJyAnICtcbiAgICAgICAgeWVhciArXG4gICAgICAgICcgJyArXG4gICAgICAgIGhvdXIgK1xuICAgICAgICAnOicgK1xuICAgICAgICBtaW4gK1xuICAgICAgICBzdWZmaXggK1xuICAgICAgICAnIChFQVQpJztcbiAgICB9XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cbn1cbiJdfQ==