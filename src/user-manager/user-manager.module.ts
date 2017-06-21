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
import { AuthorizationComponent } from './authorization/authorization.component';
import { UserManagerService } from './user-manager.service';
import { RoleManagerService } from '../role-manager/role-manager.service';


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
    AuthorizationComponent
  ],
  providers: [
    UserManagerService,
    RoleManagerService
  ]
})
export class UserManagerModule { }
