import { NgModule } from '@angular/core';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { TransactionsListComponent } from './list/list.component';
import { TransactionsAddUpdateComponent } from './add-update/add-update.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { IconsProviderModule } from '../icons-provider.module';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

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
    NzDatePickerModule,
    NzGridModule,
    NzSpaceModule,
    NzPopoverModule,
    NzTypographyModule,
    NzInputModule,
    NzToolTipModule,
  ],
  declarations: [TransactionsListComponent, TransactionsAddUpdateComponent],
  exports: [],
})
export class TransactionsModule {}
