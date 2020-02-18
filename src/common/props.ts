/**
 * src/common/props.ts
 * Global strings, objects and other properties.
 * © George Pickering 2020, https://github.com/geopic
 */

export default {
  site: {
    name: 'Visual Goals',
    // When in development, both the front-end and back-end run on different servers.
    // But in production, the back-end serves the front-end as static HTML files.
    // These 'server' properties refer to the back-end in development.
    serverPort: 3010,
    get serverHost() {
      return process.env.NODE_ENV === 'development'
        ? `http://localhost:${this.serverPort}`
        : '/';
    },
    // localStorage entry.
    lsEntry: 'visual-goals'
  }
};
