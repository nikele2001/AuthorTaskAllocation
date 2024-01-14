require('dotenv').config();

module.exports = {
  _meta: {
    sources: [
      'loopback/common/models',
      'loopback/server/models',
      '../common/models',
      './models',
    ],
    mixins: [
      'loopback/common/mixins',
      'loopback/server/mixins',
      '../common/mixins',
      './mixins',
    ],
  },
  User: {
    dataSource: process.env.DB_IN_USE,
  },
  AccessToken: {
    dataSource: process.env.DB_IN_USE,
    public: false,
  },
  ACL: {
    dataSource: process.env.DB_IN_USE,
    public: false,
  },
  RoleMapping: {
    dataSource: process.env.DB_IN_USE,
    public: false,
    options: {
      strictObjectIDCoercion: true,
    },
  },
  Role: {
    dataSource: process.env.DB_IN_USE,
    public: false,
  },
  Author: {
    dataSource: process.env.DB_IN_USE,
    public: true,
  },
  Task: {
    dataSource: process.env.DB_IN_USE,
    public: true,
  },
};
