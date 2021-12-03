import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment as env } from '../environments/environment';
import { ApiService } from './shared/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public constructor(private titleService: Title, private shared: ApiService) {}
  home = env.baseUrl;

  setPeriod(p: string) {
    this.shared.period = p;
  }

  isCollapsed = false;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
