require('dotenv').config();

module.exports = {
  localDb: {
    name: 'localDb',
    connector: 'postgresql',
    url: '',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoupdate: true,
  },
  remoteDb: {
    name: 'remoteDb',
    connector: 'postgresql',
    url: process.env.REMOTE_DB_URL,
    host: process.env.REMOTE_DB_HOST,
    port: process.env.REMOTE_DB_PORT,
    user: process.env.REMOTE_DB_USER,
    password: process.env.REMOTE_DB_PASSWORD,
    database: process.env.REMOTE_DB_NAME,
    autoupdate: true,
  },
};
