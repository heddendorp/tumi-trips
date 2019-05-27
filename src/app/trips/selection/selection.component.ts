import {Component, OnInit} from '@angular/core';
import {TripsService} from '../trips.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  currentTrips$;

  constructor(private tripsService: TripsService) {
  }

  ngOnInit() {
    this.currentTrips$ = this.tripsService.getTrips();
  }

}
