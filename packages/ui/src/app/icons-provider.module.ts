import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  MinusCircleOutline,
  MinusCircleFill,
  UserOutline,
  SettingOutline,
  HomeOutline,
  PlusOutline,
  BookOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  MinusCircleOutline,
  MinusCircleFill,
  UserOutline,
  SettingOutline,
  HomeOutline,
  PlusOutline,
  BookOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
