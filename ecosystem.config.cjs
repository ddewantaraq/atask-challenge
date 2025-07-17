module.exports = {
  apps: [
    {
      name: 'github-user-search',
      script: 'npm',
      args: 'run start:prod',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
}; 