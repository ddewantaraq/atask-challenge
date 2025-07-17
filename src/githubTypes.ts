export interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

export type State = {
  search: string;
  loading: boolean;
  error: string | null;
  users: string[];
  expanded: string | null;
  repos: Record<string, Repo[]>;
};

export type Action =
  | { type: 'SET_SEARCH'; value: string }
  | { type: 'START_SEARCH' }
  | { type: 'SET_USERS'; users: string[] }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'EXPAND_USER'; username: string }
  | { type: 'SET_REPOS'; username: string; repos: Repo[] }
  | { type: 'COLLAPSE_USER' };

export const initialState: State = {
  search: '',
  loading: false,
  error: null,
  users: [],
  expanded: null,
  repos: {},
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_SEARCH':
      return { ...state, search: action.value };
    case 'START_SEARCH':
      return { ...state, loading: true, error: null, users: [], expanded: null, repos: {} };
    case 'SET_USERS':
      return { ...state, users: action.users, loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.error, loading: false };
    case 'EXPAND_USER':
      return { ...state, expanded: action.username };
    case 'COLLAPSE_USER':
      return { ...state, expanded: null };
    case 'SET_REPOS':
      return { ...state, repos: { ...state.repos, [action.username]: action.repos } };
    default:
      return state;
  }
} 