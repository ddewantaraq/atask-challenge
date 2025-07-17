import RepoList from './RepoList';
import { State } from '../githubTypes';

interface UserListProps {
  state: State;
  onExpand: (username: string) => void;
}

export default function UserList({ state, onExpand }: UserListProps) {
  const { users, expanded, repos, loading, error, search } = state;
  
  if (error) {
    return <div className="text-red-600 mb-2 text-sm">{error}</div>;
  }
  if (!users.length && !loading) {
    return null;
  }
  return (
    <div>
      <div className="text-gray-500 text-sm">Showing users for "{search}"</div>
      {users.map(username => (
        <div key={username} className="mb-2">
          <button
            className="w-full flex items-center justify-between bg-gray-100 border border-gray-300 rounded px-3 py-2 text-left font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
            onClick={() => onExpand(username)}
            aria-expanded={expanded === username}
            aria-controls={`repos-${username}`}
          >
            <span>{username}</span>
            <span className="ml-2">
              {expanded === username ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              )}
            </span>
          </button>
          {expanded === username && (
            <div id={`repos-${username}`} className="mt-2">
              {repos[username] ? (
                <RepoList repos={repos[username]} />
              ) : (
                <div className="text-gray-500 text-sm">Loading repositories...</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 