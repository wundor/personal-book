import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeriodService {
  period: string = 'month';

  private periodSource = new Subject<string>();

  periodChanged$ = this.periodSource.asObservable();

  changePeriod(p: string) {
    this.periodSource.next(p);
  }

  constructor() {
    this.periodChanged$.subscribe((value) => {
      this.period = value;
    });
  }
}
