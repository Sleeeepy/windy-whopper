/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Weather = require('./weather.model');

exports.register = function(socket) {
  Weather.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Weather.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('weather:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('weather:remove', doc);
}