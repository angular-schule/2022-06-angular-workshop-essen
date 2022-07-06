import { Component, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, Observable, share, takeUntil, shareReplay } from 'rxjs';

import { MeasureValuesService } from './measure-values.service';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'rxw-multicast',
  templateUrl: './multicast.component.html',
})
export class MulticastComponent implements OnDestroy {

  listeners: string[] = [];
  logStream$ = new ReplaySubject<string>();
  private destroy$ = new Subject<void>();

  measureValues$: Subject<number>; // später: Subject<number>;

  constructor(private mvs: MeasureValuesService, private es: ExerciseService) {

    /**************!!**************/

    // 1. unverändert (kalt)
    // this.measureValues$ = this.mvs.getValues();


    // 2. multicasts (shares) the original Observable, uses Subject internally
    // this.measureValues$ = this.mvs.getValues().pipe(share())

    // 3. multicasts (shares) the original Observable, uses ReplaySubject internally
    // this.measureValues$ = this.mvs.getValues().pipe(shareReplay(1))

    // 4. please try out:
    // - Subject
    // - ReplaySubject
    // - BehaviorSubject
    this.measureValues$ = new Subject<number>();
    this.mvs.getValues().subscribe(this.measureValues$);


    /**************!!**************/

  }

  addListener() {
    this.listeners.push(this.es.generateRandomString());
  }

  addConsoleListener() {
    const randomString = this.es.generateRandomString();
    this.measureValues$.pipe(takeUntil(this.destroy$)).subscribe(e => this.logStream$.next(`${randomString} ${e}`));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

}
