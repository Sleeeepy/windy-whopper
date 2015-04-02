'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AirportSchema = new Schema({
  IATA: String,
  IACO: String,
  name: String,
  city: String,
  province: String,
  state: String,
  country: String,
  wiki: String,
  geo: {type: { type: String }, coordinates: []}
});

AirportSchema.index({ geo: '2dsphere' });

AirportSchema.virtual('lng')
      .get(function(){
          return this.geo.coordinates[0];
      })
      .set(function(setLngTo){
        this.set('geo.coordinates[0]',setLngTo);
      });

AirportSchema.virtual('lat')
            .get(function(){
                return this.geo.coordinates[1];
            })
            .set(function(setLatTo){
              this.set('geo.coordinates[1]',setLatTo);
            });


module.exports = mongoose.model('Airport', AirportSchema);
