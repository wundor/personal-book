import { NgModule } from '@angular/core';
import { AccountsRoutingModule } from './accounts-routing.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
// import { FormBuilder } from '@angular/forms';
// import { NzFormModule } from 'ng-zorro-antd/form';
// import { FormGroup, FormsModule } from '@angular/forms';
// import { AddNewComponent } from './add-new/add-new.component';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    AccountsRoutingModule,
    NzTableModule,
    NzDividerModule,
    CommonModule,
    NzButtonModule,
    NzModalModule,
    // FormBuilder,
    // NzFormModule,
    // ReactiveFormsModule,
    // FormGroup,
    // FormsModule,
  ],
  declarations: [ListComponent],
  exports: [],
})
export class AccountsModule {}
