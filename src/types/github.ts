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
    | { type: 'COLLAPSE_USER' }
    | { type: 'RESET_ALL' };