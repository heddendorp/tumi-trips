import { Component, OnInit } from '@angular/core';
import {TripsService} from '../trips.service';
import {ActivatedRoute} from '@angular/router';

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
    this.events = this.tripsService.getEvents(this.route.snapshot.paramMap.get('tripId'));
  }

}
