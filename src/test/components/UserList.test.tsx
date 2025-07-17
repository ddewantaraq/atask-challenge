import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from '../../components/UserList';
import type { State } from '../../types/github';

describe('UserList', () => {
  const baseState: State = {
    search: 'test',
    loading: false,
    error: null,
    users: [],
    expanded: null,
    repos: {},
  };

  it('renders nothing if no users and not loading', () => {
    render(<UserList state={baseState} onExpand={() => {}} />);
    expect(screen.queryByText(/showing users/i)).not.toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<UserList state={{ ...baseState, error: 'Error!' }} onExpand={() => {}} />);
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('renders user list and handles expand', () => {
    const onExpand = vi.fn();
    const state = {
      ...baseState,
      users: ['alice', 'bob'],
      repos: {},
    };
    render(<UserList state={state} onExpand={onExpand} />);
    expect(screen.getByText(/showing users for/i)).toBeInTheDocument();
    expect(screen.getByText('alice')).toBeInTheDocument();
    expect(screen.getByText('bob')).toBeInTheDocument();
    fireEvent.click(screen.getByText('alice'));
    expect(onExpand).toHaveBeenCalledWith('alice');
  });
}); 