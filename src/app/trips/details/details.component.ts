import {Component, OnInit} from '@angular/core';
import {TripsService} from '../trips.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  selectedTrip$;

  constructor(private tripsService: TripsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.selectedTrip$ = this.tripsService.getTripDetails(this.route.snapshot.paramMap.get('tripId'));
  }

}
