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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhbXBhdGgta2VueWEvbmd4LW9wZW5tcnMtZm9ybWVudHJ5LyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9hcHBvaW50bWVudHMtb3ZlcnZpZXcvYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFPdkI7SUFRRTtRQU5BLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUM5QixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBRVgsQ0FBQztJQUVELGdEQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsbURBQVcsR0FBWDtRQUFBLGlCQTBEQztRQXpEQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBTSxJQUFJLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPO21CQUMzQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssc0NBQXNDO3VCQUN4RixJQUFJLENBQUMs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QUFLLENBQUM7d0JBQzVCLENBQUMsRUFBRSxVQUFDLEtBQUs7NEJBQ1AsS0FBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs0QkFDakMsS0FBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQzs0QkFDckMsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs0QkFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt3QkFDdkIsQ0FBQyxDQUFDLENBQUM7cUJBQ0o7eUJBQU07d0JBQ0wsS0FBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzt3QkFDOUIsS0FBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQztxQkFDdEM7aUJBQ0Y7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHVEQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFoRlE7UUFBUixLQUFLLEVBQUU7MENBQU8sUUFBUTsrREFBQztJQURiLDZCQUE2QjtRQUx6QyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsdUJBQXVCO1lBQ2pDLGlnQ0FBcUQ7O1NBRXRELENBQUM7O09BQ1csNkJBQTZCLENBa0Z6QztJQUFELG9DQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0FsRlksNkJBQTZCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGVhZk5vZGUgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHBvaW50bWVudHMtb3ZlcnZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbm9kZTogTGVhZk5vZGU7XG4gIHNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgbG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBlcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gIGFwcG9pbnRtZW50czogQXJyYXk8YW55PiA9IFtdO1xuICB0b2RheSA9ICcnO1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgdGhpcy5ub2RlLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgodikgPT4ge1xuICAgICAgdGhpcy5yZXNldFByb3BlcnRpZXMoKTtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XG4gICAgICBpZiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHRcbiAgICAgICAgJiYgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PSAnYThhNjY2YmEtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4J1xuICAgICAgICB8fCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT0gJ2E4OWQyMzk4LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcpKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3aGF0IGNoYW5nZSBpcyBoZXJlJywgdGhpcy5zaG93QXBwb2ludG1lbnRzKTtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBvaW50bWVudHMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgbGV0IGRhdGFTb3VyY2U7XG4gICAgICAgICAgaWYgKG5vZGUuZm9ybSAmJiBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMpIHtcbiAgICAgICAgICAgIGRhdGFTb3VyY2UgPSBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMubW9udGhseVNjaGVkdWxlUmVzb3VyY2VTZXJ2aWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsb2NhdGlvblV1aWQgPSBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMudXNlckxvY2F0aW9uLnV1aWQ7XG4gICAgICAgICAgaWYgKGRhdGFTb3VyY2UgJiYgbG9jYXRpb25VdWlkKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydERhdGUgPSBtb21lbnQodikuc3RhcnRPZignd2VlaycpLmFkZCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICAgICAgICBjb25zdCBlbmREYXRlID0gbW9tZW50KHYpLmVuZE9mKCd3ZWVrJykuc3VidHJhY3QoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgdGhpcy50b2RheSA9IG1vbWVudCh2KS5mb3JtYXQoJ0RELU1NLVlZWVknKTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSA1IHdlZWsgZGF5c1xuICAgICAgICAgICAgY29uc3QgX2RhdGEgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHByb2dyYW1UeXBlcyA9IFsnNzgxZDg1YjAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JywgJzc4MWQ4OTdhLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgICAgICAgICc5NjA0N2FhZi03YWIzLTQ1ZTktYmU2YS1iNjE4MTBmZTYxN2QnLCAnYzE5YWVjNjYtMWE0MC00NTg4LTliMDMtYjZiZTU1YThkZDFkJywgJ2Y3NzkzZDQyLTExYWMtNGNmZC05YjM1LWUwYTIxYTdhN2MzMScsXG4gICAgICAgICAgICAgICczMzRjOWU5OC0xNzNmLTQ0NTQtYThjZS1mODBiMjBiN2ZkZjAnLCAnOTZiYTI3OWItYjIzYi00ZTc4LWFiYTktZGNiZDQ2YTk2YjdiJywgJzc4MWQ4ODgwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCddO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3JhbVR5cGVQYXJhbXMgPSBwcm9ncmFtVHlwZXMuam9pbigpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gNTsgaSsrKSB7XG4gICAgICAgICAgICAgIF9kYXRhLnB1c2goe1xuICAgICAgICAgICAgICAgIGRhdGU6IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKGksICdkYXknKS5mb3JtYXQoJ0RELU1NLVlZWVknKSxcbiAgICAgICAgICAgICAgICBjb3VudDogMFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGFTb3VyY2UuZ2V0TW9udGhseVNjaGVkdWxlKHtcbiAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXG4gICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgIGxpbWl0OiA1LFxuICAgICAgICAgICAgICBsb2NhdGlvblV1aWRzOiBsb2NhdGlvblV1aWQsXG4gICAgICAgICAgICAgIHByb2dyYW1UeXBlOiBwcm9ncmFtVHlwZVBhcmFtc1xuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIF9kYXRhLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgYXBwb2ludG1lbnQuY291bnQgPSBkYXRhW2luZGV4XSAhPT0gdW5kZWZpbmVkID8gZGF0YVtpbmRleF0uY291bnQuc2NoZWR1bGVkIDogMDtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gX2RhdGE7XG4gICAgICAgICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLmFwcG9pbnRtZW50cyA9IFtdO1xuICAgIHRoaXMudG9kYXkgPSAnJztcbiAgfVxufVxuIl19