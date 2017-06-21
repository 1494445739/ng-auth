import { Component, OnInit } from '@angular/core';
import { RoleManagerService } from '../role-manager.service';
import { Role } from '../../models/models';
import {  Alert, Confirm, BaseListComponent, PageQuery } from '@tzg/web-shared';

export interface RoleQuery extends PageQuery {
  name: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent extends BaseListComponent<Role> {
  query: RoleQuery;

  constructor(protected service: RoleManagerService) {
    super(service);
  }
}
