/* globals describe it */
var proxy = require('../index.js');
var backend = require('../backend.js');
var tilestrata = require('tilestrata');
var assert = require('chai').assert;

describe('"tilestrata-proxy"', function() {

    it('should return a remote content', function(done) {
        backend.prototype.request = function (options, callback) {
            assert.equal(options.uri, '/layer/5/5/12/tile.pbf');
            callback(null, {headers: {}}, 'thebuffer');
        };
        var server = new tilestrata.TileServer();

        var req = tilestrata.TileRequest.parse('/layer/5/5/12/tile.pbf');
        server.layer('layer').route('tile.pbf').use(proxy({uri: '/layer/{z}/{x}/{y}/tile.pbf'}));

        server.initialize(function(err) {
            assert.isFalse(!!err, err);
            server.serve(req, false, function(status, buffer) {
                assert.equal(status, 200);
                assert.equal(buffer, 'thebuffer');
                done();
            });
        });
    });
});
