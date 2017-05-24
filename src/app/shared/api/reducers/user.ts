/* tslint:disable */
import { Observable } from 'rxjs/Observable';
import { createSelector } from 'reselect';
import { Action } from '@ngrx/store';
import { BaseReducerFactory } from './base';
import { User } from '../models';
import { UserActionTypes } from '../actions';

export interface UserState {
  ids: string[];
  entities: { [id: string]: User };
};

const initialState: UserState = {
  ids: [],
  entities: {},
};

const cases = BaseReducerFactory<UserState, User>(UserActionTypes);

/**
 * @module UsersReducer
 * @author João Ribeiro <@JonnyBGod> <github:JonnyBGod>
 * @license MIT
 * @description
 * Provides with a LoopBack compatible User reducer.
 */
export function UsersReducer(state = initialState, action: Action): UserState {
  if (cases[action.type]) {
    return cases[action.type](state, action);
  } else {
    return state;
  }
}

export const getUsersState = (state: any) => state.User;
export const getUsersEntities = (state: any) => state.User.entities;
export const getUsersIds = (state: any) => state.User.ids;

export const getUsers =
  createSelector(getUsersEntities, getUsersIds, (entities, ids) => ids.map((id) => entities[id]));

export function getUserById(id: string) {
  return (state: any) => state.User.entities[id];
}

export function getUsersById(ids: string[]) {
  return createSelector(getUsersEntities, (entities) => ids.map((id) => entities[id]));
}