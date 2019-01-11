/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.node.control.valueChanges.subscribe(function (v) {
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
                }] }
    ];
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O0lBRTVCLE1BQU0sR0FBRyxPQUFPO0FBRXRCO0lBYUU7UUFOQSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBZSxFQUFFLENBQUM7UUFDOUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUVYLENBQUM7Ozs7SUFFRCxnREFBUTs7O0lBQVI7SUFDQSxDQUFDOzs7O0lBRUQsbURBQVc7OztJQUFYO1FBQUEsaUJBMERDO1FBekRDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQzs7Z0JBQ2pCLElBQUksR0FBRyxLQUFJLENBQUMsSUFBSTtZQUN0QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPO21CQUMzQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssc0NBQXNDO3VCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FB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d0IsR0FBRyxJQUFJLENBQUM7NEJBQ3JDLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7NEJBQzlCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNO3dCQUNMLEtBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzlCLEtBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCx1REFBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7O2dCQXRGRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsaWdDQUFxRDs7aUJBRXREOzs7Ozt1QkFFRSxLQUFLOztJQWlGUixvQ0FBQztDQUFBLEFBdkZELElBdUZDO1NBbEZZLDZCQUE2Qjs7O0lBQ3hDLDZDQUF3Qjs7SUFDeEIseURBQXlCOztJQUN6Qiw0REFBNEI7O0lBQzVCLGlFQUFpQzs7SUFDakMsMkRBQTJCOztJQUMzQixxREFBOEI7O0lBQzlCLDhDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGVhZk5vZGUgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHBvaW50bWVudHMtb3ZlcnZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbm9kZTogTGVhZk5vZGU7XG4gIHNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgbG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBlcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gIGFwcG9pbnRtZW50czogQXJyYXk8YW55PiA9IFtdO1xuICB0b2RheSA9ICcnO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5ub2RlLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodikgPT4ge1xuICAgICAgdGhpcy5yZXNldFByb3BlcnRpZXMoKTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcbiAgICAgICAgJiYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PSAnYThhNjY2YmEtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4J1xuICAgICAgICB8fCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT0gJ2E4OWQyMzk4LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcpKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3aGF0IGNoYW5nZSBpcyBoZXJlJywgdGhpcy5zaG93QXBwb2ludG1lbnRzKTtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBvaW50bWVudHMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgbGV0IGRhdGFTb3VyY2U7XG4gICAgICAgICAgaWYgKG5vZGUuZm9ybSAmJiBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMpIHtcbiAgICAgICAgICAgIGRhdGFTb3VyY2UgPSBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMubW9udGhseVNjaGVkdWxlUmVzb3VyY2VTZXJ2aWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsb2NhdGlvblV1aWQgPSBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMudXNlckxvY2F0aW9uLnV1aWQ7XG4gICAgICAgICAgaWYgKGRhdGFTb3VyY2UgJiYgbG9jYXRpb25VdWlkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGUgPSBtb21lbnQodikuc3RhcnRPZignd2VlaycpLmFkZCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlID0gbW9tZW50KHYpLmVuZE9mKCd3ZWVrJykuc3VidHJhY3QoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgdGhpcy50b2RheSA9IG1vbWVudCh2KS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSA1IHdlZWsgZGF5c1xuICAgICAgICAgICAgY29uc3QgX2RhdGEgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyYW1UeXBlcyA9IFsnNzgxZDg1YjAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JywgJzc4MWQ4OTdhLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgICAgICAgICc5NjA0N2FhZi03YWIzLTQ1ZTktYmU2YS1iNjE4MTBmZTYxN2QnLCAnYzE5YWVjNjYtMWE0MC00NTg4LTliMDMtYjZiZTU1YThkZDFkJywgJ2Y3NzkzZDQyLTExYWMtNGNmZC05YjM1LWUwYTIxYTdhN2MzMScsXG4gICAgICAgICAgICAgICczMzRjOWU5OC0xNzNmLTQ0NTQtYThjZS1mODBiMjBiN2ZkZjAnLCAnOTZiYTI3OWItYjIzYi00ZTc4LWFiYTktZGNiZDQ2YTk2YjdiJywgJzc4MWQ4ODgwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCddO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3JhbVR5cGVQYXJhbXMgPSBwcm9ncmFtVHlwZXMuam9pbigpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICAgIF9kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKGksICdkYXknKS5mb3JtYXQoJ0RELU1NLVlZWVknKSxcbiAgICAgICAgICAgICAgICBjb3VudDogMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFTb3VyY2UuZ2V0TW9udGhseVNjaGVkdWxlKHtcbiAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXG4gICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgIGxpbWl0OiA1LFxuICAgICAgICAgICAgICBsb2NhdGlvblV1aWRzOiBsb2NhdGlvblV1aWQsXG4gICAgICAgICAgICAgIHByb2dyYW1UeXBlOiBwcm9ncmFtVHlwZVBhcmFtc1xuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIF9kYXRhLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQuY291bnQgPSBkYXRhW2luZGV4XSAhPT0gdW5kZWZpbmVkID8gZGF0YVtpbmRleF0uY291bnQuc2NoZWR1bGVkIDogMDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gX2RhdGE7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLmFwcG9pbnRtZW50cyA9IFtdO1xuICAgIHRoaXMudG9kYXkgPSAnJztcbiAgfVxufVxuIl19