import { Repo } from "types/github";

interface RepoListProps {
  repos: Repo[];
}

export default function RepoList({ repos }: RepoListProps) {
  if (!repos.length) {
    return <div className="text-gray-500 text-sm">No repositories found.</div>;
  }
  return (
    <div className="max-h-64 overflow-y-auto">
      {repos.map(repo => (
        <div key={repo.id} className="bg-gray-200 rounded p-4 mb-2 flex items-center justify-between">
          <div className="text-start">
            <div className="font-semibold text-lg">{repo.name}</div>
            <div className="text-sm text-gray-700">{repo.description || 'No description'}</div>
          </div>
          <div className="flex items-center ml-4">
            <span className="font-bold text-lg mr-1">{repo.stargazers_count}</span>
            <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" /></svg>
          </div>
        </div>
      ))}
    </div>
  );
} 