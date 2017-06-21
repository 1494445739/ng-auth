import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService, PageQuery, Result } from '@tzg/ng-shared';
import { User, Role, Authorization } from '../models/models';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class UserManagerService extends BaseService<User> {
  getUrl = 'auth/user/proto/get';
  listUrl = 'auth/user/proto/index';
  addUrl = 'auth/user/proto/post';
  editUrl = 'auth/user/proto/put';
  deleteUrl = 'auth/user/proto/delete';

  getAuthorizationUrl = 'auth/authz/get';
  saveAuthorizationUrl = 'auth/authz/authz';

  constructor (protected http: Http) {
    super(http);
  }

  getAuthorization (userId: string) {
    return this._get<Authorization[]>(this.getAuthorizationUrl, { userId });
  }
  saveAuthorization (userId: string, roles: Role[]) {
    const data = { userId, roleIds: roles.map(r => r.id).join(',') };
    return this._post<any, string>(this.saveAuthorizationUrl, data);
  }
}
