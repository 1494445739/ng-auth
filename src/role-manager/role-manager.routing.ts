import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { PermissionComponent } from './permission/permission.component';

export const routes: Routes = [
  {
    path: 'role',
    component: ListComponent,
    children: [
      { path: 'form', component: FormComponent },
      { path: 'permission', component: PermissionComponent },
    ]
  }
];

