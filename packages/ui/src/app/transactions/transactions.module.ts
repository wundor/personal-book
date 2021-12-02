import { NgModule } from '@angular/core';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './list/list.component';
import { TransactionsAddNewComponent } from './add-new/add-new.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { SharedModule } from '../shared/shared.module';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { IconsProviderModule } from '../icons-provider.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

@NgModule({
  imports: [
    TransactionsRoutingModule,
    IconsProviderModule,
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
    NzDatePickerModule,
    NzGridModule,
    NzSpaceModule,
    NzPopoverModule,
  ],
  declarations: [TransactionsListComponent, TransactionsAddNewComponent],
  exports: [],
})
export class TransactionsModule {}
