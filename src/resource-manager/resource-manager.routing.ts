import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
  {
    path: 'resource',
    component: ListComponent,
    children: [
      { path: 'form', component: FormComponent }
    ]
  }
];
