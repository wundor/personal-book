import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment as env } from '../environments/environment';
import { PeriodService } from './shared/period.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public constructor(
    private titleService: Title,
    private period: PeriodService,
  ) {}
  home = env.baseUrl;

  setPeriod(p: any) {
    console.log(p);
    this.period.changePeriod(p);
  }

  isCollapsed = false;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
