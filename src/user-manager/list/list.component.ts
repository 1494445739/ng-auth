import { Component, OnInit } from '@angular/core';
import { UserManagerService } from '../user-manager.service';
import { Alert, Confirm, PageQuery, BaseListComponent } from '@tzg/ng-shared';
import { User } from '../../models/models';

export interface UserQuery extends PageQuery {
  name: string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html'
})
export class ListComponent extends BaseListComponent<User> {
  query: UserQuery;

  constructor(protected service: UserManagerService) {
    super(service);
  }
}


