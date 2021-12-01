import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportsTabsComponent } from './tabs/tabs.component';

const routes: Routes = [{ path: '', component: ReportsTabsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportssRoutingModule {}
