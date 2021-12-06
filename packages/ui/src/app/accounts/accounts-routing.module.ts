import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsDetailsComponent } from './details/details.component';
import { AccountsListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: AccountsListComponent },
  { path: ':id', component: AccountsDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
