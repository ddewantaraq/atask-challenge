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