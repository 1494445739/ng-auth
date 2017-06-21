import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AuthorizationComponent } from './authorization/authorization.component';

export const routes: Routes = [
  {
    path: 'user',
    component: ListComponent,
    children: [
      { path: 'form', component: FormComponent },
      { path: 'authorization', component: AuthorizationComponent },
    ]
  }
];
