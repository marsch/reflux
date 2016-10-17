var fs = require('fs')
var path = require('path')
var express = require('express')
var historyAPIFallback = require('connect-history-api-fallback')
var qs = require('querystring')
var https   = require('https')

// Load config defaults from JSON file.
// Environment variables override defaults.
function loadConfig() {
  var config = JSON.parse(fs.readFileSync(__dirname+ '/gatekeeper.config.json', 'utf-8'));
  for (var i in config) {
    config[i] = process.env[i.toUpperCase()] || config[i];
  }
  console.log('Configuration');
  console.log(config);
  return config;
}

var config = loadConfig();
function authenticate(code, cb) {
  var data = qs.stringify({
    client_id: config.oauth_client_id,
    client_secret: config.oauth_client_secret,
    code: code,
    grant_type: 'authorization_code'
  });

  var reqOptions = {
    host: config.oauth_host,
    port: config.oauth_port,
    path: config.oauth_path,
    method: config.oauth_method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'content-length': data.length
    }
  };

  var body = '';
  var req = https.request(reqOptions, function(res) {
    res.setEncoding('utf8');
    res.on('data', function (chunk) { body += chunk; });
    res.on('end', function() {
      try {
        var parsed = JSON.parse(body)
        cb(null, parsed.access_token)
      } catch(e) {
        cb(new Error('error parsing response'), null)
      }

    });
  });

  req.write(data);
  req.end();
  req.on('error', function(e) { cb(e.message); });
}

var app = express()
app.set('port', (process.env.PORT || 3000))

app.get('/authenticate/:code', function(req, res) {
  console.log('authenticating code:' + req.params.code);
  authenticate(req.params.code, function(err, token) {
    if (err || !token) {
      return res.json(402, {
        error: 'bad_code'
      });
    }
    res.json({
      token: token
    });
  });
})

app.use(historyAPIFallback())

try {
  fs.statSync('dist')
  console.log('Serving static build from dist/')
  console.log('Run `npm run clean` to return to development mode')
  app.use('/', express.static(path.join(__dirname, 'dist')));
}
catch (e) {
  console.log('Serving development build with nwb middleware')
  console.log('Run `npm run build` to create a production build')
  app.use(require('nwb/express')(express))
}

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
