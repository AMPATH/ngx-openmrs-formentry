/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
/** @type {?} */
const moment = moment_;
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
        this.node.control.valueChanges.subscribe((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            this.resetProperties();
            /** @type {?} */
            const node = this.node;
            if (node.question.extras.questionOptions.concept
                && (node.question.extras.questionOptions.concept === 'a8a666ba-1350-11df-a1f1-0026b9348838'
                    || node.question.extras.questionOptions.concept === 'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!this.showAppointments) {
                    this.loadingAppointments = true;
                    this.showAppointments = true;
                    /** @type {?} */
                    let dataSource;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource = node.form.dataSourcesContainer.dataSources.monthlyScheduleResourceService;
                    }
                    /** @type {?} */
                    const locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        /** @type {?} */
                        const startDate = moment(v).startOf('week').add(1, 'day').format('YYYY-MM-DD');
                        /** @type {?} */
                        const endDate = moment(v).endOf('week').subtract(1, 'day').format('YYYY-MM-DD');
                        this.today = moment(v).format('DD-MM-YYYY');
                        // create 5 week days
                        /** @type {?} */
                        const _data = [];
                        /** @type {?} */
                        const programTypes = ['781d85b0-1359-11df-a1f1-0026b9348838', '781d897a-1359-11df-a1f1-0026b9348838',
                            '96047aaf-7ab3-45e9-be6a-b61810fe617d', 'c19aec66-1a40-4588-9b03-b6be55a8dd1d', 'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                            '334c9e98-173f-4454-a8ce-f80b20b7fdf0', '96ba279b-b23b-4e78-aba9-dcbd46a96b7b', '781d8880-1359-11df-a1f1-0026b9348838'];
                        /** @type {?} */
                        const programTypeParams = programTypes.join();
                        for (let i = 1; i <= 5; i++) {
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
                            programType: programTypeParams
                        }).subscribe((/**
                         * @param {?} data
                         * @return {?}
                         */
                        (data) => {
                            this.appointmentsLoaded = true;
                            this.loadingAppointments = false;
                            _data.map((/**
                             * @param {?} appointment
                             * @param {?} index
                             * @return {?}
                             */
                            (appointment, index) => {
                                appointment.count = data[index] !== undefined ? data[index].count.scheduled : 0;
                            }));
                            this.appointments = _data;
                        }), (/**
                         * @param {?} error
                         * @return {?}
                         */
                        (error) => {
                            this.loadingAppointments = false;
                            this.errorLoadingAppointments = true;
                            this.showAppointments = false;
                            console.error(error);
                        }));
                    }
                    else {
                        this.showAppointments = false;
                        this.errorLoadingAppointments = true;
                    }
                }
            }
        }));
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
AppointmentsOverviewComponent.ctorParameters = () => [];
AppointmentsOverviewComponent.propDecorators = {
    node: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFDbkUsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7O01BRTVCLE1BQU0sR0FBRyxPQUFPO0FBaUN0QixNQUFNO0lBUUo7UUFOQSxxQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDekIsd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBQzVCLDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQyx1QkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDM0IsaUJBQVksR0FBZSxFQUFFLENBQUM7UUFDOUIsVUFBSyxHQUFHLEVBQUUsQ0FBQztJQUVYLENBQUM7Ozs7SUFFRCxRQUFRO0lBQ1IsQ0FBQzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDOztrQkFDakIsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJO1lBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPO21CQUMzQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEtBQUssc0NBQXNDO3VCQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FB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O0lBQzlCLDhDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGVhZk5vZGUgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHBvaW50bWVudHMtb3ZlcnZpZXcnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJzaG93QXBwb2ludG1lbnRzXCIgY2xhc3M9XCJhcHBvaW50bWVudHNcIj5cbiAgPHAgKm5nSWY9XCJsb2FkaW5nQXBwb2ludG1lbnRzXCI+XG4gICAgPHNwYW4gKm5nSWY9XCIhYXBwb2ludG1lbnRzTG9hZGVkICYmIGVycm9yTG9hZGluZ0FwcG9pbnRtZW50c1wiPkVycm9yIGNoZWNraW5nIGFwcG9pbnRtZW50czwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdBcHBvaW50bWVudHNcIj48c3BhblxuICAgICAgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIj48L3NwYW4+Q2hlY2tpbmcgYXBwb2ludG1lbnRzLi4uPC9zcGFuPlxuICA8L3A+XG4gIDxkaXYgKm5nSWY9XCJhcHBvaW50bWVudHNMb2FkZWQgJiYgIWVycm9yTG9hZGluZ0FwcG9pbnRtZW50c1wiPlxuICAgIDx0YWJsZSAqbmdJZj1cImFwcG9pbnRtZW50cy5sZW5ndGg+MFwiIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBwZWQgdGFibGUtYm9yZGVyZWRcIj5cbiAgICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoICpuZ0Zvcj1cImxldCBhcHBvaW50bWVudCBvZiBhcHBvaW50bWVudHNcIiBbbmdDbGFzc109XCJ7J2FjdGl2ZSc6IGFwcG9pbnRtZW50LmRhdGUgPT09IHRvZGF5fVwiPlxuICAgICAgICAgIDxzcGFuPnt7YXBwb2ludG1lbnQuZGF0ZX19PC9zcGFuPlxuICAgICAgICA8L3RoPlxuICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICA8dHI+XG4gICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgYXBwb2ludG1lbnQgb2YgYXBwb2ludG1lbnRzXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsnYWN0aXZlJzogYXBwb2ludG1lbnQuZGF0ZSA9PT0gdG9kYXl9XCI+XG4gICAgICAgICAgPHNwYW4+PHN0cm9uZz48ZW0+e3thcHBvaW50bWVudC5jb3VudH19PC9lbT48L3N0cm9uZz48L3NwYW4+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPC90Ym9keT5cbiAgICA8L3RhYmxlPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5hcHBvaW50bWVudHN7bWFyZ2luLXRvcDoxMnB4O2ZvbnQtc2l6ZToxMnB4O2NvbG9yOiM5OTl9LmFwcG9pbnRtZW50cyBwe3BhZGRpbmctdG9wOjEycHh9LmFwcG9pbnRtZW50cyB0aHtib3JkZXItYm90dG9tOjAhaW1wb3J0YW50O2NvbG9yOiMzMzN9LmFwcG9pbnRtZW50cyB0ZCBzcGFuLC5hcHBvaW50bWVudHMgdGggc3BhbntkaXNwbGF5OmJsb2NrfS5hcHBvaW50bWVudHMgdGQuYWN0aXZlLC5hcHBvaW50bWVudHMgdGguYWN0aXZle2JhY2tncm91bmQtY29sb3I6IzNjOGRiYztjb2xvcjojZmZmIWltcG9ydGFudDtwYWRkaW5nOjB9LmFwcG9pbnRtZW50cyB0ZC5hY3RpdmUgc3BhbiwuYXBwb2ludG1lbnRzIHRoLmFjdGl2ZSBzcGFue3BhZGRpbmc6NHB4fS5hcHBvaW50bWVudHMgc3Bhbi5mYXtkaXNwbGF5OmlubGluZS1ibG9jazttYXJnaW4tcmlnaHQ6N3B4fWBdXG59KVxuZXhwb3J0IGNsYXNzIEFwcG9pbnRtZW50c092ZXJ2aWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBub2RlOiBMZWFmTm9kZTtcbiAgc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBsb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBhcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcbiAgYXBwb2ludG1lbnRzOiBBcnJheTxhbnk+ID0gW107XG4gIHRvZGF5ID0gJyc7XG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm5vZGUuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2KSA9PiB7XG4gICAgICB0aGlzLnJlc2V0UHJvcGVydGllcygpO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgIGlmIChub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdFxuICAgICAgICAmJiAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09ICdhOGE2NjZiYS0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnXG4gICAgICAgIHx8IG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PSAnYTg5ZDIzOTgtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JykpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3doYXQgY2hhbmdlIGlzIGhlcmUnLCB0aGlzLnNob3dBcHBvaW50bWVudHMpO1xuICAgICAgICBpZiAoIXRoaXMuc2hvd0FwcG9pbnRtZW50cykge1xuICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICBsZXQgZGF0YVNvdXJjZTtcbiAgICAgICAgICBpZiAobm9kZS5mb3JtICYmIG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcykge1xuICAgICAgICAgICAgZGF0YVNvdXJjZSA9IG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy5tb250aGx5U2NoZWR1bGVSZXNvdXJjZVNlcnZpY2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxvY2F0aW9uVXVpZCA9IG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy51c2VyTG9jYXRpb24udXVpZDtcbiAgICAgICAgICBpZiAoZGF0YVNvdXJjZSAmJiBsb2NhdGlvblV1aWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudCh2KS5zdGFydE9mKCd3ZWVrJykuYWRkKDEsICdkYXknKS5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGUgPSBtb21lbnQodikuZW5kT2YoJ3dlZWsnKS5zdWJ0cmFjdCgxLCAnZGF5JykuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICAgICAgICB0aGlzLnRvZGF5ID0gbW9tZW50KHYpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICAgICAgLy8gY3JlYXRlIDUgd2VlayBkYXlzXG4gICAgICAgICAgICBjb25zdCBfZGF0YSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3JhbVR5cGVzID0gWyc3ODFkODViMC0xMzU5LTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnLCAnNzgxZDg5N2EtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcbiAgICAgICAgICAgICAgJzk2MDQ3YWFmLTdhYjMtNDVlOS1iZTZhLWI2MTgxMGZlNjE3ZCcsICdjMTlhZWM2Ni0xYTQwLTQ1ODgtOWIwMy1iNmJlNTVhOGRkMWQnLCAnZjc3OTNkNDItMTFhYy00Y2ZkLTliMzUtZTBhMjFhN2E3YzMxJyxcbiAgICAgICAgICAgICAgJzMzNGM5ZTk4LTE3M2YtNDQ1NC1hOGNlLWY4MGIyMGI3ZmRmMCcsICc5NmJhMjc5Yi1iMjNiLTRlNzgtYWJhOS1kY2JkNDZhOTZiN2InLCAnNzgxZDg4ODAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4J107XG4gICAgICAgICAgICBjb25zdCBwcm9ncmFtVHlwZVBhcmFtcyA9IHByb2dyYW1UeXBlcy5qb2luKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgICAgX2RhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KHYpLnN0YXJ0T2YoJ3dlZWsnKS5hZGQoaSwgJ2RheScpLmZvcm1hdCgnREQtTU0tWVlZWScpLFxuICAgICAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YVNvdXJjZS5nZXRNb250aGx5U2NoZWR1bGUoe1xuICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgZW5kRGF0ZTogZW5kRGF0ZSxcbiAgICAgICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgICAgICAgIGxvY2F0aW9uVXVpZHM6IGxvY2F0aW9uVXVpZCxcbiAgICAgICAgICAgICAgcHJvZ3JhbVR5cGU6IHByb2dyYW1UeXBlUGFyYW1zXG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgX2RhdGEubWFwKChhcHBvaW50bWVudCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5jb3VudCA9IGRhdGFbaW5kZXhdICE9PSB1bmRlZmluZWQgPyBkYXRhW2luZGV4XS5jb3VudC5zY2hlZHVsZWQgOiAwO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHMgPSBfZGF0YTtcbiAgICAgICAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXNldFByb3BlcnRpZXMoKSB7XG4gICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVycm9yTG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuYXBwb2ludG1lbnRzID0gW107XG4gICAgdGhpcy50b2RheSA9ICcnO1xuICB9XG59XG4iXX0=