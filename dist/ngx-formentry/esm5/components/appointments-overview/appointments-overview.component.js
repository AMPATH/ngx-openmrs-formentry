/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
var /** @type {?} */ moment = moment_;
var AppointmentsOverviewComponent = /** @class */ (function () {
    function AppointmentsOverviewComponent() {
        this.showAppointments = false;
        this.loadingAppointments = false;
        this.errorLoadingAppointments = false;
        this.appointmentsLoaded = false;
        this.appointments = [];
        this.today = '';
    }
    /**
     * @return {?}
     */
    AppointmentsOverviewComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    AppointmentsOverviewComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.node.control.valueChanges.subscribe(function (v) {
            _this.resetProperties();
            var /** @type {?} */ node = _this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!_this.showAppointments) {
                    _this.loadingAppointments = true;
                    _this.showAppointments = true;
                    var /** @type {?} */ dataSource = void 0;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    var /** @type {?} */ locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        var /** @type {?} */ startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        var /** @type {?} */ endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        _this.today = moment(v).format('DD-MM-YYYY');
                        // create 5 week days
                        var /** @type {?} */ _data_1 = [];
                        var /** @type {?} */ params = {
                            'programType': ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                                '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                                '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838']
                        };
                        var /** @type {?} */ urlParams = encodeURI(JSON.stringify(params));
                        for (var /** @type {?} */ i = 1; i <= 5; i++) {
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
                            programVisitEncounter: urlParams
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
    /**
     * @return {?}
     */
    AppointmentsOverviewComponent.prototype.resetProperties = /**
     * @return {?}
     */
    function () {
        this.loadingAppointments = false;
        this.appointmentsLoaded = false;
        this.errorLoadingAppointments = false;
        this.showAppointments = false;
        this.appointments = [];
        this.today = '';
    };
    AppointmentsOverviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'appointments-overview',
                    template: "<div *ngIf=\"showAppointments\" class=\"appointments\">\n  <p *ngIf=\"loadingAppointments\">\n    <span *ngIf=\"!appointmentsLoaded && errorLoadingAppointments\">Error checking appointments</span>\n    <span *ngIf=\"loadingAppointments\"><span\n      class=\"fa fa-spinner fa-spin\"></span>Checking appointments...</span>\n  </p>\n  <div *ngIf=\"appointmentsLoaded && !errorLoadingAppointments\">\n    <table *ngIf=\"appointments.length>0\" class=\"table table-stripped table-bordered\">\n      <thead>\n      <tr>\n        <th *ngFor=\"let appointment of appointments\" [ngClass]=\"{'active': appointment.date === today}\">\n          <span>{{appointment.date}}</span>\n        </th>\n      </tr>\n      </thead>\n      <tbody>\n      <tr>\n        <td *ngFor=\"let appointment of appointments\"\n            [ngClass]=\"{'active': appointment.date === today}\">\n          <span><strong><em>{{appointment.count}}</em></strong></span>\n        </td>\n      </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n",
                    styles: [".appointments{margin-top:12px;font-size:12px;color:#999}.appointments p{padding-top:12px}.appointments th{border-bottom:0!important;color:#333}.appointments td span,.appointments th span{display:block}.appointments td.active,.appointments th.active{background-color:#3c8dbc;color:#fff!important;padding:0}.appointments td.active span,.appointments th.active span{padding:4px}.appointments span.fa{display:inline-block;margin-right:7px}"]
                },] },
    ];
    /** @nocollapse */
    AppointmentsOverviewComponent.ctorParameters = function () { return []; };
    AppointmentsOverviewComponent.propDecorators = {
        "node": [{ type: Input },],
    };
    return AppointmentsOverviewComponent;
}());
export { AppointmentsOverviewComponent };
function AppointmentsOverviewComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    AppointmentsOverviewComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    AppointmentsOverviewComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    AppointmentsOverviewComponent.propDecorators;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.node;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.showAppointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.loadingAppointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.errorLoadingAppointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.appointmentsLoaded;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.appointments;
    /** @type {?} */
    AppointmentsOverviewComponent.prototype.today;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQzs7SUF5Q3JCO2dDQU5tQixLQUFLO21DQUNGLEtBQUs7d0NBQ0EsS0FBSztrQ0FDWCxLQUFLOzRCQUNDLEVBQUU7cUJBQ3JCLEVBQUU7S0FFVDs7OztJQUVELGdEQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQsbURBQVc7OztJQUFYO1FBQUEsaUJBNERDO1FBM0RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixxQkFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTzttQkFDM0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLHNDQUFzQzt1QkFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTlGLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FB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QVksR0FBRyxPQUFLLENBQUM7eUJBQzNCLEVBQUUsVUFBQyxLQUFLOzRCQUNQLEtBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7NEJBQ2pDLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7NEJBQ3JDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ3RCLENBQUMsQ0FBQztxQkFDSjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDTixLQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUM5QixLQUFJLENBQUMsd0JBQXdCLEdBQUcsSUFBSSxDQUFDO3FCQUN0QztpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCx1REFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ2pCOztnQkFsSEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLFFBQVEsRUFBRSx1L0JBMEJYO29CQUNDLE1BQU0sRUFBRSxDQUFDLHFiQUFxYixDQUFDO2lCQUNoYzs7Ozs7eUJBRUUsS0FBSzs7d0NBdkNSOztTQXNDYSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMZWFmTm9kZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcG9pbnRtZW50cy1vdmVydmlldycsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dBcHBvaW50bWVudHNcIiBjbGFzcz1cImFwcG9pbnRtZW50c1wiPlxuICA8cCAqbmdJZj1cImxvYWRpbmdBcHBvaW50bWVudHNcIj5cbiAgICA8c3BhbiAqbmdJZj1cIiFhcHBvaW50bWVudHNMb2FkZWQgJiYgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzXCI+RXJyb3IgY2hlY2tpbmcgYXBwb2ludG1lbnRzPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwibG9hZGluZ0FwcG9pbnRtZW50c1wiPjxzcGFuXG4gICAgICBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvc3Bhbj5DaGVja2luZyBhcHBvaW50bWVudHMuLi48L3NwYW4+XG4gIDwvcD5cbiAgPGRpdiAqbmdJZj1cImFwcG9pbnRtZW50c0xvYWRlZCAmJiAhZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzXCI+XG4gICAgPHRhYmxlICpuZ0lmPVwiYXBwb2ludG1lbnRzLmxlbmd0aD4wXCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcHBlZCB0YWJsZS1ib3JkZXJlZFwiPlxuICAgICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGggKm5nRm9yPVwibGV0IGFwcG9pbnRtZW50IG9mIGFwcG9pbnRtZW50c1wiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogYXBwb2ludG1lbnQuZGF0ZSA9PT0gdG9kYXl9XCI+XG4gICAgICAgICAgPHNwYW4+e3thcHBvaW50bWVudC5kYXRlfX08L3NwYW4+XG4gICAgICAgIDwvdGg+XG4gICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBhcHBvaW50bWVudCBvZiBhcHBvaW50bWVudHNcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBhcHBvaW50bWVudC5kYXRlID09PSB0b2RheX1cIj5cbiAgICAgICAgICA8c3Bhbj48c3Ryb25nPjxlbT57e2FwcG9pbnRtZW50LmNvdW50fX08L2VtPjwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmFwcG9pbnRtZW50c3ttYXJnaW4tdG9wOjEycHg7Zm9udC1zaXplOjEycHg7Y29sb3I6Izk5OX0uYXBwb2ludG1lbnRzIHB7cGFkZGluZy10b3A6MTJweH0uYXBwb2ludG1lbnRzIHRoe2JvcmRlci1ib3R0b206MCFpbXBvcnRhbnQ7Y29sb3I6IzMzM30uYXBwb2ludG1lbnRzIHRkIHNwYW4sLmFwcG9pbnRtZW50cyB0aCBzcGFue2Rpc3BsYXk6YmxvY2t9LmFwcG9pbnRtZW50cyB0ZC5hY3RpdmUsLmFwcG9pbnRtZW50cyB0aC5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojM2M4ZGJjO2NvbG9yOiNmZmYhaW1wb3J0YW50O3BhZGRpbmc6MH0uYXBwb2ludG1lbnRzIHRkLmFjdGl2ZSBzcGFuLC5hcHBvaW50bWVudHMgdGguYWN0aXZlIHNwYW57cGFkZGluZzo0cHh9LmFwcG9pbnRtZW50cyBzcGFuLmZhe2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo3cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG5vZGU6IExlYWZOb2RlO1xuICBzaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGFwcG9pbnRtZW50c0xvYWRlZCA9IGZhbHNlO1xuICBhcHBvaW50bWVudHM6IEFycmF5PGFueT4gPSBbXTtcbiAgdG9kYXkgPSAnJztcbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubm9kZS5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHYpID0+IHtcbiAgICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKCk7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0XG4gICAgICAgICYmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT0gJ2E4YTY2NmJhLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCdcbiAgICAgICAgfHwgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09ICdhODlkMjM5OC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnKSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnd2hhdCBjaGFuZ2UgaXMgaGVyZScsIHRoaXMuc2hvd0FwcG9pbnRtZW50cyk7XG4gICAgICAgIGlmICghdGhpcy5zaG93QXBwb2ludG1lbnRzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIGxldCBkYXRhU291cmNlO1xuICAgICAgICAgIGlmIChub2RlLmZvcm0gJiYgbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzKSB7XG4gICAgICAgICAgICBkYXRhU291cmNlID0gbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLm1vbnRobHlTY2hlZHVsZVJlc291cmNlU2VydmljZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbG9jYXRpb25VdWlkID0gbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLnVzZXJMb2NhdGlvbi51dWlkO1xuICAgICAgICAgIGlmIChkYXRhU291cmNlICYmIGxvY2F0aW9uVXVpZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHYpLnN0YXJ0T2YoJ3dlZWsnKS5hZGQoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG1vbWVudCh2KS5lbmRPZignd2VlaycpLnN1YnRyYWN0KDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgICAgIHRoaXMudG9kYXkgPSBtb21lbnQodikuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG4gICAgICAgICAgICAvLyBjcmVhdGUgNSB3ZWVrIGRheXNcbiAgICAgICAgICAgIGNvbnN0IF9kYXRhID0gW107XG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICdwcm9ncmFtVHlwZSc6IFsnNzgxZDg1YjAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JywgJzc4MWQ4OTdhLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgICAgICAgICc5NjA0N2FhZi03YWIzLTQ1ZTktYmU2YS1iNjE4MTBmZTYxN2QnLCAnYzE5YWVjNjYtMWE0MC00NTg4LTliMDMtYjZiZTU1YThkZDFkJywgJ2Y3NzkzZDQyLTExYWMtNGNmZC05YjM1LWUwYTIxYTdhN2MzMScsXG4gICAgICAgICAgICAgICczMzRjOWU5OC0xNzNmLTQ0NTQtYThjZS1mODBiMjBiN2ZkZjAnLCAnOTZiYTI3OWItYjIzYi00ZTc4LWFiYTktZGNiZDQ2YTk2YjdiJywgJzc4MWQ4ODgwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCddXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgdXJsUGFyYW1zID0gZW5jb2RlVVJJKEpTT04uc3RyaW5naWZ5KHBhcmFtcykpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICAgIF9kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKGksICdkYXknKS5mb3JtYXQoJ0RELU1NLVlZWVknKSxcbiAgICAgICAgICAgICAgICBjb3VudDogMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFTb3VyY2UuZ2V0TW9udGhseVNjaGVkdWxlKHtcbiAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXG4gICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgIGxpbWl0OiA1LFxuICAgICAgICAgICAgICBsb2NhdGlvblV1aWRzOiBsb2NhdGlvblV1aWQsXG4gICAgICAgICAgICAgIHByb2dyYW1WaXNpdEVuY291bnRlcjogdXJsUGFyYW1zXG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgX2RhdGEubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5jb3VudCA9IGRhdGFbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBkYXRhW2luZGV4XS5jb3VudC5zY2hlZHVsZWQgOiAwO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHMgPSBfZGF0YTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXNldFByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuYXBwb2ludG1lbnRzID0gW107XG4gICAgdGhpcy50b2RheSA9ICcnO1xuICB9XG59XG4iXX0=