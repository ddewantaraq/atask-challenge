import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import RepoList from '../../components/RepoList';
import type { Repo } from '../../types/github';

describe('RepoList', () => {
  const repos: Repo[] = [
    {
      id: 1,
      name: 'repo1',
      description: 'desc1',
      stargazers_count: 10,
      html_url: 'https://github.com/user/repo1',
    },
    {
      id: 2,
      name: 'repo2',
      description: '',
      stargazers_count: 5,
      html_url: 'https://github.com/user/repo2',
    },
  ];

  it('renders empty state', () => {
    render(<RepoList repos={[]} />);
    expect(screen.getByText(/no repositories found/i)).toBeInTheDocument();
  });

  it('renders a list of repos', () => {
    render(<RepoList repos={repos} />);
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('desc1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
    expect(screen.getByText('No description')).toBeInTheDocument();
  });
}); 