import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService, PageQuery } from '@tzg/ng-shared';
import { Resource } from '../models/models';

@Injectable()
export class ResourceManagerService extends BaseService<Resource> {
  getUrl = 'auth/resource/proto/get';
  listUrl = 'auth/resource/proto/index';
  addUrl = 'auth/resource/proto/post';
  editUrl = 'auth/resource/proto/put';
  deleteUrl = 'auth/resource/proto/delete';
  constructor(protected http: Http) {
    super(http);
  }
}
