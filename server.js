var http = require('http');
var browserify = require('browserify');
var ecstatic = require('ecstatic');

http.createServer(function (req, res) {
  if (req.url === '/bundle.js') {
    res.setHeader('content-type', 'application/javascript');
    var b = browserify(__dirname + '/app.js').bundle();
    b.on('error', console.error);
    b.pipe(res);

  }
  else ecstatic({ root: __dirname + '/public'  })(req, res);

}).listen(1337);

console.log('Server running at http://127.0.0.1:1337/');
