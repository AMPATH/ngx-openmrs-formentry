/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
/** @type {?} */
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
        this.node.control.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            _this.resetProperties();
            /** @type {?} */
            var node = _this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!_this.showAppointments) {
                    _this.loadingAppointments = true;
                    _this.showAppointments = true;
                    /** @type {?} */
                    var dataSource = void 0;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    /** @type {?} */
                    var locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        /** @type {?} */
                        var startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        /** @type {?} */
                        var endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        _this.today = moment(v).format('DD-MM-YYYY');
                        // create 5 week days
                        /** @type {?} */
                        var _data_1 = [];
                        /** @type {?} */
                        var programTypes = ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                            '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                            '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838'];
                        /** @type {?} */
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
                        }).subscribe((/**
                         * @param {?} data
                         * @return {?}
                         */
                        function (data) {
                            _this.appointmentsLoaded = true;
                            _this.loadingAppointments = false;
                            _data_1.map((/**
                             * @param {?} appointment
                             * @param {?} index
                             * @return {?}
                             */
                            function (appointment, index) {
                                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
                            }));
                            _this.appointments = _data_1;
                        }), (/**
                         * @param {?} error
                         * @return {?}
                         */
                        function (error) {
                            _this.loadingAppointments = false;
                            _this.errorLoadingAppointments = true;
                            _this.showAppointments = false;
                            console.error(error);
                        }));
                    }
                    else {
                        _this.showAppointments = false;
                        _this.errorLoadingAppointments = true;
                    }
                }
            }
        }));
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
    AppointmentsOverviewComponent.ctorParameters = function () { return []; };
    AppointmentsOverviewComponent.propDecorators = {
        node: [{ type: Input }]
    };
    return AppointmentsOverviewComponent;
}());
export { AppointmentsOverviewComponent };
if (false) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBdUNFO1FBTkEscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLHdCQUFtQixHQUFHLEtBQUssQ0FBQztRQUM1Qiw2QkFBd0IsR0FBRyxLQUFLLENBQUM7UUFDakMsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQzNCLGlCQUFZLEdBQWUsRUFBRSxDQUFDO1FBQzlCLFVBQUssR0FBRyxFQUFFLENBQUM7SUFFWCxDQUFDOzs7O0lBRUQsZ0RBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELG1EQUFXOzs7SUFBWDtRQUFBLGlCQTBEQztRQXpEQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLFVBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O2dCQUNqQixJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUk7WUFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU87bUJBQzNDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU8sS0FBSyxzQ0FBc0M7dUJBQ3hGLElBQUksQ0FBQyxRQUFR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QTJCOztJQUMzQixxREFBOEI7O0lBQzlCLDhDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IExlYWZOb2RlIH0gZnJvbSAnLi4vLi4vZm9ybS1lbnRyeS9mb3JtLWZhY3RvcnkvZm9ybS1ub2RlJztcclxuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xyXG5cclxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYXBwb2ludG1lbnRzLW92ZXJ2aWV3JyxcclxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJzaG93QXBwb2ludG1lbnRzXCIgY2xhc3M9XCJhcHBvaW50bWVudHNcIj5cclxuICA8cCAqbmdJZj1cImxvYWRpbmdBcHBvaW50bWVudHNcIj5cclxuICAgIDxzcGFuICpuZ0lmPVwiIWFwcG9pbnRtZW50c0xvYWRlZCAmJiBlcnJvckxvYWRpbmdBcHBvaW50bWVudHNcIj5FcnJvciBjaGVja2luZyBhcHBvaW50bWVudHM8L3NwYW4+XHJcbiAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdBcHBvaW50bWVudHNcIj48c3BhblxyXG4gICAgICBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvc3Bhbj5DaGVja2luZyBhcHBvaW50bWVudHMuLi48L3NwYW4+XHJcbiAgPC9wPlxyXG4gIDxkaXYgKm5nSWY9XCJhcHBvaW50bWVudHNMb2FkZWQgJiYgIWVycm9yTG9hZGluZ0FwcG9pbnRtZW50c1wiPlxyXG4gICAgPHRhYmxlICpuZ0lmPVwiYXBwb2ludG1lbnRzLmxlbmd0aD4wXCIgY2xhc3M9XCJ0YWJsZSB0YWJsZS1zdHJpcHBlZCB0YWJsZS1ib3JkZXJlZFwiPlxyXG4gICAgICA8dGhlYWQ+XHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGggKm5nRm9yPVwibGV0IGFwcG9pbnRtZW50IG9mIGFwcG9pbnRtZW50c1wiIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogYXBwb2ludG1lbnQuZGF0ZSA9PT0gdG9kYXl9XCI+XHJcbiAgICAgICAgICA8c3Bhbj57e2FwcG9pbnRtZW50LmRhdGV9fTwvc3Bhbj5cclxuICAgICAgICA8L3RoPlxyXG4gICAgICA8L3RyPlxyXG4gICAgICA8L3RoZWFkPlxyXG4gICAgICA8dGJvZHk+XHJcbiAgICAgIDx0cj5cclxuICAgICAgICA8dGQgKm5nRm9yPVwibGV0IGFwcG9pbnRtZW50IG9mIGFwcG9pbnRtZW50c1wiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogYXBwb2ludG1lbnQuZGF0ZSA9PT0gdG9kYXl9XCI+XHJcbiAgICAgICAgICA8c3Bhbj48c3Ryb25nPjxlbT57e2FwcG9pbnRtZW50LmNvdW50fX08L2VtPjwvc3Ryb25nPjwvc3Bhbj5cclxuICAgICAgICA8L3RkPlxyXG4gICAgICA8L3RyPlxyXG4gICAgICA8L3Rib2R5PlxyXG4gICAgPC90YWJsZT5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbmAsXHJcbiAgc3R5bGVzOiBbYC5hcHBvaW50bWVudHN7bWFyZ2luLXRvcDoxMnB4O2ZvbnQtc2l6ZToxMnB4O2NvbG9yOiM5OTl9LmFwcG9pbnRtZW50cyBwe3BhZGRpbmctdG9wOjEycHh9LmFwcG9pbnRtZW50cyB0aHtib3JkZXItYm90dG9tOjAhaW1wb3J0YW50O2NvbG9yOiMzMzN9LmFwcG9pbnRtZW50cyB0ZCBzcGFuLC5hcHBvaW50bWVudHMgdGggc3BhbntkaXNwbGF5OmJsb2NrfS5hcHBvaW50bWVudHMgdGQuYWN0aXZlLC5hcHBvaW50bWVudHMgdGguYWN0aXZle2JhY2tncm91bmQtY29sb3I6IzNjOGRiYztjb2xvcjojZmZmIWltcG9ydGFudDtwYWRkaW5nOjB9LmFwcG9pbnRtZW50cyB0ZC5hY3RpdmUgc3BhbiwuYXBwb2ludG1lbnRzIHRoLmFjdGl2ZSBzcGFue3BhZGRpbmc6NHB4fS5hcHBvaW50bWVudHMgc3Bhbi5mYXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6N3B4fWBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcclxuICBASW5wdXQoKSBub2RlOiBMZWFmTm9kZTtcclxuICBzaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgbG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gIGVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gIGFwcG9pbnRtZW50c0xvYWRlZCA9IGZhbHNlO1xyXG4gIGFwcG9pbnRtZW50czogQXJyYXk8YW55PiA9IFtdO1xyXG4gIHRvZGF5ID0gJyc7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgdGhpcy5ub2RlLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodikgPT4ge1xyXG4gICAgICB0aGlzLnJlc2V0UHJvcGVydGllcygpO1xyXG4gICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcclxuICAgICAgICAmJiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09ICdhOGE2NjZiYS0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXHJcbiAgICAgICAgfHwgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09ICdhODlkMjM5OC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnKSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3aGF0IGNoYW5nZSBpcyBoZXJlJywgdGhpcy5zaG93QXBwb2ludG1lbnRzKTtcclxuICAgICAgICBpZiAoIXRoaXMuc2hvd0FwcG9pbnRtZW50cykge1xyXG4gICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcclxuICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IHRydWU7XHJcbiAgICAgICAgICBsZXQgZGF0YVNvdXJjZTtcclxuICAgICAgICAgIGlmIChub2RlLmZvcm0gJiYgbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIGRhdGFTb3VyY2UgPSBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMubW9udGhseVNjaGVkdWxlUmVzb3VyY2VTZXJ2aWNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc3QgbG9jYXRpb25VdWlkID0gbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLnVzZXJMb2NhdGlvbi51dWlkO1xyXG4gICAgICAgICAgaWYgKGRhdGFTb3VyY2UgJiYgbG9jYXRpb25VdWlkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG1vbWVudCh2KS5lbmRPZignd2VlaycpLnN1YnRyYWN0KDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcclxuICAgICAgICAgICAgdGhpcy50b2RheSA9IG1vbWVudCh2KS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcclxuICAgICAgICAgICAgLy8gY3JlYXRlIDUgd2VlayBkYXlzXHJcbiAgICAgICAgICAgIGNvbnN0IF9kYXRhID0gW107XHJcbiAgICAgICAgICAgIGNvbnN0IHByb2dyYW1UeXBlcyA9IFsnNzgxZDg1YjAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JywgJzc4MWQ4OTdhLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXHJcbiAgICAgICAgICAgICAgJzk2MDQ3YWFmLTdhYjMtNDVlOS1iZTZhLWI2MTgxMGZlNjE3ZCcsICdjMTlhZWM2Ni0xYTQwLTQ1ODgtOWIwMy1iNmJlNTVhOGRkMWQnLCAnZjc3OTNkNDItMTFhYy00Y2ZkLTliMzUtZTBhMjFhN2E3YzMxJyxcclxuICAgICAgICAgICAgICAnMzM0YzllOTgtMTczZi00NDU0LWE4Y2UtZjgwYjIwYjdmZGYwJywgJzk2YmEyNzliLWIyM2ItNGU3OC1hYmE5LWRjYmQ0NmE5NmI3YicsICc3ODFkODg4MC0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXTtcclxuICAgICAgICAgICAgY29uc3QgcHJvZ3JhbVR5cGVQYXJhbXMgPSBwcm9ncmFtVHlwZXMuam9pbigpO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcclxuICAgICAgICAgICAgICBfZGF0YS5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKGksICdkYXknKS5mb3JtYXQoJ0RELU1NLVlZWVknKSxcclxuICAgICAgICAgICAgICAgIGNvdW50OiAwXHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGF0YVNvdXJjZS5nZXRNb250aGx5U2NoZWR1bGUoe1xyXG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxyXG4gICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXHJcbiAgICAgICAgICAgICAgbGltaXQ6IDUsXHJcbiAgICAgICAgICAgICAgbG9jYXRpb25VdWlkczogbG9jYXRpb25VdWlkLFxyXG4gICAgICAgICAgICAgIHByb2dyYW1UeXBlOiBwcm9ncmFtVHlwZVBhcmFtc1xyXG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50c0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgX2RhdGEubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFwcG9pbnRtZW50LmNvdW50ID0gZGF0YVtpbmRleF0gIT09IHVuZGVmaW5lZCA/IGRhdGFbaW5kZXhdLmNvdW50LnNjaGVkdWxlZCA6IDA7XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHMgPSBfZGF0YTtcclxuICAgICAgICAgICAgfSwgKGVycm9yKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHJlc2V0UHJvcGVydGllcygpIHtcclxuICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICAgIHRoaXMuYXBwb2ludG1lbnRzID0gW107XHJcbiAgICB0aGlzLnRvZGF5ID0gJyc7XHJcbiAgfVxyXG59XHJcbiJdfQ==