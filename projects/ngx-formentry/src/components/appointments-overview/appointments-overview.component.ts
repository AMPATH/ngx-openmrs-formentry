import { Component, OnInit, OnChanges, Input } from '@angular/core';

import { LeafNode } from '../../form-entry/form-factory/form-node';
import * as moment_ from 'moment';

const moment = moment_;

interface DailyScheduled {
  date: string;
  count: {
    scheduled: number;
  };
}
interface WeeeklyScheduleReport {
  reports: {
    attended: any;
    hasNotReturned: any;
    scheduled: any;
  };
  results: DailyScheduled[];
  totals: {
    attended: number;
    hasNotReturned: number;
    scheduled: number;
  };
}
interface DayCount {
  date: string;
  count: number;
}

@Component({
  selector: 'appointments-overview',
  templateUrl: './appointments-overview.component.html',
  styleUrls: ['./appointments-overview.component.css']
})
export class AppointmentsOverviewComponent implements OnInit, OnChanges {
  @Input() node: LeafNode;
  showAppointments = false;
  loadingAppointments = false;
  errorLoadingAppointments = false;
  appointmentsLoaded = false;
  appointments: Array<any> = [];
  today = '';
  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.node.control.valueChanges.subscribe((v) => {
      this.resetProperties();
      const node = this.node;
      if (
        node.question.extras.questionOptions.concept &&
        (node.question.extras.questionOptions.concept ===
          'a8a666ba-1350-11df-a1f1-0026b9348838' ||
          node.question.extras.questionOptions.concept ===
            'a89d2398-1350-11df-a1f1-0026b9348838')
      ) {
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
          const locationUuid =
            node.form.dataSourcesContainer.dataSources.userLocation.uuid;
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
              .subscribe(
                (data: WeeeklyScheduleReport) => {
                  const _data: DayCount[] = [];
                  const weeklyMap = new Map();
                  // create the weeks schedule with zero appointments
                  for (let i = 0; i < 5; i++) {
                    const scheduleDate = moment(v)
                      .startOf('week')
                      .add(i, 'day')
                      .format('YYYY-MM-DD');
                    const scheduledObj: DailyScheduled = {
                      date: scheduleDate,
                      count: {
                        scheduled: 0
                      }
                    };
                    weeklyMap.set(scheduleDate, scheduledObj);
                  }

                  const results: DailyScheduled[] = data.results || [];
                  // replace placeholder schedules with actual schedules in the map obj
                  results.forEach((scheduled: DailyScheduled) => {
                    weeklyMap.set(scheduled.date, scheduled);
                  });
                  // retrieve scheduled obj from map to data array
                  weeklyMap.forEach((value: DailyScheduled, key: string) => {
                    const dayCount: DayCount = {
                      date: key,
                      count: value.count.scheduled || 0
                    };
                    _data.push(dayCount);
                  });
                  this.appointmentsLoaded = true;
                  this.loadingAppointments = false;

                  this.appointments = _data;
                },
                (error: any) => {
                  this.loadingAppointments = false;
                  this.errorLoadingAppointments = true;
                  this.showAppointments = false;
                  console.error(error);
                }
              );
          } else {
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
