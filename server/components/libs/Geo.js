/** Extend Number object with method to convert numeric degrees to radians */
'use strict';
if (typeof Number.prototype.toRadians === 'undefined') {
	Number.prototype.toRadians = function() { return this * Math.PI / 180; };
}
/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (typeof Number.prototype.toDegrees === 'undefined') {
	Number.prototype.toDegrees = function() { return this * 180 / Math.PI; };
}

var RADIUS = 6371;
/*
* @constructor
* @param {number} lat - Latitude in degrees.
* @param {number} lng - Longitude in degrees.
*
* @example
* var p1 = new LatLng(52.205, 0.119);
*/
function LatLng(point) {
	// allow instantiation without 'new'
	if (!(this instanceof LatLng)) return new LatLng(point);

	this.lat = Number(point.lat);
	this.lng = Number(point.lng);

}


/*
* Returns the distance from 'this' point to destination point (using haversine formula).
*
* @param {LatLng} point - Latitude/longitude of destination point.
* @returns {number} Distance between this point and destination point, in km (on sphere of 'this' radius).
*
* @example
* var p1 = new LatLng(52.205, 0.119), p2 = new LatLng(48.857, 2.351);
* var d = p1.distanceTo(p2); // d.toPrecision(4): 404.3
*/
LatLng.prototype.distanceTo = function(point) {
	point = new LatLng(point);
	//var R = RADIUS;
	var phi1 = 	this.lat.toRadians(),
							lambda1 = this.lng.toRadians();
	var phi2 = point.lat.toRadians(), lambda2 = point.lng.toRadians();
	var d_phi = phi2 - phi1;
	var d_lambda = lambda2 - lambda1;
	var a = Math.sin(d_phi/2) * Math.sin(d_phi/2) +
					Math.cos(phi1) * Math.cos(phi2) *
					Math.sin(d_lambda/2) * Math.sin(d_lambda/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	return RADIUS * c;
};



/*
* Returns the midpoint between 'this' point and the supplied point.
*
* @param {LatLng} point - Latitude/longitude of destination point.
* @returns {LatLng} Midpoint between this point and the supplied point.
*
* @example
* var p1 = new LatLng(52.205, 0.119), p2 = new LatLng(48.857, 2.351);
* var pMid = p1.midpointTo(p2); // pMid.toString(): 50.5363°N, 001.2746°E
*/

LatLng.prototype.midpointTo = function(point) {
	// see http://mathforum.org/library/drmath/view/51822.html for derivation

	var phi1 = this.lat.toRadians(), lambda1 = this.lng.toRadians();
	var phi2 = point.lat.toRadians();
	var d_lambda = (point.lng-this.lng).toRadians();
	var Bx = Math.cos(phi2) * Math.cos(d_lambda);
	var By = Math.cos(phi2) * Math.sin(d_lambda);
	var phi3 = Math.atan2(Math.sin(phi1)+Math.sin(phi2),
	Math.sqrt( (Math.cos(phi1)+Bx)*(Math.cos(phi1)+Bx) + By*By) );
	var lambda3 = lambda1 + Math.atan2(By, Math.cos(phi1) + Bx);
	lambda3 = (lambda3+3*Math.PI) % (2*Math.PI) - Math.PI; // normalise to -180..+180°
	return new LatLng({lat:phi3.toDegrees(),lng: lambda3.toDegrees()});
};



// creates bisection waypoints until close to max distance
LatLng.prototype.pathTo=function(finish,maxdist){
	maxdist = maxdist || 100;
	finish = new LatLng(finish);
	var start = this;
	var path = [start,finish];
	var dist = start.distanceTo(finish);

	do{
		var temppath = [path[0]];
		for	(var i = 0; i < path.length-1; i++) {
			temppath.push(path[i].midpointTo(path[i+1]),path[i+1]);
		}

		path = temppath;
		dist /=2;

	}while(dist-maxdist>Math.abs(dist/2-maxdist));

	return path;
};

module.exports = LatLng;
