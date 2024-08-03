export const proxyUtil = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://www.example.com'
    : 'http://localhost:3000'

export const serverProxy = () =>
  process.env.NODE_ENV === 'production'
    ? 'https://api.example.com'
    : 'http://localhost:8080'
