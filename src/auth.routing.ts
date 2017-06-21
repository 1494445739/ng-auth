import { NgModule } from '@angular/core';
import { RouterModule, Routes, Route } from '@angular/router';

import { routes as UserRoutes } from './user-manager/user-manager.routing';
import { routes as RoleRoutes } from './role-manager/role-manager.routing';
import { routes as ResourceRoutes } from './resource-manager/resource-manager.routing';

export const routes: Routes = [
  { path: 'auth', 
    children: [
      { path: '', redirectTo: 'user', pathMatch: 'full' },
      ...UserRoutes,
      ...RoleRoutes,
      ...ResourceRoutes
    ] 
  }
];


