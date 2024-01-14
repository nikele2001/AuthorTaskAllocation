require('dotenv').config();
const datasources = require('./datasources');

var server = require('./server');
var ds;

if (process.env.DB_IN_USE === 'localDb') {
  ds = server.dataSources.localDb;
}

if (process.env.DB_IN_USE === 'remoteDb') {
  ds = server.dataSources.remoteDb;
}

var lbTables = [
  'User',
  'AccessToken',
  'ACL',
  'RoleMapping',
  'Role',
  'Author',
  'Task',
];
ds.autoupdate(lbTables, function (er) {
  if (er) throw er;
  console.log(
    'Loopback tables [' - lbTables - '] created in ',
    ds.adapter.name
  );
  ds.disconnect();
});
