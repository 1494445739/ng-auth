import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  DataTableModule,
  SharedModule,
  PanelModule,
  PaginatorModule,
  ButtonModule,
  DialogModule,
  TooltipModule,
  SelectButtonModule,
  CheckboxModule,
  TreeModule
} from 'primeng/primeng';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { PermissionComponent } from './permission/permission.component';
import { RoleManagerService } from './role-manager.service';
import { ResourceManagerService } from '../resource-manager/resource-manager.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,

    DataTableModule,
    SharedModule,
    PanelModule,
    PaginatorModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    SelectButtonModule,
    CheckboxModule,
    TreeModule
  ],
  declarations: [
    ListComponent,
    FormComponent,
    PermissionComponent
  ],
  providers: [
    RoleManagerService,
    ResourceManagerService
  ]
})
export class RoleManagerModule { }
