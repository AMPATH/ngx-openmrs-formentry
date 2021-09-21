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
                        // create 5 week days
                        const _data = [];
                        const programTypes = [
                            '781d85b0-1359-11df-a1f1-0026b9348838',
                            '781d897a-1359-11df-a1f1-0026b9348838',
                            '96047aaf-7ab3-45e9-be6a-b61810fe617d',
                            'c19aec66-1a40-4588-9b03-b6be55a8dd1d',
                            'f7793d42-11ac-4cfd-9b35-e0a21a7a7c31',
                            '334c9e98-173f-4454-a8ce-f80b20b7fdf0',
                            '96ba279b-b23b-4e78-aba9-dcbd46a96b7b',
                            '781d8880-1359-11df-a1f1-0026b9348838'
                        ];
                        const programTypeParams = programTypes.join();
                        for (let i = 1; i <= 5; i++) {
                            _data.push({
                                date: moment(v)
                                    .startOf('week')
                                    .add(i, 'day')
                                    .format('DD-MM-YYYY'),
                                count: 0
                            });
                        }
                        dataSource
                            .getMonthlySchedule({
                            startDate: startDate,
                            endDate: endDate,
                            limit: 5,
                            locationUuids: locationUuid,
                            programType: programTypeParams
                        })
                            .subscribe((data) => {
                            this.appointmentsLoaded = true;
                            this.loadingAppointments = false;
                            _data.map((appointment, index) => {
                                appointment.count =
                                    data.results[index] !== undefined
                                        ? data.results[index].count.scheduled
                                        : 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwb2ludG1lbnRzLW92ZXJ2aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1vcGVubXJzLWZvcm1lbnRyeS8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvYXBwb2ludG1lbnRzLW92ZXJ2aWV3L2FwcG9pbnRtZW50cy1vdmVydmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXBFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNuRSxPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUVsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFnRHZCLE1BQU07SUFRSjtRQU5BLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6Qix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFDNUIsNkJBQXdCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQUMzQixpQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUM5QixVQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ0ksQ0FBQztJQUVoQixRQUFRLEtBQUksQ0FBQztJQUViLFdBQVc7UUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDdkIsRUFBRSxDQUFDLENBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU87Z0JBQzVDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQU87b0JBQzNDLHNDQUFzQztvQkFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxN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WDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxxYkFBcWIsQ0FBQzthQUNoYzs7OzttQkFFRSxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgTGVhZk5vZGUgfSBmcm9tICcuLi8uLi9mb3JtLWVudHJ5L2Zvcm0tZmFjdG9yeS9mb3JtLW5vZGUnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHBvaW50bWVudHMtb3ZlcnZpZXcnLFxuICB0ZW1wbGF0ZTogYDxkaXYgKm5nSWY9XCJzaG93QXBwb2ludG1lbnRzXCIgY2xhc3M9XCJhcHBvaW50bWVudHNcIj5cbiAgPHAgKm5nSWY9XCJsb2FkaW5nQXBwb2ludG1lbnRzXCI+XG4gICAgPHNwYW4gKm5nSWY9XCIhYXBwb2ludG1lbnRzTG9hZGVkICYmIGVycm9yTG9hZGluZ0FwcG9pbnRtZW50c1wiXG4gICAgICA+RXJyb3IgY2hlY2tpbmcgYXBwb2ludG1lbnRzPC9zcGFuXG4gICAgPlxuICAgIDxzcGFuICpuZ0lmPVwibG9hZGluZ0FwcG9pbnRtZW50c1wiXG4gICAgICA+PHNwYW4gY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXNwaW5cIj48L3NwYW4+Q2hlY2tpbmcgYXBwb2ludG1lbnRzLi4uPC9zcGFuXG4gICAgPlxuICA8L3A+XG4gIDxkaXYgKm5nSWY9XCJhcHBvaW50bWVudHNMb2FkZWQgJiYgIWVycm9yTG9hZGluZ0FwcG9pbnRtZW50c1wiPlxuICAgIDx0YWJsZVxuICAgICAgKm5nSWY9XCJhcHBvaW50bWVudHMubGVuZ3RoID4gMFwiXG4gICAgICBjbGFzcz1cInRhYmxlIHRhYmxlLXN0cmlwcGVkIHRhYmxlLWJvcmRlcmVkXCJcbiAgICA+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGhcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBhcHBvaW50bWVudCBvZiBhcHBvaW50bWVudHNcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFwcG9pbnRtZW50LmRhdGUgPT09IHRvZGF5IH1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuPnt7IGFwcG9pbnRtZW50LmRhdGUgfX08L3NwYW4+XG4gICAgICAgICAgPC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGRcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBhcHBvaW50bWVudCBvZiBhcHBvaW50bWVudHNcIlxuICAgICAgICAgICAgW25nQ2xhc3NdPVwieyBhY3RpdmU6IGFwcG9pbnRtZW50LmRhdGUgPT09IHRvZGF5IH1cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgID48c3Ryb25nXG4gICAgICAgICAgICAgICAgPjxlbT57eyBhcHBvaW50bWVudC5jb3VudCB9fTwvZW0+PC9zdHJvbmdcbiAgICAgICAgICAgICAgPjwvc3BhblxuICAgICAgICAgICAgPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmFwcG9pbnRtZW50c3ttYXJnaW4tdG9wOjEycHg7Zm9udC1zaXplOjEycHg7Y29sb3I6Izk5OX0uYXBwb2ludG1lbnRzIHB7cGFkZGluZy10b3A6MTJweH0uYXBwb2ludG1lbnRzIHRoe2JvcmRlci1ib3R0b206MCFpbXBvcnRhbnQ7Y29sb3I6IzMzM30uYXBwb2ludG1lbnRzIHRkIHNwYW4sLmFwcG9pbnRtZW50cyB0aCBzcGFue2Rpc3BsYXk6YmxvY2t9LmFwcG9pbnRtZW50cyB0ZC5hY3RpdmUsLmFwcG9pbnRtZW50cyB0aC5hY3RpdmV7YmFja2dyb3VuZC1jb2xvcjojM2M4ZGJjO2NvbG9yOiNmZmYhaW1wb3J0YW50O3BhZGRpbmc6MH0uYXBwb2ludG1lbnRzIHRkLmFjdGl2ZSBzcGFuLC5hcHBvaW50bWVudHMgdGguYWN0aXZlIHNwYW57cGFkZGluZzo0cHh9LmFwcG9pbnRtZW50cyBzcGFuLmZhe2Rpc3BsYXk6aW5saW5lLWJsb2NrO21hcmdpbi1yaWdodDo3cHh9YF1cbn0pXG5leHBvcnQgY2xhc3MgQXBwb2ludG1lbnRzT3ZlcnZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG5vZGU6IExlYWZOb2RlO1xuICBzaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gIGFwcG9pbnRtZW50c0xvYWRlZCA9IGZhbHNlO1xuICBhcHBvaW50bWVudHM6IEFycmF5PGFueT4gPSBbXTtcbiAgdG9kYXkgPSAnJztcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cblxuICBuZ09uQ2hhbmdlcygpIHtcbiAgICB0aGlzLm5vZGUuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCh2KSA9PiB7XG4gICAgICB0aGlzLnJlc2V0UHJvcGVydGllcygpO1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMubm9kZTtcbiAgICAgIGlmIChcbiAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgJiZcbiAgICAgICAgKG5vZGUucXVlc3Rpb24uZXh0cmFzLnF1ZXN0aW9uT3B0aW9ucy5jb25jZXB0ID09PVxuICAgICAgICAgICdhOGE2NjZiYS0xMzUwLTExZGYtYTFmMS0wMDI2YjkzNDg4MzgnIHx8XG4gICAgICAgICAgbm9kZS5xdWVzdGlvbi5leHRyYXMucXVlc3Rpb25PcHRpb25zLmNvbmNlcHQgPT09XG4gICAgICAgICAgICAnYTg5ZDIzOTgtMTM1MC0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JylcbiAgICAgICkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnd2hhdCBjaGFuZ2UgaXMgaGVyZScsIHRoaXMuc2hvd0FwcG9pbnRtZW50cyk7XG4gICAgICAgIGlmICghdGhpcy5zaG93QXBwb2ludG1lbnRzKSB7XG4gICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSB0cnVlO1xuICAgICAgICAgIGxldCBkYXRhU291cmNlO1xuICAgICAgICAgIGlmIChub2RlLmZvcm0gJiYgbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzKSB7XG4gICAgICAgICAgICBkYXRhU291cmNlID1cbiAgICAgICAgICAgICAgbm9kZS5mb3JtLmRhdGFTb3VyY2VzQ29udGFpbmVyLmRhdGFTb3VyY2VzXG4gICAgICAgICAgICAgICAgLm1vbnRobHlTY2hlZHVsZVJlc291cmNlU2VydmljZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgbG9jYXRpb25VdWlkID1cbiAgICAgICAgICAgIG5vZGUuZm9ybS5kYXRhU291cmNlc0NvbnRhaW5lci5kYXRhU291cmNlcy51c2VyTG9jYXRpb24udXVpZDtcbiAgICAgICAgICBpZiAoZGF0YVNvdXJjZSAmJiBsb2NhdGlvblV1aWQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG1vbWVudCh2KVxuICAgICAgICAgICAgICAuc3RhcnRPZignd2VlaycpXG4gICAgICAgICAgICAgIC5hZGQoMSwgJ2RheScpXG4gICAgICAgICAgICAgIC5mb3JtYXQoJ1lZWVktTU0tREQnKTtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGUgPSBtb21lbnQodilcbiAgICAgICAgICAgICAgLmVuZE9mKCd3ZWVrJylcbiAgICAgICAgICAgICAgLnN1YnRyYWN0KDEsICdkYXknKVxuICAgICAgICAgICAgICAuZm9ybWF0KCdZWVlZLU1NLUREJyk7XG4gICAgICAgICAgICB0aGlzLnRvZGF5ID0gbW9tZW50KHYpLmZvcm1hdCgnREQtTU0tWVlZWScpO1xuICAgICAgICAgICAgLy8gY3JlYXRlIDUgd2VlayBkYXlzXG4gICAgICAgICAgICBjb25zdCBfZGF0YSA9IFtdO1xuICAgICAgICAgICAgY29uc3QgcHJvZ3JhbVR5cGVzID0gW1xuICAgICAgICAgICAgICAnNzgxZDg1YjAtMTM1OS0xMWRmLWExZjEtMDAyNmI5MzQ4ODM4JyxcbiAgICAgICAgICAgICAgJzc4MWQ4OTdhLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCcsXG4gICAgICAgICAgICAgICc5NjA0N2FhZi03YWIzLTQ1ZTktYmU2YS1iNjE4MTBmZTYxN2QnLFxuICAgICAgICAgICAgICAnYzE5YWVjNjYtMWE0MC00NTg4LTliMDMtYjZiZTU1YThkZDFkJyxcbiAgICAgICAgICAgICAgJ2Y3NzkzZDQyLTExYWMtNGNmZC05YjM1LWUwYTIxYTdhN2MzMScsXG4gICAgICAgICAgICAgICczMzRjOWU5OC0xNzNmLTQ0NTQtYThjZS1mODBiMjBiN2ZkZjAnLFxuICAgICAgICAgICAgICAnOTZiYTI3OWItYjIzYi00ZTc4LWFiYTktZGNiZDQ2YTk2YjdiJyxcbiAgICAgICAgICAgICAgJzc4MWQ4ODgwLTEzNTktMTFkZi1hMWYxLTAwMjZiOTM0ODgzOCdcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBjb25zdCBwcm9ncmFtVHlwZVBhcmFtcyA9IHByb2dyYW1UeXBlcy5qb2luKCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSA1OyBpKyspIHtcbiAgICAgICAgICAgICAgX2RhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgZGF0ZTogbW9tZW50KHYpXG4gICAgICAgICAgICAgICAgICAuc3RhcnRPZignd2VlaycpXG4gICAgICAgICAgICAgICAgICAuYWRkKGksICdkYXknKVxuICAgICAgICAgICAgICAgICAgLmZvcm1hdCgnREQtTU0tWVlZWScpLFxuICAgICAgICAgICAgICAgIGNvdW50OiAwXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YVNvdXJjZVxuICAgICAgICAgICAgICAuZ2V0TW9udGhseVNjaGVkdWxlKHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlLFxuICAgICAgICAgICAgICAgIGxpbWl0OiA1LFxuICAgICAgICAgICAgICAgIGxvY2F0aW9uVXVpZHM6IGxvY2F0aW9uVXVpZCxcbiAgICAgICAgICAgICAgICBwcm9ncmFtVHlwZTogcHJvZ3JhbVR5cGVQYXJhbXNcbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgdGhpcy5hcHBvaW50bWVudHNMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICBfZGF0YS5tYXAoKGFwcG9pbnRtZW50LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBhcHBvaW50bWVudC5jb3VudCA9XG4gICAgICAgICAgICAgICAgICAgIGRhdGEucmVzdWx0c1tpbmRleF0gIT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBkYXRhLnJlc3VsdHNbaW5kZXhdLmNvdW50LnNjaGVkdWxlZFxuICAgICAgICAgICAgICAgICAgICAgICAgOiAwO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB0aGlzLmFwcG9pbnRtZW50cyA9IF9kYXRhO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0FwcG9pbnRtZW50cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc2V0UHJvcGVydGllcygpIHtcbiAgICB0aGlzLmxvYWRpbmdBcHBvaW50bWVudHMgPSBmYWxzZTtcbiAgICB0aGlzLmFwcG9pbnRtZW50c0xvYWRlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXJyb3JMb2FkaW5nQXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5zaG93QXBwb2ludG1lbnRzID0gZmFsc2U7XG4gICAgdGhpcy5hcHBvaW50bWVudHMgPSBbXTtcbiAgICB0aGlzLnRvZGF5ID0gJyc7XG4gIH1cbn1cbiJdfQ==