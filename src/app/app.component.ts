import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SwUpdate} from '@angular/service-worker';
import {Subject, timer} from 'rxjs';
import {first, switchMap, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  constructor(
    private snackBar: MatSnackBar,
    private update: SwUpdate
  ) {
  }

  ngOnInit(): void {
    timer(60000).pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.update.available.pipe(first()).subscribe(() => {
        this.snackBar
          .open('A new version of this app is available!', 'Activate now')
          .afterDismissed()
          .subscribe(dismiss => {
            if (dismiss.dismissedByAction) {
              this.update.activateUpdate().then(() => document.location.reload());
            }
          });
      });
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.complete();
  }
}
