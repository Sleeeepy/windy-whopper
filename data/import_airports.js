conn = new Mongo();
db = conn.getDB("nav-dev");

cursor = db.airports.find({name:/london/i});

while ( cursor.hasNext() ) {
   printjson( cursor.next());
}


db.airports.find().forEach( function(doc) { 
		if (!doc.geo){		
			db.airports.update( { "_id": doc._id },
								{	$set : {	"geo": {
												"type":"Point",
												"coordinates":[doc.lng,doc.lat]}
											},
									$unset : {	"lat":"",
												"lng":""
											}
											
								}
			
							);
		}
});

db.airports.ensureIndex({geo:"2dsphere"});