import * as tslib_1 from "tslib";
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
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
            'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
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
            time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + suffix + ' (EAT)';
        }
        return time;
    };
    EncounterViewerService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [])
    ], EncounterViewerService);
    return EncounterViewerService;
}());
export { EncounterViewerService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb3VudGVyLXZpZXdlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFtcGF0aC1rZW55YS9uZ3gtb3Blbm1ycy1mb3JtZW50cnkvIiwic291cmNlcyI6WyJlbmNvdW50ZXItdmlld2VyL2VuY291bnRlci12aWV3ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEtBQUssQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUk1QixJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbkIsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBR3JCO0lBRUk7SUFBZSxDQUFDO0lBQ1QscURBQW9CLEdBQTNCLFVBQTRCLEtBQVU7UUFDbEMsT0FBTztJQUNYLENBQUM7SUFDTSw4Q0FBYSxHQUFwQixVQUFxQixVQUFlO1FBQ2hDLE9BQU87SUFDWCxDQUFDO0lBQ00sMkNBQVUsR0FBakIsVUFBa0IsSUFBUztRQUN2QixPQUFPO0lBQ1gsQ0FBQztJQUNNLDBDQUFTLEdBQWhCLFVBQWlCLEdBQVE7UUFDckIsT0FBTztJQUNYLENBQUM7SUFFTSwrREFBOEIsR0FBckMsVUFBdUMsVUFBa0IsRUFBRSxNQUFXO1FBQXRFLGlCQXVDQztRQXRDRyxJQUFJLEtBQUssQ0FBQztRQUNWLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNkLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFDLElBQUk7Z0JBQzNCLElBQU0sQ0FBQyxHQUFHLEtBQUksQ0FBQyw4QkFBOEIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2hFLElBQUksQ0FBQyxFQUFFO29CQUFFLEtBQUssR0FBRyxDQUFDLENBQUM7aUJBQUU7WUFDdkIsQ0FBQyxDQUFDLENBQUM7U0FBRTtRQUVULElBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNqQixDQUFDLENBQUMs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QUUsQ0FBQztRQUMzQixJQUFNLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN2QyxJQUFJLElBQUksQ0FBQztRQUNULElBQUksSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ3pCLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQzFDO2FBQU07WUFDSCxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztTQUN2RjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBRWhCLENBQUM7SUFoSFEsc0JBQXNCO1FBRGxDLFVBQVUsRUFBRTs7T0FDQSxzQkFBc0IsQ0FpSGxDO0lBQUQsNkJBQUM7Q0FBQSxBQWpIRCxJQWlIQztTQWpIWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBHcm91cE5vZGUsIExlYWZOb2RlLCBBcnJheU5vZGUsIE5vZGVCYXNlIH0gZnJvbSAnLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCAqIGFzIF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IERhdGFTb3VyY2UgfSBmcm9tICcuLi9mb3JtLWVudHJ5L3F1ZXN0aW9uLW1vZGVscy9pbnRlcmZhY2VzL2RhdGEtc291cmNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFNlbGVjdE9wdGlvbiB9IGZyb20gJy4uL2Zvcm0tZW50cnkvcXVlc3Rpb24tbW9kZWxzL2ludGVyZmFjZXMvc2VsZWN0LW9wdGlvbic7XG5jb25zdCBjb21tYSA9ICcsICc7XG5jb25zdCBuZXdMaW5lID0gJ1xcbic7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBFbmNvdW50ZXJWaWV3ZXJTZXJ2aWNlIGltcGxlbWVudHMgRGF0YVNvdXJjZSB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG4gICAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlKHZhbHVlOiBhbnkpOiBPYnNlcnZhYmxlPFNlbGVjdE9wdGlvbj4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHB1YmxpYyBzZWFyY2hPcHRpb25zKHNlYXJjaFRleHQ6IGFueSk6IE9ic2VydmFibGU8U2VsZWN0T3B0aW9uW10+IHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBwdWJsaWMgZmlsZVVwbG9hZChkYXRhOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHB1YmxpYyBmZXRjaEZpbGUodXJsOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHVibGljIHJlc29sdmVTZWxlY3RlZFZhbHVlRnJvbVNjaGVtYSggYW5zd2VyVXVpZDogc3RyaW5nLCBzY2hlbWE6IGFueSk6IHN0cmluZyB7XG4gICAgICAgIGxldCBsYWJlbDtcbiAgICAgICAgaWYgKHNjaGVtYS5wYWdlcykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5wYWdlcywgKHBhZ2UpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHBhZ2UpO1xuICAgICAgICAgICAgICBpZiAobCkgeyBsYWJlbCA9IGw7IH1cbiAgICAgICAgICAgIH0pOyB9XG5cbiAgICAgICAgaWYgKHNjaGVtYS5zZWN0aW9ucykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKHNjaGVtYS5zZWN0aW9ucywgKHNlY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsID0gdGhpcy5yZXNvbHZlU2VsZWN0ZWRWYWx1ZUZyb21TY2hlbWEoYW5zd2VyVXVpZCwgc2VjdGlvbik7XG4gICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzY2hlbWEucXVlc3Rpb25zKSB7XG4gICAgICAgICAgICBfLmZvckVhY2goc2NoZW1hLnF1ZXN0aW9ucywgKHF1ZXN0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbi5xdWVzdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbCA9IHRoaXMucmVzb2x2ZVNlbGVjdGVkVmFsdWVGcm9tU2NoZW1hKGFuc3dlclV1aWQsIHF1ZXN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGwpIHsgbGFiZWwgPSBsOyB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5hbnN3ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChxdWVzdGlvbi5xdWVzdGlvbk9wdGlvbnMuYW5zd2VycywgKGFuc3dlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFuc3dlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgPSBhbnN3ZXIubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocXVlc3Rpb24ucXVlc3Rpb25PcHRpb25zLnNlbGVjdGFibGVPcmRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5mb3JFYWNoKHF1ZXN0aW9uLnF1ZXN0aW9uT3B0aW9ucy5zZWxlY3RhYmxlT3JkZXJzLCAob3JkZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmRlci5jb25jZXB0ID09PSBhbnN3ZXJVdWlkKSB7IGxhYmVsID0gb3JkZXIubGFiZWw7IH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhYmVsO1xuXG5cbiAgICB9XG5cbiAgICBwdWJsaWMgaGFzQW5zd2VyKG5vZGU6IE5vZGVCYXNlKSB7XG4gICAgICAgIGxldCBhbnN3ZXJlZCA9IGZhbHNlO1xuICAgICAgICBpZiAobm9kZS5pbml0aWFsVmFsdWUpIHtcbiAgICAgICAgICAgIGFuc3dlcmVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYW5zd2VyZWQ7XG4gICAgfVxuXG4gICAgcHVibGljIHF1ZXN0aW9uc0Fuc3dlcmVkKG5vZGU6IGFueSwgYW5zd2VyZWQ/OiBib29sZWFuW10pIHtcbiAgICAgICAgY29uc3QgJGFuc3dlcmVkID0gYW5zd2VyZWQgfHwgW107XG4gICAgICAgIGlmIChub2RlLnF1ZXN0aW9uLnJlbmRlcmluZ1R5cGUgPT09ICdwYWdlJykge1xuICAgICAgICAgICAgXy5mb3JFYWNoKG5vZGUuY2hpbGRyZW4sIChjaGlsZE5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zQW5zd2VyZWQoY2hpbGROb2RlLCAkYW5zd2VyZWQpOyB9KTtcblxuICAgICAgICB9IGVsc2UgaWYgKG5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ3NlY3Rpb24nKSB7XG4gICAgICAgICAgICBfLmZvckVhY2gobm9kZS5jaGlsZHJlbiwgKGNoaWxkTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGUucXVlc3Rpb24ucmVuZGVyaW5nVHlwZSA9PT0gJ2dyb3VwJykge1xuICAgICAgICAgICAgICAgICAgIF8uZm9yRWFjaChjaGlsZE5vZGUuY2hpbGRyZW4sIChjaGlsZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBhbnMgPSB0aGlzLnF1ZXN0aW9uc0Fuc3dlcmVkKGNoaWxkLCAkYW5zd2VyZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICBpZiAoYW5zKSB7ICRhbnN3ZXJlZC5wdXNoKGFucyk7IH1cbiAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzQW5zd2VyKGNoaWxkTm9kZSkpIHsgJGFuc3dlcmVkLnB1c2godHJ1ZSk7IH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyByZXR1cm4gdGhpcy5oYXNBbnN3ZXIobm9kZSk7IH1cblxuICAgICAgICBpZiAoJGFuc3dlcmVkLmxlbmd0aCA+IDApIHtyZXR1cm4gdHJ1ZTsgfSBlbHNlIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgfVxuXG5cbiAgICBwdWJsaWMgaXNEYXRlKHZhbDogYW55KSB7XG4gICAgICAgIGlmIChEYXRlLnBhcnNlKHZhbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyBjb252ZXJ0VGltZSh1bml4VGltZXN0YW1wOiBudW1iZXIpIHtcbiAgICAgICAgY29uc3QgYSA9IG5ldyBEYXRlKHVuaXhUaW1lc3RhbXApO1xuICAgICAgICBjb25zdCBtb250aHMgPSBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddO1xuICAgICAgICBjb25zdCB5ZWFyID0gYS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBjb25zdCBtb250aCA9IG1vbnRoc1thLmdldE1vbnRoKCldO1xuICAgICAgICBjb25zdCBkYXRlID0gYS5nZXREYXRlKCk7XG4gICAgICAgIGNvbnN0IGhvdXIgPSBhLmdldEhvdXJzKCk7XG4gICAgICAgIGNvbnN0IG1pbiA9IGEuZ2V0TWludXRlcygpO1xuICAgICAgICBjb25zdCBzZWMgPSBhLmdldFNlY29uZHMoKTtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gaG91ciA8IDEyID8gJ0FNJyA6ICdQTSc7XG4gICAgICAgIGxldCB0aW1lO1xuICAgICAgICBpZiAoaG91ciA9PT0gMCAmJiBtaW4gPT09IDApIHtcbiAgICAgICAgICAgIHRpbWUgPSBkYXRlICsgJyAnICsgbW9udGggKyAnICcgKyB5ZWFyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGltZSA9IGRhdGUgKyAnICcgKyBtb250aCArICcgJyArIHllYXIgKyAnICcgKyBob3VyICsgJzonICsgbWluICsgc3VmZml4ICsgJyAoRUFUKSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRpbWU7XG5cbiAgICB9XG59XG4iXX0=