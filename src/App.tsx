import { JSX, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { searchUsernames, fetchReposForUsernames } from './githubApi';

function App(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [usernames, setUsernames] = useState<string[]>([]);
  const [reposByUser, setReposByUser] = useState<{ username: string; repos: any[] }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setReposByUser([]);
    try {
      const foundUsernames = await searchUsernames(search);
      setUsernames(foundUsernames);
      if (foundUsernames.length > 0) {
        const repos = await fetchReposForUsernames(foundUsernames);
        setReposByUser(repos);
      } else {
        setReposByUser([]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to search users or fetch repositories');
      setUsernames([]);
      setReposByUser([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <div style={{ marginTop: 32 }}>
        <h2>GitHub User Search</h2>
        <input
          type="text"
          placeholder="Search GitHub username"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading || !search} style={{ marginLeft: 8 }}>
          {loading ? 'Loading...' : 'Search'}
        </button>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        <ul style={{ marginTop: 16 }}>
          {usernames.map(username => (
            <li key={username} style={{ marginBottom: 8 }}>
              <strong>{username}</strong>
              <ul>
                {(reposByUser.find(u => u.username === username)?.repos || []).map(repo => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App 