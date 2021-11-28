import { NgModule } from '@angular/core';
import { AccountsRoutingModule } from './accounts-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { AccountsListComponent } from './list/list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { AccountsAddNewComponent } from './add-new/add-new.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { SharedModule } from '../shared/shared.module';
import { IconsProviderModule } from '../icons-provider.module';

@NgModule({
  imports: [
    AccountsRoutingModule,
    NzTableModule,
    NzDividerModule,
    CommonModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    FormsModule,
    ReactiveFormsModule,
    NzNotificationModule,
    NzAutocompleteModule,
    SharedModule,
    IconsProviderModule,
  ],
  declarations: [AccountsListComponent, AccountsAddNewComponent],
  exports: [],
})
export class AccountsModule {}
