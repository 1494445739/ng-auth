import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { RoleManagerModule } from './role-manager/role-manager.module';
import { UserManagerModule } from './user-manager/user-manager.module';
import { ResourceManagerModule } from './resource-manager/resource-manager.module';

import { routes as AuthRoutes } from './auth.routing';

@NgModule({
  imports: [
    CommonModule,

    RoleManagerModule,
    UserManagerModule,
    ResourceManagerModule,
    
    RouterModule.forChild(AuthRoutes)
  ],
  declarations: [],
  providers: [
  ]
})
export class AuthModule { }
