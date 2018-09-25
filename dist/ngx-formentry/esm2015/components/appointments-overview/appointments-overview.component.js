/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
const /** @type {?} */ moment = moment_;
export class AppointmentsOverviewComponent {
    constructor() {
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
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.node.control.valueChanges.subscribe((v) => {
            this.resetProperties();
            const /** @type {?} */ node = this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                console.log('what change is here', this.showAppointments);
                if (!this.showAppointments) {
                    this.loadingAppointments = true;
                    this.showAppointments = true;
                    let /** @type {?} */ dataSource;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    const /** @type {?} */ locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        const /** @type {?} */ startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        const /** @type {?} */ endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        this.today = moment(v).format('DD-MM-YYYY');
                        // create 5 week days
                        const /** @type {?} */ _data = [];
                        const /** @type {?} */ params = {
                            'programType': ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                                '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                                '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838']
                        };
                        const /** @type {?} */ urlParams = encodeURI(JSON.stringify(params));
                        for (let /** @type {?} */ i = 1; i <= 5; i++) {
                            _data.push({
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
                        }).subscribe((data) => {
                            this.appointmentsLoaded = true;
                            this.loadingAppointments = false;
                            _data.map((appointment, index) => {
                                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
                            });
                            this.appointments = _data;
                        }, (error) => {
                            this.loadingAppointments = false;
                            this.errorLoadingAppointments = true;
                            this.showAppointments = false;
                            console.error(error);
                        });
                    }
                    else {
                        this.showAppointments = false;
                        this.errorLoadingAppointments = true;
                    }
                }
            }
        });
    }
    /**
     * @return {?}
     */
    resetProperties() {
        this.loadingAppointments = false;
        this.appointmentsLoaded = false;
        this.errorLoadingAppointments = false;
        this.showAppointments = false;
        this.appointments = [];
        this.today = '';
    }
}
AppointmentsOverviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'appointments-overview',
                template: `<div *ngIf="showAppointments" class="appointments">
  <p *ngIf="loadingAppointments">
    <span *ngIf="!appointmentsLoaded && errorLoadingAppointments">Error checking appointments</span>
    <span *ngIf="loadingAppointments"><span
      class="fa fa-spinner fa-spin"></span>Checking appointments...</span>
  </p>
  <div *ngIf="appointmentsLoaded && !errorLoadingAppointments">
    <table *ngIf="appointments.length>0" class="table table-stripped table-bordered">
      <thead>
      <tr>
        <th *ngFor="let appointment of appointments" [ngClass]="{'active': appointment.date === today}">
          <span>{{appointment.date}}</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td *ngFor="let appointment of appointments"
            [ngClass]="{'active': appointment.date === today}">
          <span><strong><em>{{appointment.count}}</em></strong></span>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>
`,
                styles: [`.appointments{margin-top:12px;font-size:12px;color:#999}.appointments p{padding-top:12px}.appointments th{border-bottom:0!important;color:#333}.appointments td span,.appointments th span{display:block}.appointments td.active,.appointments th.active{background-color:#3c8dbc;color:#fff!important;padding:0}.appointments td.active span,.appointments th.active span{padding:4px}.appointments span.fa{display:inline-block;margin-right:7px}`]
            },] },
];
/** @nocollapse */
AppointmentsOverviewComponent.ctorParameters = () => [];
AppointmentsOverviewComponent.propDecorators = {
    "node": [{ type: Input },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7QUFFbEMsdUJBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQztBQWlDdkIsTUFBTTtJQVFKO2dDQU5tQixLQUFLO21DQUNGLEtBQUs7d0NBQ0EsS0FBSztrQ0FDWCxLQUFLOzRCQUNDLEVBQUU7cUJBQ3JCLEVBQUU7S0FFVDs7OztJQUVELFFBQVE7S0FDUDs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLHVCQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPO21CQUMzQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssc0NBQXNDO3VCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxLQUFLLHNDQUFzQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLElB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Q0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDakYsQ0FBQyxDQUFDOzRCQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO3lCQUMzQixFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7NEJBQ1gsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQzs0QkFDakMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLElBQUksQ0FBQzs0QkFDckMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQzs0QkFDOUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDdEIsQ0FBQyxDQUFDO3FCQUNKO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNOLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7d0JBQzlCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxJQUFJLENBQUM7cUJBQ3RDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztRQUN0QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO0tBQ2pCOzs7WUFsSEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EwQlg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMscWJBQXFiLENBQUM7YUFDaGM7Ozs7O3FCQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgTGVhZk5vZGUgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xyXG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XHJcblxyXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhcHBvaW50bWVudHMtb3ZlcnZpZXcnLFxyXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dBcHBvaW50bWVudHNcIiBjbGFzcz1cImFwcG9pbnRtZW50c1wiPlxyXG4gIDxwICpuZ0lmPVwibG9hZGluZ0FwcG9pbnRtZW50c1wiPlxyXG4gICAgPHNwYW4gKm5nSWY9XCIhYXBwb2ludG1lbnRzTG9hZGVkICYmIGVycm9yTG9hZGluZ0FwcG9pbnRtZW50c1wiPkVycm9yIGNoZWNraW5nIGFwcG9pbnRtZW50czwvc3Bhbj5cclxuICAgIDxzcGFuICpuZ0lmPVwibG9hZGluZ0FwcG9pbnRtZW50c1wiPjxzcGFuXHJcbiAgICAgIGNsYXNzPVwiZmEgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9zcGFuPkNoZWNraW5nIGFwcG9pbnRtZW50cy4uLjwvc3Bhbj5cclxuICA8L3A+XHJcbiAgPGRpdiAqbmdJZj1cImFwcG9pbnRtZW50c0xvYWRlZCAmJiAhZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzXCI+XHJcbiAgICA8dGFibGUgKm5nSWY9XCJhcHBvaW50bWVudHMubGVuZ3RoPjBcIiBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwcGVkIHRhYmxlLWJvcmRlcmVkXCI+XHJcbiAgICAgIDx0aGVhZD5cclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgYXBwb2ludG1lbnQgb2YgYXBwb2ludG1lbnRzXCIgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBhcHBvaW50bWVudC5kYXRlID09PSB0b2RheX1cIj5cclxuICAgICAgICAgIDxzcGFuPnt7YXBwb2ludG1lbnQuZGF0ZX19PC9zcGFuPlxyXG4gICAgICAgIDwvdGg+XHJcbiAgICAgIDwvdHI+XHJcbiAgICAgIDwvdGhlYWQ+XHJcbiAgICAgIDx0Ym9keT5cclxuICAgICAgPHRyPlxyXG4gICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgYXBwb2ludG1lbnQgb2YgYXBwb2ludG1lbnRzXCJcclxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieydhY3RpdmUnOiBhcHBvaW50bWVudC5kYXRlID09PSB0b2RheX1cIj5cclxuICAgICAgICAgIDxzcGFuPjxzdHJvbmc+PGVtPnt7YXBwb2ludG1lbnQuY291bnR9fTwvZW0+PC9zdHJvbmc+PC9zcGFuPlxyXG4gICAgICAgIDwvdGQ+XHJcbiAgICAgIDwvdHI+XHJcbiAgICAgIDwvdGJvZHk+XHJcbiAgICA8L3RhYmxlPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuYCxcclxuICBzdHlsZXM6IFtgLmFwcG9pbnRtZW50c3ttYXJnaW4tdG9wOjEycHg7Zm9udC1zaXplOjEycHg7Y29sb3I6Izk5OX0uYXBwb2ludG1lbnRzIHB7cGFkZGluZy10b3A6MTJweH0uYXBwb2ludG1lbnRzIHRoe2JvcmRlci1ib3R0b206MCFpbXBvcnRhbnQ7Y29sb3I6IzMzM30uYXBwb2ludG1lbnRzIHRkIHNwYW4sLmFwcG9pbnRtZW50cyB0aCBzcGFue2Rpc3BsYXk6YmxvY2t9LmFwcG9pbnRtZW50cyB0ZC5hY3RpdmUsLmFwcG9pbnRtZW50cyB0aC5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojM2M4ZGJjO2NvbG9yOiNmZmYhaW1wb3J0YW50O3BhZGRpbmc6MH0uYXBwb2ludG1lbnRzIHRkLmFjdGl2ZSBzcGFuLC5hcHBvaW50bWVudHMgdGguYWN0aXZlIHNwYW57cGFkZGluZzo0cHh9LmFwcG9pbnRtZW50cyBzcGFuLmZhe2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo3cHh9YF1cclxufSlcclxuZXhwb3J0IGNsYXNzIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIEBJbnB1dCgpIG5vZGU6IExlYWZOb2RlO1xyXG4gIHNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICBsb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XHJcbiAgYXBwb2ludG1lbnRzOiBBcnJheTxhbnk+ID0gW107XHJcbiAgdG9kYXkgPSAnJztcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCkge1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKSB7XHJcbiAgICB0aGlzLm5vZGUuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2KSA9PiB7XHJcbiAgICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKCk7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLm5vZGU7XHJcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdFxyXG4gICAgICAgICYmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT0gJ2E4YTY2NmJhLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCdcclxuICAgICAgICB8fCBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT0gJ2E4OWQyMzk4LTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3doYXQgY2hhbmdlIGlzIGhlcmUnLCB0aGlzLnNob3dBcHBvaW50bWVudHMpO1xyXG4gICAgICAgIGlmICghdGhpcy5zaG93QXBwb2ludG1lbnRzKSB7XHJcbiAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gdHJ1ZTtcclxuICAgICAgICAgIGxldCBkYXRhU291cmNlO1xyXG4gICAgICAgICAgaWYgKG5vZGUuZm9ybSAmJiBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMpIHtcclxuICAgICAgICAgICAgZGF0YVNvdXJjZSA9IG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5tb250aGx5U2NoZWR1bGVSZXNvdXJjZVNlcnZpY2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBsb2NhdGlvblV1aWQgPSBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMudXNlckxvY2F0aW9uLnV1aWQ7XHJcbiAgICAgICAgICBpZiAoZGF0YVNvdXJjZSAmJiBsb2NhdGlvblV1aWQpIHtcclxuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHYpLnN0YXJ0T2YoJ3dlZWsnKS5hZGQoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICBjb25zdCBlbmREYXRlID0gbW9tZW50KHYpLmVuZE9mKCd3ZWVrJykuc3VidHJhY3QoMSwgJ2RheScpLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xyXG4gICAgICAgICAgICB0aGlzLnRvZGF5ID0gbW9tZW50KHYpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xyXG4gICAgICAgICAgICAvLyBjcmVhdGUgNSB3ZWVrIGRheXNcclxuICAgICAgICAgICAgY29uc3QgX2RhdGEgPSBbXTtcclxuICAgICAgICAgICAgY29uc3QgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICAgICdwcm9ncmFtVHlwZSc6IFsnNzgxZDg1YjAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JywgJzc4MWQ4OTdhLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXHJcbiAgICAgICAgICAgICAgJzk2MDQ3YWFmLTdhYjMtNDVlOS1iZTZhLWI2MTgxMGZlNjE3ZCcsICdjMTlhZWM2Ni0xYTQwLTQ1ODgtOWIwMy1iNmJlNTVhOGRkMWQnLCAnZjc3OTNkNDItMTFhYy00Y2ZkLTliMzUtZTBhMjFhN2E3YzMxJyxcclxuICAgICAgICAgICAgICAnMzM0YzllOTgtMTczZi00NDU0LWE4Y2UtZjgwYjIwYjdmZGYwJywgJzk2YmEyNzliLWIyM2ItNGU3OC1hYmE5LWRjYmQ0NmE5NmI3YicsICc3ODFkODg4MC0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCB1cmxQYXJhbXMgPSBlbmNvZGVVUkkoSlNPTi5zdHJpbmdpZnkocGFyYW1zKSk7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDU7IGkrKykge1xyXG4gICAgICAgICAgICAgIF9kYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KHYpLnN0YXJ0T2YoJ3dlZWsnKS5hZGQoaSwgJ2RheScpLmZvcm1hdCgnREQtTU0tWVlZWScpLFxyXG4gICAgICAgICAgICAgICAgY291bnQ6IDBcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkYXRhU291cmNlLmdldE1vbnRobHlTY2hlZHVsZSh7XHJcbiAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXHJcbiAgICAgICAgICAgICAgZW5kRGF0ZTogZW5kRGF0ZSxcclxuICAgICAgICAgICAgICBsaW1pdDogNSxcclxuICAgICAgICAgICAgICBsb2NhdGlvblV1aWRzOiBsb2NhdGlvblV1aWQsXHJcbiAgICAgICAgICAgICAgcHJvZ3JhbVZpc2l0RW5jb3VudGVyOiB1cmxQYXJhbXNcclxuICAgICAgICAgICAgfSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIF9kYXRhLm1hcCgoYXBwb2ludG1lbnQsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5jb3VudCA9IGRhdGFbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBkYXRhW2luZGV4XS5jb3VudC5zY2hlZHVsZWQgOiAwO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzID0gX2RhdGE7XHJcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXNldFByb3BlcnRpZXMoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcclxuICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XHJcbiAgICB0aGlzLmFwcG9pbnRtZW50cyA9IFtdO1xyXG4gICAgdGhpcy50b2RheSA9ICcnO1xyXG4gIH1cclxufVxyXG4iXX0=