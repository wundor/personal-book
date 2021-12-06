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
import { AccountsAddUpdateComponent } from './add-update/add-update.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { IconsProviderModule } from '../icons-provider.module';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { AccountsDetailsComponent } from './details/details.component';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

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
    IconsProviderModule,
    NzInputModule,
    NzPopoverModule,
    NzSelectModule,
    NzStatisticModule,
    NzTimelineModule,
    NzTypographyModule,
  ],
  declarations: [
    AccountsListComponent,
    AccountsAddUpdateComponent,
    AccountsDetailsComponent,
  ],
  exports: [],
})
export class AccountsModule {}
