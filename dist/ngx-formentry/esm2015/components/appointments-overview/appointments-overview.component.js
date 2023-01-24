import { Component, Input } from '@angular/core';
import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';
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
    ngOnInit() { }
    ngOnChanges() {
        this.node.control.valueChanges.subscribe((v) => {
            this.resetProperties();
            const node = this.node;
            if (node.question.extras.questionOptions.concept &&
                (node.question.extras.questionOptions.concept ===
                    'a8a666ba-1350-11df-a1f1-0026b9348838' ||
                    node.question.extras.questionOptions.concept ===
                        'a89d2398-1350-11df-a1f1-0026b9348838')) {
                // console.log('what change is here', this.showAppointments);
                if (!this.showAppointments) {
                    this.loadingAppointments = true;
                    this.showAppointments = true;
                    let dataSource;
                    if (node.form && node.form.dataSourcesContainer.dataSources) {
                        dataSource =
                            node.form.dataSourcesContainer.dataSources
                                .monthlyScheduleResourceService;
                    }
                    const locationUuid = node.form.dataSourcesContainer.dataSources.userLocation.uuid;
                    if (dataSource && locationUuid) {
                        const startDate = moment(v)
                            .startOf('week')
                            .add(1, 'day')
                            .format('YYYY-MM-DD');
                        const endDate = moment(v)
                            .endOf('week')
                            .subtract(1, 'day')
                            .format('YYYY-MM-DD');
                        this.today = moment(v).format('DD-MM-YYYY');
                        dataSource
                            .getMonthlySchedule({
                            startDate: startDate,
                            endDate: endDate,
                            limit: 5,
                            locationUuids: locationUuid,
                            department: 'HIV',
                            groupBy: 'groupByPerson,groupByAttendedDate,groupByRtcDate'
                        })
                            .subscribe((data) => {
                            const _data = [];
                            const weeklyMap = new Map();
                            // create the weeks schedule with zero appointments
                            for (let i = 0; i < 5; i++) {
                                const scheduleDate = moment(v)
                                    .startOf('week')
                                    .add(i, 'day')
                                    .format('YYYY-MM-DD');
                                const scheduledObj = {
                                    date: scheduleDate,
                                    count: {
                                        scheduled: 0
                                    }
                                };
                                weeklyMap.set(scheduleDate, scheduledObj);
                            }
                            const results = data.results || [];
                            // replace placeholder schedules with actual schedules in the map obj
                            results.forEach((scheduled) => {
                                weeklyMap.set(scheduled.date, scheduled);
                            });
                            // retrieve scheduled obj from map to data array
                            weeklyMap.forEach((value, key) => {
                                const dayCount = {
                                    date: key,
                                    count: value.count.scheduled || 0
                                };
                                _data.push(dayCount);
                            });
                            this.appointmentsLoaded = true;
                            this.loadingAppointments = false;
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
    <span *ngIf="!appointmentsLoaded && errorLoadingAppointments"
      >Error checking appointments</span
    >
    <span *ngIf="loadingAppointments"
      ><span class="fa fa-spinner fa-spin"></span>Checking appointments...</span
    >
  </p>
  <div *ngIf="appointmentsLoaded && !errorLoadingAppointments">
    <table
      *ngIf="appointments.length > 0"
      class="table table-stripped table-bordered"
    >
      <thead>
        <tr>
          <th
            *ngFor="let appointment of appointments"
            [ngClass]="{ active: appointment.date === today }"
          >
            <span>{{ appointment.date }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            *ngFor="let appointment of appointments"
            [ngClass]="{ active: appointment.date === today }"
          >
            <span
              ><strong
                ><em>{{ appointment.count }}</em></strong
              ></span
            >
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUF3RXZCLE1BQU07SUFRSjtRQU5BLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUM5QixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ0ksQ0FBQztJQUVoQixRQUFRLEtBQUksQ0FBQztJQUViLFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU87Z0JBQzVDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU87b0JBQzNDLHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxN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LFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7O1lBaEtGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBeUNYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHFiQUFxYixDQUFDO2FBQ2hjOzs7O21CQUVFLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBMZWFmTm9kZSB9IGZyb20gJy4uLy4uL2Zvcm0tZW50cnkvZm9ybS1mYWN0b3J5L2Zvcm0tbm9kZSc7XG5pbXBvcnQgKiBhcyBtb21lbnRfIGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbmludGVyZmFjZSBEYWlseVNjaGVkdWxlZCB7XG4gIGRhdGU6IHN0cmluZztcbiAgY291bnQ6IHtcbiAgICBzY2hlZHVsZWQ6IG51bWJlcjtcbiAgfTtcbn1cbmludGVyZmFjZSBXZWVla2x5U2NoZWR1bGVSZXBvcnQge1xuICByZXBvcnRzOiB7XG4gICAgYXR0ZW5kZWQ6IGFueTtcbiAgICBoYXNOb3RSZXR1cm5lZDogYW55O1xuICAgIHNjaGVkdWxlZDogYW55O1xuICB9O1xuICByZXN1bHRzOiBEYWlseVNjaGVkdWxlZFtdO1xuICB0b3RhbHM6IHtcbiAgICBhdHRlbmRlZDogbnVtYmVyO1xuICAgIGhhc05vdFJldHVybmVkOiBudW1iZXI7XG4gICAgc2NoZWR1bGVkOiBudW1iZXI7XG4gIH07XG59XG5pbnRlcmZhY2UgRGF5Q291bnQge1xuICBkYXRlOiBzdHJpbmc7XG4gIGNvdW50OiBudW1iZXI7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcG9pbnRtZW50cy1vdmVydmlldycsXG4gIHRlbXBsYXRlOiBgPGRpdiAqbmdJZj1cInNob3dBcHBvaW50bWVudHNcIiBjbGFzcz1cImFwcG9pbnRtZW50c1wiPlxuICA8cCAqbmdJZj1cImxvYWRpbmdBcHBvaW50bWVudHNcIj5cbiAgICA8c3BhbiAqbmdJZj1cIiFhcHBvaW50bWVudHNMb2FkZWQgJiYgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzXCJcbiAgICAgID5FcnJvciBjaGVja2luZyBhcHBvaW50bWVudHM8L3NwYW5cbiAgICA+XG4gICAgPHNwYW4gKm5nSWY9XCJsb2FkaW5nQXBwb2ludG1lbnRzXCJcbiAgICAgID48c3BhbiBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvc3Bhbj5DaGVja2luZyBhcHBvaW50bWVudHMuLi48L3NwYW5cbiAgICA+XG4gIDwvcD5cbiAgPGRpdiAqbmdJZj1cImFwcG9pbnRtZW50c0xvYWRlZCAmJiAhZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzXCI+XG4gICAgPHRhYmxlXG4gICAgICAqbmdJZj1cImFwcG9pbnRtZW50cy5sZW5ndGggPiAwXCJcbiAgICAgIGNsYXNzPVwidGFibGUgdGFibGUtc3RyaXBwZWQgdGFibGUtYm9yZGVyZWRcIlxuICAgID5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0aFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGFwcG9pbnRtZW50IG9mIGFwcG9pbnRtZW50c1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogYXBwb2ludG1lbnQuZGF0ZSA9PT0gdG9kYXkgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4+e3sgYXBwb2ludG1lbnQuZGF0ZSB9fTwvc3Bhbj5cbiAgICAgICAgICA8L3RoPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keT5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgKm5nRm9yPVwibGV0IGFwcG9pbnRtZW50IG9mIGFwcG9pbnRtZW50c1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ7IGFjdGl2ZTogYXBwb2ludG1lbnQuZGF0ZSA9PT0gdG9kYXkgfVwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgPjxzdHJvbmdcbiAgICAgICAgICAgICAgICA+PGVtPnt7IGFwcG9pbnRtZW50LmNvdW50IH19PC9lbT48L3N0cm9uZ1xuICAgICAgICAgICAgICA+PC9zcGFuXG4gICAgICAgICAgICA+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuYXBwb2ludG1lbnRze21hcmdpbi10b3A6MTJweDtmb250LXNpemU6MTJweDtjb2xvcjojOTk5fS5hcHBvaW50bWVudHMgcHtwYWRkaW5nLXRvcDoxMnB4fS5hcHBvaW50bWVudHMgdGh7Ym9yZGVyLWJvdHRvbTowIWltcG9ydGFudDtjb2xvcjojMzMzfS5hcHBvaW50bWVudHMgdGQgc3BhbiwuYXBwb2ludG1lbnRzIHRoIHNwYW57ZGlzcGxheTpibG9ja30uYXBwb2ludG1lbnRzIHRkLmFjdGl2ZSwuYXBwb2ludG1lbnRzIHRoLmFjdGl2ZXtiYWNrZ3JvdW5kLWNvbG9yOiMzYzhkYmM7Y29sb3I6I2ZmZiFpbXBvcnRhbnQ7cGFkZGluZzowfS5hcHBvaW50bWVudHMgdGQuYWN0aXZlIHNwYW4sLmFwcG9pbnRtZW50cyB0aC5hY3RpdmUgc3BhbntwYWRkaW5nOjRweH0uYXBwb2ludG1lbnRzIHNwYW4uZmF7ZGlzcGxheTppbmxpbmUtYmxvY2s7bWFyZ2luLXJpZ2h0OjdweH1gXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBvaW50bWVudHNPdmVydmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgbm9kZTogTGVhZk5vZGU7XG4gIHNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgbG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICBlcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gIGFwcG9pbnRtZW50czogQXJyYXk8YW55PiA9IFtdO1xuICB0b2RheSA9ICcnO1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgbmdPbkluaXQoKSB7fVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIHRoaXMubm9kZS5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHYpID0+IHtcbiAgICAgIHRoaXMucmVzZXRQcm9wZXJ0aWVzKCk7XG4gICAgICBjb25zdCBub2RlID0gdGhpcy5ub2RlO1xuICAgICAgaWYgKFxuICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCAmJlxuICAgICAgICAobm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09XG4gICAgICAgICAgJ2E4YTY2NmJhLTEzNTAtMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcgfHxcbiAgICAgICAgICBub2RlLnF1ZXN0aW9uLmV4dHJhcy5xdWVzdGlvbk9wdGlvbnMuY29uY2VwdCA9PT1cbiAgICAgICAgICAgICdhODlkMjM5OC0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnKVxuICAgICAgKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCd3aGF0IGNoYW5nZSBpcyBoZXJlJywgdGhpcy5zaG93QXBwb2ludG1lbnRzKTtcbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBvaW50bWVudHMpIHtcbiAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IHRydWU7XG4gICAgICAgICAgbGV0IGRhdGFTb3VyY2U7XG4gICAgICAgICAgaWYgKG5vZGUuZm9ybSAmJiBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXMpIHtcbiAgICAgICAgICAgIGRhdGFTb3VyY2UgPVxuICAgICAgICAgICAgICBub2RlLmZvcm0uZGF0YVNvdXJjZXNDb250YWluZXIuZGF0YVNvdXJjZXNcbiAgICAgICAgICAgICAgICAubW9udGhseVNjaGVkdWxlUmVzb3VyY2VTZXJ2aWNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBsb2NhdGlvblV1aWQgPVxuICAgICAgICAgICAgbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzLnVzZXJMb2NhdGlvbi51dWlkO1xuICAgICAgICAgIGlmIChkYXRhU291cmNlICYmIGxvY2F0aW9uVXVpZCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHYpXG4gICAgICAgICAgICAgIC5zdGFydE9mKCd3ZWVrJylcbiAgICAgICAgICAgICAgLmFkZCgxLCAnZGF5JylcbiAgICAgICAgICAgICAgLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG1vbWVudCh2KVxuICAgICAgICAgICAgICAuZW5kT2YoJ3dlZWsnKVxuICAgICAgICAgICAgICAuc3VidHJhY3QoMSwgJ2RheScpXG4gICAgICAgICAgICAgIC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgICAgIHRoaXMudG9kYXkgPSBtb21lbnQodikuZm9ybWF0KCdERC1NTS1ZWVlZJyk7XG4gICAgICAgICAgICBkYXRhU291cmNlXG4gICAgICAgICAgICAgIC5nZXRNb250aGx5U2NoZWR1bGUoe1xuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxuICAgICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgICAgICAgICAgbG9jYXRpb25VdWlkczogbG9jYXRpb25VdWlkLFxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnQ6ICdISVYnLFxuICAgICAgICAgICAgICAgIGdyb3VwQnk6ICdncm91cEJ5UGVyc29uLGdyb3VwQnlBdHRlbmRlZERhdGUsZ3JvdXBCeVJ0Y0RhdGUnXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgKGRhdGE6IFdlZWVrbHlTY2hlZHVsZVJlcG9ydCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgX2RhdGE6IERheUNvdW50W10gPSBbXTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHdlZWtseU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgd2Vla3Mgc2NoZWR1bGUgd2l0aCB6ZXJvIGFwcG9pbnRtZW50c1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NoZWR1bGVEYXRlID0gbW9tZW50KHYpXG4gICAgICAgICAgICAgICAgICAgICAgLnN0YXJ0T2YoJ3dlZWsnKVxuICAgICAgICAgICAgICAgICAgICAgIC5hZGQoaSwgJ2RheScpXG4gICAgICAgICAgICAgICAgICAgICAgLmZvcm1hdCgnWVlZWS1NTS1ERCcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2hlZHVsZWRPYmo6IERhaWx5U2NoZWR1bGVkID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IHNjaGVkdWxlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NoZWR1bGVkOiAwXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB3ZWVrbHlNYXAuc2V0KHNjaGVkdWxlRGF0ZSwgc2NoZWR1bGVkT2JqKTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0czogRGFpbHlTY2hlZHVsZWRbXSA9IGRhdGEucmVzdWx0cyB8fCBbXTtcbiAgICAgICAgICAgICAgICAgIC8vIHJlcGxhY2UgcGxhY2Vob2xkZXIgc2NoZWR1bGVzIHdpdGggYWN0dWFsIHNjaGVkdWxlcyBpbiB0aGUgbWFwIG9ialxuICAgICAgICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChzY2hlZHVsZWQ6IERhaWx5U2NoZWR1bGVkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdlZWtseU1hcC5zZXQoc2NoZWR1bGVkLmRhdGUsIHNjaGVkdWxlZCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIC8vIHJldHJpZXZlIHNjaGVkdWxlZCBvYmogZnJvbSBtYXAgdG8gZGF0YSBhcnJheVxuICAgICAgICAgICAgICAgICAgd2Vla2x5TWFwLmZvckVhY2goKHZhbHVlOiBEYWlseVNjaGVkdWxlZCwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF5Q291bnQ6IERheUNvdW50ID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGRhdGU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogdmFsdWUuY291bnQuc2NoZWR1bGVkIHx8IDBcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgX2RhdGEucHVzaChkYXlDb3VudCk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50cyA9IF9kYXRhO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzZXRQcm9wZXJ0aWVzKCkge1xuICAgIHRoaXMubG9hZGluZ0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgIHRoaXMuYXBwb2ludG1lbnRzTG9hZGVkID0gZmFsc2U7XG4gICAgdGhpcy5lcnJvckxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLmFwcG9pbnRtZW50cyA9IFtdO1xuICAgIHRoaXMudG9kYXkgPSAnJztcbiAgfVxufVxuIl19