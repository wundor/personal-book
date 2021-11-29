import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment as env } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  public constructor(private titleService: Title) {}
  home = env.baseUrl;

  isCollapsed = false;

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}
