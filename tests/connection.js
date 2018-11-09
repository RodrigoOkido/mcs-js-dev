var mcs = require('../index');

const _port = 8080;
const _host = 'localhost';
const _timeout = 2000;

exports.connect = function (test) {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port);

  setTimeout(function () {
    test.ok(false,'Server timeout');
    server.closeConnection();
    client.closeConnection();
    test.done();
  }, _timeout);

  client.on('open', function () {
    test.ok(true, 'Connection is working');
    server.closeConnection();
    client.closeConnection();
    test.done();
  });
}

exports.disconnect = function (test) {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port);

  setTimeout(function () {
    test.ok(false,'Server timeout');
    server.closeConnection();
    client.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.on('close', () => {
      server.closeConnection();
      test.ok(true, 'User disconnected!');
      test.done();
    });
  });

  client.on('open', () => {
    client.closeConnection();
  });
}

exports.disconnected = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    server.closeConnection();
    client.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (rclient) => {
    rclient.closeConnection();
  });

  client.on('close', () => {
    client.closeConnection();
    server.closeConnection();
    test.ok(true, 'Server disconnected!')
    test.done();
  });

}

exports.connectionId = (test) => {
  var server = new mcs.Server({port: _port});
  var client = new mcs('ws://' + _host + ':' + _port);

  setTimeout(() => {
    test.ok(false,'Server timeout');
    server.closeConnection();
    client.closeConnection();
    test.done();
  }, _timeout);

  server.on('connection', (client) => {
    test.notEqual(null, client.id, 'Connection ID is valid');
    server.closeConnection();
    client.closeConnection();
    test.done();
  });
}
