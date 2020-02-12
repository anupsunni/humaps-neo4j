/*
POST DATA
{
	"STA":"9278794500",
	"END":"9468421975"
}
*/

/*MODULES*/
var neo4j     			=   require('neo4j-driver').v1;
var url       			=   require('../url');

/*AUTHENTICATION*/
var driver        		=   neo4j.driver(url.bolt_url, neo4j.auth.basic(url.unm, url.pwd));

/*JSON*/
var SOME_ERR			=	{ success: false, 	message: 'Error In Server '			      				};
var SUCCESS 			=	{ success:  true, 	count:1,  duration:0, message: 'You Are Now Registered'	};
var INVAL_INFO 			= 	{ success: false,	message: 'Invalid Information Posted'     				};


/*FINDS SHORTEST PATH*/
var shortestPath = function(obj,res){
	var db	  = driver.session();

	if (!(obj.STA&&obj.END)) {res.json(INVAL_INFO); return;}
	
	var start = obj.STA;
	var end	  = obj.END;

	var cql = "match (s:Person{PHN:'"+start+"'}), (e:Person{PHN:'"+end+"'}), p = shortestPath((s)-[:Knows*]-(e)) return s,e,p";

	var t0 = new Date().getTime();;
	
	db.run(cql).then(function(result){
		var path = [];
		var resp = result.records[0]._fields[2].segments;
		path.push({"UNM":resp[0].start.properties.UNM},{"UNM":resp[0].end.properties.UNM});

		for (var i = 1; i < resp.length; i++) {
			path.push({"UNM":resp[i].end.properties.UNM});
		}

		var reg_json 		= SUCCESS;
		reg_json.message 	= 	path;
		reg_json.count		=	path.length;
		reg_json.duration 	= 	((new Date().getTime()) - t0)+'ms';
		
		res.json(reg_json);

	}).catch(function(err){if (err) {console.log(err); res.json(SOME_ERR); return;}});

};

/*EXPORTS  #############*/
module.exports 	= shortestPath;