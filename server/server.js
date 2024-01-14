// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

require('dotenv').config();
const cors = require('cors');
const loopback = require('loopback');
const boot = require('loopback-boot');

// create model-config.json from model-config.js
const path = require('path');
const fs = require('fs');
const modelConfig = require('./model-config.js');
const modelConfigJson = JSON.stringify(modelConfig, null, 2);
fs.writeFileSync(path.resolve(__dirname, 'model-config.json'), modelConfigJson);

const datasources = require('./datasources');
const app = (module.exports = loopback());
app.use(cors());

if (process.env.DB_IN_USE === 'localDb') {
  app.dataSource('localDb', datasources.localDb);
}

if (process.env.DB_IN_USE === 'remoteDb') {
  app.dataSource('remoteDb', datasources.remoteDb);
}

app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
