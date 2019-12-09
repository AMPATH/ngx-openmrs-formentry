import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
var moment = moment_;
var AppointmentsOverviewComponent = /** @class */ (function () {
    function AppointmentsOverviewComponent() {
        this.showAppointments = false;
        this.loadingAppointments = false;
        this.errorLoadingAppointments = false;
        this.appointmentsLoaded = false;
        this.appointments = [];
        this.today = '';
    }
    AppointmentsOverviewComponent.prototype.ngOnInit = function () {
    };
    AppointmentsOverviewComponent.prototype.ngOnChanges = function () {
        var _this = this;
        this.node.control.valueChanges.subscribe(function (v) {
            _this.resetProperties();
            var node = _this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!_this.showAppointments) {
                    _this.loadingAppointments = true;
                    _this.showAppointments = true;
                    var dataSource = void 0;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    var locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        var startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        var endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        _this.today = moment(v).format('DD-MM-YYYY');
                        // create 5 week days
                        var _data_1 = [];
                        var programTypes = ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                            '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                            '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838'];
                        var programTypeParams = programTypes.join();
                        for (var i = 1; i <= 5; i++) {
                            _data_1.push({
                                date: moment(v).startOf('week').add(i, 'day').format('DD-MM-YYYY'),
                                count: 0
                            });
                        }
                        dataSource.getMonthlySchedule({
                            startDate: startDate,
                            endDate: endDate,
                            limit: 5,
                            locationUuids: locationUuid,
                            programType: programTypeParams
                        }).subscribe(function (data) {
                            _this.appointmentsLoaded = true;
                            _this.loadingAppointments = false;
                            _data_1.map(function (appointment, index) {
                                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
                            });
                            _this.appointments = _data_1;
                        }, function (error) {
                            _this.loadingAppointments = false;
                            _this.errorLoadingAppointments = true;
                            _this.showAppointments = false;
                            console.error(error);
                        });
                    }
                    else {
                        _this.showAppointments = false;
                        _this.errorLoadingAppointments = true;
                    }
                }
            }
        });
    };
    AppointmentsOverviewComponent.prototype.resetProperties = function () {
        this.loadingAppointments = false;
        this.appointmentsLoaded = false;
        this.errorLoadingAppointments = false;
        this.showAppointments = false;
        this.appointments = [];
        this.today = '';
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", LeafNode)
    ], AppointmentsOverviewComponent.prototype, "node", void 0);
    AppointmentsOverviewComponent = tslib_1.__decorate([
        Component({
            selector: 'appointments-overview',
            template: "<div *ngIf=\"showAppointments\" class=\"appointments\">\n  <p *ngIf=\"loadingAppointments\">\n    <span *ngIf=\"!appointmentsLoaded && errorLoadingAppointments\">Error checking appointments</span>\n    <span *ngIf=\"loadingAppointments\"><span\n      class=\"fa fa-spinner fa-spin\"></span>Checking appointments...</span>\n  </p>\n  <div *ngIf=\"appointmentsLoaded && !errorLoadingAppointments\">\n    <table *ngIf=\"appointments.length>0\" class=\"table table-stripped table-bordered\">\n      <thead>\n      <tr>\n        <th *ngFor=\"let appointment of appointments\" [ngClass]=\"{'active': appointment.date === today}\">\n          <span>{{appointment.date}}</span>\n        </th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td *ngFor=\"let appointment of appointments\"\n            [ngClass]=\"{'active': appointment.date === today}\">\n          <span><strong><em>{{appointment.count}}</em></strong></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n",
            styles: [".appointments{margin-top:12px;font-size:12px;color:#999}.appointments p{padding-top:12px}.appointments th{border-bottom:0!important;color:#333}.appointments td span,.appointments th span{display:block}.appointments td.active,.appointments th.active{background-color:#3c8dbc;color:#fff!important;padding:0}.appointments td.active span,.appointments th.active span{padding:4px}.appointments span.fa{display:inline-block;margin-right:7px}"]
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], AppointmentsOverviewComponent);
    return AppointmentsOverviewComponent;
}());
export { AppointmentsOverviewComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBT3ZCO0lBUUU7UUFOQSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBZSxFQUFFLENBQUM7UUFDOUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUVYLENBQUM7SUFFRCxnREFBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELG1EQUFXLEdBQVg7UUFBQSxpQkEwREM7UUF6REMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLElBQU0sSUFBSSxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTzttQkFDM0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLHNDQUFzQzt1QkFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFN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QixDQUFDLEVBQUUsVUFBQyxLQUFLOzRCQUNQLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7NEJBQ2pDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7NEJBQ3JDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNO3dCQUNMLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzlCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCx1REFBZSxHQUFmO1FBQ0UsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBaEZRO1FBQVIsS0FBSyxFQUFFOzBDQUFPLFFBQVE7K0RBQUM7SUFEYiw2QkFBNkI7UUFMekMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxpZ0NBQXFEOztTQUV0RCxDQUFDOztPQUNXLDZCQUE2QixDQWtGekM7SUFBRCxvQ0FBQztDQUFBLEFBbEZELElBa0ZDO1NBbEZZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwb2ludG1lbnRzLW92ZXJ2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG5vZGU6IExlYWZOb2RlO1xuICBzaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGFwcG9pbnRtZW50c0xvYWRlZCA9IGZhbHNlO1xuICBhcHBvaW50bWVudHM6IEFycmF5PGFueT4gPSBbXTtcbiAgdG9kYXkgPSAnJztcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubm9kZS5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHYpID0+IHtcbiAgICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKCk7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0XG4gICAgICAgICYmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT0gJ2E4YTY2NmJhLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCdcbiAgICAgICAgfHwgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09ICdhODlkMjM5OC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnKSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnd2hhdCBjaGFuZ2UgaXMgaGVyZScsIHRoaXMuc2hvd0FwcG9pbnRtZW50cyk7XG4gICAgICAgIGlmICghdGhpcy5zaG93QXBwb2ludG1lbnRzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIGxldCBkYXRhU291cmNlO1xuICAgICAgICAgIGlmIChub2RlLmZvcm0gJiYgbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzKSB7XG4gICAgICAgICAgICBkYXRhU291cmNlID0gbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLm1vbnRobHlTY2hlZHVsZVJlc291cmNlU2VydmljZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbG9jYXRpb25VdWlkID0gbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLnVzZXJMb2NhdGlvbi51dWlkO1xuICAgICAgICAgIGlmIChkYXRhU291cmNlICYmIGxvY2F0aW9uVXVpZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHYpLnN0YXJ0T2YoJ3dlZWsnKS5hZGQoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG1vbWVudCh2KS5lbmRPZignd2VlaycpLnN1YnRyYWN0KDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgICAgIHRoaXMudG9kYXkgPSBtb21lbnQodikuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG4gICAgICAgICAgICAvLyBjcmVhdGUgNSB3ZWVrIGRheXNcbiAgICAgICAgICAgIGNvbnN0IF9kYXRhID0gW107XG4gICAgICAgICAgICBjb25zdCBwcm9ncmFtVHlwZXMgPSBbJzc4MWQ4NWIwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsICc3ODFkODk3YS0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLFxuICAgICAgICAgICAgICAnOTYwNDdhYWYtN2FiMy00NWU5LWJlNmEtYjYxODEwZmU2MTdkJywgJ2MxOWFlYzY2LTFhNDAtNDU4OC05YjAzLWI2YmU1NWE4ZGQxZCcsICdmNzc5M2Q0Mi0xMWFjLTRjZmQtOWIzNS1lMGEyMWE3YTdjMzEnLFxuICAgICAgICAgICAgICAnMzM0YzllOTgtMTczZi00NDU0LWE4Y2UtZjgwYjIwYjdmZGYwJywgJzk2YmEyNzliLWIyM2ItNGU3OC1hYmE5LWRjYmQ0NmE5NmI3YicsICc3ODFkODg4MC0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyYW1UeXBlUGFyYW1zID0gcHJvZ3JhbVR5cGVzLmpvaW4oKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xuICAgICAgICAgICAgICBfZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQodikuc3RhcnRPZignd2VlaycpLmFkZChpLCAnZGF5JykuZm9ybWF0KCdERC1NTS1ZWVlZJyksXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhU291cmNlLmdldE1vbnRobHlTY2hlZHVsZSh7XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxuICAgICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlLFxuICAgICAgICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgICAgICAgbG9jYXRpb25VdWlkczogbG9jYXRpb25VdWlkLFxuICAgICAgICAgICAgICBwcm9ncmFtVHlwZTogcHJvZ3JhbVR5cGVQYXJhbXNcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50c0xvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICBfZGF0YS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LmNvdW50ID0gZGF0YVtpbmRleF0gIT09IHVuZGVmaW5lZCA/IGRhdGFbaW5kZXhdLmNvdW50LnNjaGVkdWxlZCA6IDA7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50cyA9IF9kYXRhO1xuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0UHJvcGVydGllcygpIHtcbiAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLmFwcG9pbnRtZW50c0xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5hcHBvaW50bWVudHMgPSBbXTtcbiAgICB0aGlzLnRvZGF5ID0gJyc7XG4gIH1cbn1cbiJdfQ==