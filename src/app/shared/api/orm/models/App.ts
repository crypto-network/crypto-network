/* tslint:disable */

import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/takeUntil';
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { RealTime } from '../../services';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { OrmBase } from '../base';
import { applyFilter } from '../filter';

import * as models from '../../models';
import { App, LoopBackFilter } from '../../models';
import { AppActions } from '../../actions';

export class OrmApp extends OrmBase<App> {
  constructor(protected store: Store<App>, protected realTime?: RealTime) {
    super(store, App, AppActions, realTime);
  }

	public getUser(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getUser(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.user.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public getOrganization(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getOrganization(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.organization.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public getS3Photo(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getS3Photo(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.s3Photo.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public createS3Photo(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createS3Photo(id, data, meta));
  }
  
	public updateS3Photo(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateS3Photo(id, data, meta));
  }
  
	public destroyS3Photo(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyS3Photo(id, meta));
  }
  
	public getOption(id: any, refresh: any = {}, meta?: any): Observable<any> {
    this.store.dispatch(new this.actions.getOption(id, refresh, meta));

    return this.store.select(this.model.getModelDefinition().relations.option.model + 's')
      .map((state: any) => state.entities[id]);
  }
  
	public createOption(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.createOption(id, data, meta));
  }
  
	public updateOption(id: any, data: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.updateOption(id, data, meta));
  }
  
	public destroyOption(id: any, meta?: any): void {
    this.store.dispatch(new this.actions.destroyOption(id, meta));
  }
  
	public s3PUTSignedUrl(id: any, key: any = {}, options: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.s3PUTSignedUrl(id, key, options, meta));
  }
  
	public s3GETSignedUrl(id: any, key: any = {}, meta?: any): void {
    this.store.dispatch(new this.actions.s3GETSignedUrl(id, key, meta));
  }
  
	public createManyS3Photo(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyS3Photo(id, data, meta));
  }
  
	public createManyOption(id: any, data: any[] = [], meta?: any): void {
    this.store.dispatch(new this.actions.createManyOption(id, data, meta));
  }
  }