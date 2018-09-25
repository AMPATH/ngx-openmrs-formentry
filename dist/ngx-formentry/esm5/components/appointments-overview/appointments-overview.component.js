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
                console.log('what change is here', _this.showAppointments);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMscUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQzs7SUF5Q3JCO2dDQU5tQixLQUFLO21DQUNGLEtBQUs7d0NBQ0EsS0FBSztrQ0FDWCxLQUFLOzRCQUNDLEVBQUU7cUJBQ3JCLEVBQUU7S0FFVDs7OztJQUVELGdEQUFROzs7SUFBUjtLQUNDOzs7O0lBRUQsbURBQVc7OztJQUFYO1FBQUEsaUJBNERDO1FBM0RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixxQkFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQztZQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTzttQkFDM0MsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLHNDQUFzQzt1QkFDeEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxzQ0FBc0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFB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U0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ2pGLENBQUMsQ0FBQzs0QkFDSCxLQUFJLENBQUMsWUFBWSxHQUFHLE9BQUssQ0FBQzt5QkFDM0IsRUFBRSxVQUFDLEtBQUs7NEJBQ1AsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs0QkFDakMsS0FBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQzs0QkFDckMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs0QkFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDdEIsQ0FBQyxDQUFDO3FCQUNKO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzlCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVELHVEQUFlOzs7SUFBZjtRQUNFLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDakMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7S0FDakI7O2dCQWxIRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsUUFBUSxFQUFFLHUvQkEwQlg7b0JBQ0MsTUFBTSxFQUFFLENBQUMscWJBQXFiLENBQUM7aUJBQ2hjOzs7Ozt5QkFFRSxLQUFLOzt3Q0F2Q1I7O1NBc0NhLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBMZWFmTm9kZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XHJcbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcclxuXHJcbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2FwcG9pbnRtZW50cy1vdmVydmlldycsXHJcbiAgdGVtcGxhdGU6IGA8ZGl2ICpuZ0lmPVwic2hvd0FwcG9pbnRtZW50c1wiIGNsYXNzPVwiYXBwb2ludG1lbnRzXCI+XHJcbiAgPHAgKm5nSWY9XCJsb2FkaW5nQXBwb2ludG1lbnRzXCI+XHJcbiAgICA8c3BhbiAqbmdJZj1cIiFhcHBvaW50bWVudHNMb2FkZWQgJiYgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzXCI+RXJyb3IgY2hlY2tpbmcgYXBwb2ludG1lbnRzPC9zcGFuPlxyXG4gICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nQXBwb2ludG1lbnRzXCI+PHNwYW5cclxuICAgICAgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIj48L3NwYW4+Q2hlY2tpbmcgYXBwb2ludG1lbnRzLi4uPC9zcGFuPlxyXG4gIDwvcD5cclxuICA8ZGl2ICpuZ0lmPVwiYXBwb2ludG1lbnRzTG9hZGVkICYmICFlcnJvckxvYWRpbmdBcHBvaW50bWVudHNcIj5cclxuICAgIDx0YWJsZSAqbmdJZj1cImFwcG9pbnRtZW50cy5sZW5ndGg+MFwiIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBwZWQgdGFibGUtYm9yZGVyZWRcIj5cclxuICAgICAgPHRoZWFkPlxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBhcHBvaW50bWVudCBvZiBhcHBvaW50bWVudHNcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGFwcG9pbnRtZW50LmRhdGUgPT09IHRvZGF5fVwiPlxyXG4gICAgICAgICAgPHNwYW4+e3thcHBvaW50bWVudC5kYXRlfX08L3NwYW4+XHJcbiAgICAgICAgPC90aD5cclxuICAgICAgPC90cj5cclxuICAgICAgPC90aGVhZD5cclxuICAgICAgPHRib2R5PlxyXG4gICAgICA8dHI+XHJcbiAgICAgICAgPHRkICpuZ0Zvcj1cImxldCBhcHBvaW50bWVudCBvZiBhcHBvaW50bWVudHNcIlxyXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGFwcG9pbnRtZW50LmRhdGUgPT09IHRvZGF5fVwiPlxyXG4gICAgICAgICAgPHNwYW4+PHN0cm9uZz48ZW0+e3thcHBvaW50bWVudC5jb3VudH19PC9lbT48L3N0cm9uZz48L3NwYW4+XHJcbiAgICAgICAgPC90ZD5cclxuICAgICAgPC90cj5cclxuICAgICAgPC90Ym9keT5cclxuICAgIDwvdGFibGU+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG5gLFxyXG4gIHN0eWxlczogW2AuYXBwb2ludG1lbnRze21hcmdpbi10b3A6MTJweDtmb250LXNpemU6MTJweDtjb2xvcjojOTk5fS5hcHBvaW50bWVudHMgcHtwYWRkaW5nLXRvcDoxMnB4fS5hcHBvaW50bWVudHMgdGh7Ym9yZGVyLWJvdHRvbTowIWltcG9ydGFudDtjb2xvcjojMzMzfS5hcHBvaW50bWVudHMgdGQgc3BhbiwuYXBwb2ludG1lbnRzIHRoIHNwYW57ZGlzcGxheTpibG9ja30uYXBwb2ludG1lbnRzIHRkLmFjdGl2ZSwuYXBwb2ludG1lbnRzIHRoLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiMzYzhkYmM7Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7cGFkZGluZzowfS5hcHBvaW50bWVudHMgdGQuYWN0aXZlIHNwYW4sLmFwcG9pbnRtZW50cyB0aC5hY3RpdmUgc3BhbntwYWRkaW5nOjRweH0uYXBwb2ludG1lbnRzIHNwYW4uZmF7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjdweH1gXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XHJcbiAgQElucHV0KCkgbm9kZTogTGVhZk5vZGU7XHJcbiAgc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gIGxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICBlcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICBhcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcclxuICBhcHBvaW50bWVudHM6IEFycmF5PGFueT4gPSBbXTtcclxuICB0b2RheSA9ICcnO1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcygpIHtcclxuICAgIHRoaXMubm9kZS5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHYpID0+IHtcclxuICAgICAgdGhpcy5yZXNldFByb3BlcnRpZXMoKTtcclxuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcclxuICAgICAgaWYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0XHJcbiAgICAgICAgJiYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PSAnYThhNjY2YmEtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4J1xyXG4gICAgICAgIHx8IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PSAnYTg5ZDIzOTgtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JykpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnd2hhdCBjaGFuZ2UgaXMgaGVyZScsIHRoaXMuc2hvd0FwcG9pbnRtZW50cyk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBvaW50bWVudHMpIHtcclxuICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XHJcbiAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgbGV0IGRhdGFTb3VyY2U7XHJcbiAgICAgICAgICBpZiAobm9kZS5mb3JtICYmIG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcykge1xyXG4gICAgICAgICAgICBkYXRhU291cmNlID0gbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLm1vbnRobHlTY2hlZHVsZVJlc291cmNlU2VydmljZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVXVpZCA9IG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy51c2VyTG9jYXRpb24udXVpZDtcclxuICAgICAgICAgIGlmIChkYXRhU291cmNlICYmIGxvY2F0aW9uVXVpZCkge1xyXG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGUgPSBtb21lbnQodikuc3RhcnRPZignd2VlaycpLmFkZCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGUgPSBtb21lbnQodikuZW5kT2YoJ3dlZWsnKS5zdWJ0cmFjdCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XHJcbiAgICAgICAgICAgIHRoaXMudG9kYXkgPSBtb21lbnQodikuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XHJcbiAgICAgICAgICAgIC8vIGNyZWF0ZSA1IHdlZWsgZGF5c1xyXG4gICAgICAgICAgICBjb25zdCBfZGF0YSA9IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBwYXJhbXMgPSB7XHJcbiAgICAgICAgICAgICAgJ3Byb2dyYW1UeXBlJzogWyc3ODFkODViMC0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLCAnNzgxZDg5N2EtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcclxuICAgICAgICAgICAgICAnOTYwNDdhYWYtN2FiMy00NWU5LWJlNmEtYjYxODEwZmU2MTdkJywgJ2MxOWFlYzY2LTFhNDAtNDU4OC05YjAzLWI2YmU1NWE4ZGQxZCcsICdmNzc5M2Q0Mi0xMWFjLTRjZmQtOWIzNS1lMGEyMWE3YTdjMzEnLFxyXG4gICAgICAgICAgICAgICczMzRjOWU5OC0xNzNmLTQ0NTQtYThjZS1mODBiMjBiN2ZkZjAnLCAnOTZiYTI3OWItYjIzYi00ZTc4LWFiYTktZGNiZDQ2YTk2YjdiJywgJzc4MWQ4ODgwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCddXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnN0IHVybFBhcmFtcyA9IGVuY29kZVVSSShKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgX2RhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBkYXRlOiBtb21lbnQodikuc3RhcnRPZignd2VlaycpLmFkZChpLCAnZGF5JykuZm9ybWF0KCdERC1NTS1ZWVlZJyksXHJcbiAgICAgICAgICAgICAgICBjb3VudDogMFxyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2UuZ2V0TW9udGhseVNjaGVkdWxlKHtcclxuICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSxcclxuICAgICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlLFxyXG4gICAgICAgICAgICAgIGxpbWl0OiA1LFxyXG4gICAgICAgICAgICAgIGxvY2F0aW9uVXVpZHM6IGxvY2F0aW9uVXVpZCxcclxuICAgICAgICAgICAgICBwcm9ncmFtVmlzaXRFbmNvdW50ZXI6IHVybFBhcmFtc1xyXG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50c0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgX2RhdGEubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LmNvdW50ID0gZGF0YVtpbmRleF0gIT09IHVuZGVmaW5lZCA/IGRhdGFbaW5kZXhdLmNvdW50LnNjaGVkdWxlZCA6IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHMgPSBfZGF0YTtcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2V0UHJvcGVydGllcygpIHtcclxuICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICAgIHRoaXMuYXBwb2ludG1lbnRzID0gW107XHJcbiAgICB0aGlzLnRvZGF5ID0gJyc7XHJcbiAgfVxyXG59XHJcbiJdfQ==