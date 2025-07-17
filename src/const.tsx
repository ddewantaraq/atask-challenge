import { State } from "types/github";

export const initialState: State = {
    search: '',
    loading: false,
    error: null,
    users: [],
    expanded: null,
    repos: {},
  };

export const SET_SEARCH = 'SET_SEARCH'
export const START_SEARCH = 'START_SEARCH'
export const SET_USERS = 'SET_USERS'
export const SET_ERROR = 'SET_ERROR'
export const EXPAND_USER = 'EXPAND_USER'
export const COLLAPSE_USER = 'COLLAPSE_USER'
export const SET_REPOS = 'SET_REPOS'
export const RESET_ALL = 'RESET_ALL'