import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// deprecated, will sit there just in case I'll need inspiration
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
