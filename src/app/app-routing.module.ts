import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SelectionComponent} from './trips/selection/selection.component';
import {DetailsComponent} from './trips/details/details.component';
import {ScheduleComponent} from './trips/schedule/schedule.component';
import {InfoPageComponent} from './trips/info-page/info-page.component';
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'trips'},
  {path: 'trips', component: SelectionComponent},
  {path: 'trips/:tripId', component: DetailsComponent},
  {path: 'trips/:tripId/schedule', component: ScheduleComponent},
  {path: 'trips/:tripId/:pageId', component: InfoPageComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'not-found'},
  {path: 'not-found', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
