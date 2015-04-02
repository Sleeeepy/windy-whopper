/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Airport = require('./airport.model');

exports.register = function(socket) {
  Airport.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Airport.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('airport:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('airport:remove', doc);
}