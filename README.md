# GitHub User Search

A React application that allows users to search for GitHub usernames and view their repositories. Built with Vite, React + TypeScript, and Tailwind CSS.

## Features

- 🔍 Search GitHub users by username
- 📋 Display user repositories with star counts
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 🧪 Comprehensive unit tests with Vitest
- 📱 Responsive design

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest, React Testing Library
- **API**: GitHub REST API via Octokit

## Getting Started

### Prerequisites

- Node.js (version 18r higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd atask-challenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add your GitHub token:
   ```
   VITE_GITHUB_TOKEN=your_github_token_here
   ```
   
   > **Note**: You can create a GitHub token at [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173# Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Testing

The project includes comprehensive unit tests with at least 70% coverage:

- Component tests for UserList and RepoList
- Reducer tests for state management
- API utility tests

Run tests with:
```bash
npm run test
```

## Project Structure

```
src/
├── components/          # React components
│   ├── UserList.tsx    # User list component
│   └── RepoList.tsx    # Repository list component
├── apis/               # API utilities
│   └── github.ts       # GitHub API functions
├── reducers/           # State management
│   └── github.ts       # GitHub reducer
├── types/              # TypeScript type definitions
│   └── github.ts       # GitHub-related types
├── test/               # Test files
│   ├── setup.ts        # Test setup
│   └── components/     # Component tests
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```
