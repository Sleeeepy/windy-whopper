/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Flight = require('./flight.model');

exports.register = function(socket) {
  Flight.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Flight.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('flight:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('flight:remove', doc);
}