import { Injectable } from '@angular/core';
import * as _ from 'lodash';
var comma = ', ';
var newLine = '\n';
var EncounterViewerService = /** @class */ (function () {
    function EncounterViewerService() {
    }
    EncounterViewerService.prototype.resolveSelectedValue = function (value) {
        return;
    };
    EncounterViewerService.prototype.searchOptions = function (searchText) {
        return;
    };
    EncounterViewerService.prototype.fileUpload = function (data) {
        return;
    };
    EncounterViewerService.prototype.fetchFile = function (url) {
        return;
    };
    EncounterViewerService.prototype.resolveSelectedValueFromSchema = function (answerUuid, schema) {
        var _this = this;
        var label;
        if (schema.pages) {
            _.forEach(schema.pages, function (page) {
                var l = _this.resolveSelectedValueFromSchema(answerUuid, page);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.sections) {
            _.forEach(schema.sections, function (section) {
                var l = _this.resolveSelectedValueFromSchema(answerUuid, section);
                if (l) {
                    label = l;
                }
            });
        }
        if (schema.questions) {
            _.forEach(schema.questions, function (question) {
                if (question.questions) {
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
    EncounterViewerService.prototype.hasAnswer = function (node) {
        var answered = false;
        if (node.initialValue) {
            answered = true;
        }
        return answered;
    };
    EncounterViewerService.prototype.questionsAnswered = function (node, answered) {
        var _this = this;
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
    EncounterViewerService.prototype.isDate = function (val) {
        if (Date.parse(val)) {
            return true;
        }
        else {
            return false;
        }
    };
    EncounterViewerService.prototype.convertTime = function (unixTimestamp) {
        var a = new Date(unixTimestamp);
        var months = [
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
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var suffix = hour < 12 ? 'AM' : 'PM';
        var time;
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
    };
    EncounterViewerService.decorators = [
        { type: Injectable },
    ];
    EncounterViewerService.ctorParameters = function () { return []; };
    return EncounterViewerService;
}());
export { EncounterViewerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiZW5jb3VudGVyLXZpZXdlci9lbmNvdW50ZXItdmlld2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUk1QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBRXJCO0lBRUU7SUFBZSxDQUFDO0lBQ1QscURBQW9CLEdBQTNCLFVBQTRCLEtBQVU7UUFDcEMsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNNLDhDQUFhLEdBQXBCLFVBQXFCLFVBQWU7UUFDbEMsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNNLDJDQUFVLEdBQWpCLFVBQWtCLElBQVM7UUFDekIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNNLDBDQUFTLEdBQWhCLFVBQWlCLEdBQVE7UUFDdkIsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUVNLCtEQUE4QixHQUFyQyxVQUNFLFVBQWtCLEVBQ2xCLE1BQVc7UUFGYixpQkFnREM7UUE1Q0MsSUFBSSxLQUFLLENBQUM7UUFDVixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqQixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFJO2dCQUMzQixJQUFNLENBQUMsR0FBRyxLQUFJLENBQUMsOEJBQThCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNOLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ1osQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FB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TixJQUFJO2dCQUNGLElBQUk7b0JBQ0osR0FBRztvQkFDSCxLQUFLO29CQUNMLEdBQUc7b0JBQ0gsSUFBSTtvQkFDSixHQUFHO29CQUNILElBQUk7b0JBQ0osR0FBRztvQkFDSCxHQUFHO29CQUNILE1BQU07b0JBQ04sUUFBUSxDQUFDO1FBQ2IsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkF4SkYsVUFBVTs7O0lBeUpYLDZCQUFDO0NBQUEsQUF6SkQsSUF5SkM7U0F4Slksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgR3JvdXBOb2RlLFxuICBMZWFmTm9kZSxcbiAgQXJyYXlOb2RlLFxuICBOb2RlQmFzZVxufSBmcm9tICcuLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvZGF0YS1zb3VyY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgU2VsZWN0T3B0aW9uIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9xdWVzdGlvbi1tb2RlbHMvaW50ZXJmYWNlcy9zZWxlY3Qtb3B0aW9uJztcbmNvbnN0IGNvbW1hID0gJywgJztcbmNvbnN0IG5ld0xpbmUgPSAnXFxuJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEVuY291bnRlclZpZXdlclNlcnZpY2UgaW1wbGVtZW50cyBEYXRhU291cmNlIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuICBwdWJsaWMgcmVzb2x2ZVNlbGVjdGVkVmFsdWUodmFsdWU6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uPiB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHB1YmxpYyBzZWFyY2hPcHRpb25zKHNlYXJjaFRleHQ6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uW10+IHtcbiAgICByZXR1cm47XG4gIH1cbiAgcHVibGljIGZpbGVVcGxvYWQoZGF0YTogYW55KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm47XG4gIH1cbiAgcHVibGljIGZldGNoRmlsZSh1cmw6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShcbiAgICBhbnN3ZXJVdWlkOiBzdHJpbmcsXG4gICAgc2NoZW1hOiBhbnlcbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgbGFiZWw7XG4gICAgaWYgKHNjaGVtYS5wYWdlcykge1xuICAgICAgXy5mb3JFYWNoKHNjaGVtYS5wYWdlcywgKHBhZ2UpID0+IHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHBhZ2UpO1xuICAgICAgICBpZiAobCkge1xuICAgICAgICAgIGxhYmVsID0gbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5zZWN0aW9ucykge1xuICAgICAgXy5mb3JFYWNoKHNjaGVtYS5zZWN0aW9ucywgKHNlY3Rpb24pID0+IHtcbiAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHNlY3Rpb24pO1xuICAgICAgICBpZiAobCkge1xuICAgICAgICAgIGxhYmVsID0gbDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHNjaGVtYS5xdWVzdGlvbnMpIHtcbiAgICAgIF8uZm9yRWFjaChzY2hlbWEucXVlc3Rpb25zLCAocXVlc3Rpb24pID0+IHtcbiAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9ucykge1xuICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYShhbnN3ZXJVdWlkLCBxdWVzdGlvbik7XG4gICAgICAgICAgaWYgKGwpIHtcbiAgICAgICAgICAgIGxhYmVsID0gbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzKSB7XG4gICAgICAgICAgICBfLmZvckVhY2gocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLmFuc3dlcnMsIChhbnN3ZXIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGFuc3dlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBhbnN3ZXIubGFiZWw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMpIHtcbiAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuc2VsZWN0YWJsZU9yZGVycywgKG9yZGVyKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChvcmRlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7XG4gICAgICAgICAgICAgICAgbGFiZWwgPSBvcmRlci5sYWJlbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGxhYmVsO1xuICB9XG5cbiAgcHVibGljIGhhc0Fuc3dlcihub2RlOiBOb2RlQmFzZSkge1xuICAgIGxldCBhbnN3ZXJlZCA9IGZhbHNlO1xuICAgIGlmIChub2RlLmluaXRpYWxWYWx1ZSkge1xuICAgICAgYW5zd2VyZWQgPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gYW5zd2VyZWQ7XG4gIH1cblxuICBwdWJsaWMgcXVlc3Rpb25zQW5zd2VyZWQobm9kZTogYW55LCBhbnN3ZXJlZD86IGJvb2xlYW5bXSkge1xuICAgIGNvbnN0ICRhbnN3ZXJlZCA9IGFuc3dlcmVkIHx8IFtdO1xuICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGU6IGFueSkgPT4ge1xuICAgICAgICB0aGlzLnF1ZXN0aW9uc0Fuc3dlcmVkKGNoaWxkTm9kZSwgJGFuc3dlcmVkKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAobm9kZS5xdWVzdGlvbi5yZW5kZXJpbmdUeXBlID09PSAnc2VjdGlvbicpIHtcbiAgICAgIF8uZm9yRWFjaChub2RlLmNoaWxkcmVuLCAoY2hpbGROb2RlKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgIF8uZm9yRWFjaChjaGlsZE5vZGUuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgYW5zID0gdGhpcy5xdWVzdGlvbnNBbnN3ZXJlZChjaGlsZCwgJGFuc3dlcmVkKTtcbiAgICAgICAgICAgIGlmIChhbnMpIHtcbiAgICAgICAgICAgICAgJGFuc3dlcmVkLnB1c2goYW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc0Fuc3dlcihjaGlsZE5vZGUpKSB7XG4gICAgICAgICAgJGFuc3dlcmVkLnB1c2godHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5oYXNBbnN3ZXIobm9kZSk7XG4gICAgfVxuXG4gICAgaWYgKCRhbnN3ZXJlZC5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc0RhdGUodmFsOiBhbnkpIHtcbiAgICBpZiAoRGF0ZS5wYXJzZSh2YWwpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBwdWJsaWMgY29udmVydFRpbWUodW5peFRpbWVzdGFtcDogbnVtYmVyKSB7XG4gICAgY29uc3QgYSA9IG5ldyBEYXRlKHVuaXhUaW1lc3RhbXApO1xuICAgIGNvbnN0IG1vbnRocyA9IFtcbiAgICAgICdKYW4nLFxuICAgICAgJ0ZlYicsXG4gICAgICAnTWFyJyxcbiAgICAgICdBcHInLFxuICAgICAgJ01heScsXG4gICAgICAnSnVuJyxcbiAgICAgICdKdWwnLFxuICAgICAgJ0F1ZycsXG4gICAgICAnU2VwJyxcbiAgICAgICdPY3QnLFxuICAgICAgJ05vdicsXG4gICAgICAnRGVjJ1xuICAgIF07XG4gICAgY29uc3QgeWVhciA9IGEuZ2V0RnVsbFllYXIoKTtcbiAgICBjb25zdCBtb250aCA9IG1vbnRoc1thLmdldE1vbnRoKCldO1xuICAgIGNvbnN0IGRhdGUgPSBhLmdldERhdGUoKTtcbiAgICBjb25zdCBob3VyID0gYS5nZXRIb3VycygpO1xuICAgIGNvbnN0IG1pbiA9IGEuZ2V0TWludXRlcygpO1xuICAgIGNvbnN0IHNlYyA9IGEuZ2V0U2Vjb25kcygpO1xuICAgIGNvbnN0IHN1ZmZpeCA9IGhvdXIgPCAxMiA/ICdBTScgOiAnUE0nO1xuICAgIGxldCB0aW1lO1xuICAgIGlmIChob3VyID09PSAwICYmIG1pbiA9PT0gMCkge1xuICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWUgPVxuICAgICAgICBkYXRlICtcbiAgICAgICAgJyAnICtcbiAgICAgICAgbW9udGggK1xuICAgICAgICAnICcgK1xuICAgICAgICB5ZWFyICtcbiAgICAgICAgJyAnICtcbiAgICAgICAgaG91ciArXG4gICAgICAgICc6JyArXG4gICAgICAgIG1pbiArXG4gICAgICAgIHN1ZmZpeCArXG4gICAgICAgICcgKEVBVCknO1xuICAgIH1cbiAgICByZXR1cm4gdGltZTtcbiAgfVxufVxuIl19