import {Injectable} from '@angular/core';

import localForage from 'localforage';
import {createClient} from 'contentful';
import {BehaviorSubject, Observable} from 'rxjs';
import {exhaustMap, map, mergeMap, switchAll, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  contentfulClient;
  db;
  dataReload = new BehaviorSubject(null);

  constructor() {
    this.contentfulClient = createClient({accessToken: 'vcWctQw8ObaHnqkQaTMHYXJ10zXZxJWkBOXtVj58hqU', space: 'wdjdkpxeoh9n'});
    this.db = localForage;
    this.loadTrips().then(() => {
    });
  }

  async loadTrips() {
    const data = await this.contentfulClient.getEntries({content_type: 'trip', include: 3});
    const trips = this.contentfulClient.parseEntries(data).items;
    await this.db.setItem('trips', trips);
    console.log(trips);
    this.dataReload.next(null);
  }

  getTrips() {
    return this.dataReload.pipe(exhaustMap(() => fromPromise(this.db.getItem('trips'))));
  }

  getTripDetails(tripId): Observable<any> {
    return this.dataReload.pipe(exhaustMap(() => fromPromise(this.db.getItem('trips').then(trips => trips.find(trip => trip.sys.id === tripId)))));
  }

  getPage(tripId, pageId) {
    return this.getTripDetails(tripId).pipe(map(trip => trip.fields.pages.find(page => page.sys.id === pageId)));
  }

  getEvents(tripId):Observable<any[]> {
    return this.getTripDetails(tripId).pipe(map(trip => trip.fields.events));
  }
}
