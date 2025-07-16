import { useReducer, useRef, useEffect } from 'react';
import './App.css';
import { searchUsernames, fetchUserRepos } from './githubApi';

interface Repo {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  html_url: string;
}

type State = {
  search: string;
  loading: boolean;
  error: string | null;
  users: string[];
  expanded: string | null;
  repos: Record<string, Repo[]>;
};

type Action =
  | { type: 'SET_SEARCH'; value: string }
  | { type: 'START_SEARCH' }
  | { type: 'SET_USERS'; users: string[] }
  | { type: 'SET_ERROR'; error: string | null }
  | { type: 'EXPAND_USER'; username: string }
  | { type: 'SET_REPOS'; username: string; repos: Repo[] }
  | { type: 'COLLAPSE_USER' };

const initialState: State = {
  search: '',
  loading: false,
  error: null,
  users: [],
  expanded: null,
  repos: {},
};

function reducer(state: State, action: Action): State {
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && state.search.trim()) {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    dispatch({ type: 'START_SEARCH' });
    try {
      const users = await searchUsernames(state.search.trim());
      dispatch({ type: 'SET_USERS', users });
      if (users.length === 0) {
        dispatch({ type: 'SET_ERROR', error: 'No users found.' });
      }
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', error: err.message || 'Failed to search users.' });
    }
  };

  const handleExpand = async (username: string) => {
    if (state.expanded === username) {
      dispatch({ type: 'COLLAPSE_USER' });
      return;
    }
    dispatch({ type: 'EXPAND_USER', username });
    if (!state.repos[username]) {
      try {
        const repos = await fetchUserRepos(username);
        dispatch({ type: 'SET_REPOS', username, repos });
      } catch (err: any) {
        dispatch({ type: 'SET_ERROR', error: err.message || 'Failed to fetch repositories.' });
      }
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <input
          ref={inputRef}
          type="text"
          className="w-full border border-gray-300 rounded mb-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search github username here ..."
          value={state.search}
          onChange={e => dispatch({ type: 'SET_SEARCH', value: e.target.value })}
          onKeyDown={handleKeyDown}
          aria-label="Search github username here ..."
        />
        <button
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded mb-4 transition-colors disabled:opacity-50 ${state.loading || !state.search.trim() ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleSearch}
          disabled={state.loading || !state.search.trim()}
        >
          {state.loading ? 'Searching...' : 'Search'}
        </button>
        {state.error && <div className="text-red-600 mb-2 text-sm">{state.error}</div>}
        <div>
          {state.users.map(username => (
            <div key={username} className="mb-2">
              <button
                className="w-full flex items-center justify-between bg-gray-100 border border-gray-300 rounded px-3 py-2 text-left font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                onClick={() => handleExpand(username)}
                aria-expanded={state.expanded === username}
                aria-controls={`repos-${username}`}
              >
                <span>{username}</span>
                <span className="ml-2">
                  {state.expanded === username ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  )}
                </span>
              </button>
              {state.expanded === username && (
                <div id={`repos-${username}`} className="mt-2">
                  {state.repos[username] ? (
                    state.repos[username].length > 0 ? (
                      state.repos[username].map(repo => (
                        <div key={repo.id} className="bg-gray-200 rounded p-4 mb-2 flex items-center justify-between">
                          <div>
                            <div className="font-semibold text-lg">{repo.name}</div>
                            <div className="text-sm text-gray-700">{repo.description || 'No description'}</div>
                          </div>
                          <div className="flex items-center ml-4">
                            <span className="font-bold text-lg mr-1">{repo.stargazers_count}</span>
                            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-gray-500 text-sm">No repositories found.</div>
                    )
                  ) : (
                    <div className="text-gray-500 text-sm">Loading repositories...</div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 