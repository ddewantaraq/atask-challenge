import { useReducer, useRef, useEffect } from 'react';
import './App.css';
import { searchUsernames, fetchUserRepos } from './githubApi';
import { initialState, reducer } from './githubTypes';
import UserList from './components/UserList';

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
        <UserList
          state={state}
          onExpand={handleExpand}
        />
      </div>
    </div>
  );
} 