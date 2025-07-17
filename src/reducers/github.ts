import { 
  COLLAPSE_USER, 
  EXPAND_USER, 
  RESET_ALL, 
  SET_ERROR, 
  SET_REPOS, 
  SET_SEARCH, 
  SET_USERS, 
  START_SEARCH 
} from "../const";
import { Action, State } from "types/github";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.value };
    case START_SEARCH:
      return { ...state, loading: true, error: null, users: [], expanded: null, repos: {} };
    case SET_USERS:
      return { ...state, users: action.users, loading: false };
    case SET_ERROR:
      return { ...state, error: action.error, loading: false };
    case EXPAND_USER:
      return { ...state, expanded: action.username };
    case COLLAPSE_USER:
      return { ...state, expanded: null };
    case SET_REPOS:
      return { ...state, repos: { ...state.repos, [action.username]: action.repos } };
    case RESET_ALL:
      return { ...state, repos: {}, users: [] };
    default:
      return state;
  }
} 