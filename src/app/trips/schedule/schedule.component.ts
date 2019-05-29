import {Component, OnInit} from '@angular/core';
import {TripsService} from '../trips.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {DateTime, Interval} from 'luxon';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  events;

  constructor(private tripsService: TripsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.events = this.tripsService.getEvents(this.route.snapshot.paramMap.get('tripId')).pipe(map(events => events.map(event => {
      const startTime = DateTime.fromISO(event.fields.start);
      const endTime = DateTime.fromISO(event.fields.end);
      const interval = Interval.fromDateTimes(startTime, endTime);
      return {
        ...event,
        duration: interval.length('hours')
      };
    })));
    this.events.subscribe(console.info);
  }

}
