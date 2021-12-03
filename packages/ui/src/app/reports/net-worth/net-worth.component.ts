import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { INetWorth } from '@pb/api/src/interfaces/reports.interface';
import { catchError } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-reports-net-worth',
  templateUrl: './net-worth.component.html',
  providers: [ApiService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./net-worth.component.less'],
})
export class NetWorthComponent implements OnInit {
  constructor(private http: HttpClient, private shared: ApiService) {}
  // make this as an array or networth month by month
  result: INetWorth = {
    assets: 0,
    liabilities: 0,
    total: 0,
  };

  getNetWorth() {
    this.http
      .get<INetWorth>(`reports/net-worth`)
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: INetWorth) => {
        this.result = data;
      });
  }

  ngOnInit(): void {
    this.getNetWorth();
  }
}
