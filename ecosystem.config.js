// eslint-disable-next-line no-undef
module.exports = {
  apps: [
    {
      name: 'Backend-Test',
      script: 'dist/index.js',
      env_development: {
        NODE_ENV: 'development',
      }
    }
  ]
}
