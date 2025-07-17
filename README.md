# GitHub User Search

A React application that allows users to search for GitHub usernames and view their repositories. Built with Vite, React + TypeScript, and Tailwind CSS.

## Features

- 🔍 Search GitHub users by username
- 📋 Display user repositories with star counts
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast development with Vite
- 🧪 Comprehensive unit tests with Vitest
- 📱 Responsive design

## Deployment with PM2

Follow these steps to deploy your Vite + React app on a VPS using PM2:

### 1. Build the Application
```bash
npm run build
```
This creates a `dist` folder with static files.

### 2. Transfer Files to VPS
Upload the `dist` folder (and `ecosystem.config.js`) to your VPS, or build on the VPS directly.

### 3. Install a Static File Server
On your VPS, install `serve` globally:
```bash
npm install -g serve
```

### 4. Use the Provided PM2 Config
The file `ecosystem.config.js` is already included in this repo:
```js
module.exports = {
  apps: [
    {
      name: 'github-user-search',
      script: 'serve',
      args: '-s dist -l 5000',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
```

### 5. Start the App with PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. (Optional) Configure Nginx for Your Domain
Proxy requests from your domain to `localhost:5000` (see Nginx docs for details).

### Notes on Environment Variables
- The `VITE_GITHUB_TOKEN` is baked into the build at build time. If you need to change it, update your `.env` and rebuild (`npm run build`).
- You do **not** need to set `VITE_GITHUB_TOKEN` in the PM2 config unless you are building on the server.

---

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
