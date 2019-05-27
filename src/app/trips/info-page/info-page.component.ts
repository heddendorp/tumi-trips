import {Component, OnInit} from '@angular/core';
import {TripsService} from '../trips.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-info-page',
  templateUrl: './info-page.component.html',
  styleUrls: ['./info-page.component.scss']
})
export class InfoPageComponent implements OnInit {

  page;

  constructor(private tripsService: TripsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.page = this.tripsService.getPage(this.route.snapshot.paramMap.get('tripId'), this.route.snapshot.paramMap.get('pageId'));
  }

}
