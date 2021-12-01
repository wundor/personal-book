import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { INetWorth } from '@pb/api/src/interfaces/reports.interface';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/shared.service';
import { environment as env } from '../../../environments/environment';

@Component({
  selector: 'app-reports-net-worth',
  templateUrl: './net-worth.component.html',
  providers: [SharedService],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./net-worth.component.less'],
})
export class NetWorthComponent implements OnInit {
  constructor(private http: HttpClient, private shared: SharedService) {}
  result!: INetWorth;

  getNetWorth() {
    this.http
      .get<INetWorth>(`${env.apiUrl}/reports/net-worth`)
      .pipe(catchError(this.shared.handleError))
      .subscribe((data: INetWorth) => {
        this.result = data;
      });
  }

  ngOnInit(): void {
    this.getNetWorth();
  }
}
