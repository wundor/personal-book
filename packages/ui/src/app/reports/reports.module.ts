import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsTabsComponent } from './tabs/tabs.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ReportssRoutingModule } from './reports-routing.module';
import { NetWorthComponent } from './net-worth/net-worth.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@NgModule({
  declarations: [ReportsTabsComponent, NetWorthComponent],
  imports: [
    CommonModule,
    ReportssRoutingModule,
    NzTabsModule,
    NzStatisticModule,
    NzCardModule,
    NzGridModule,
  ],
})
export class ReportsModule {}
