var request = require('request');

function Backend(server, options) {

    if (typeof options === 'string') options = {uri: options};

    this.options = options;
    if (!this.options.uri) throw new Error('Missing proxy uri parameter');
    this.uri = this.options.uri;

    this.server = server;
}

Backend.prototype.initialize = function(callback) {
    callback();
};

Backend.prototype.getTile = function(req, callback) {
    var self = this;
    var options = {
        uri: self.template(this.uri, req),
        encoding: null  // we want a buffer, not a string
    };
    this.request(options, function onResponse (err, resp, body) {
        if (err) return callback(err);
        var compression = false;
        if (resp.headers['content-encoding'] === 'gzip') compression = 'gunzip';
        else if (resp.headers['content-encoding'] === 'deflate') compression = 'inflate';
        else if (body && body[0] === 0x1F && body[1] === 0x8B) compression = 'gunzip';
        else if (body && body[0] === 0x78 && body[1] === 0x9C) compression = 'inflate';
        if (compression) {
            zlib[compression](body, function(err, data) {
                if (err) return callback(err);
                callback(null, data);
            });
        } else {
            callback(null, body);
        }
    });

};

Backend.prototype.request = function (options, callback) {
    request(options, callback);
};

Backend.prototype.template = function (str, data) {
    return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
        var value = data[key];
        if (value === undefined) {
            throw new Error('No value provided for variable ' + str);
        } else if (typeof value === 'function') {
            value = value(data);
        }
        return value;
    });
};


module.exports = Backend;
