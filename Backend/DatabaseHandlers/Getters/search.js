/*
POST DATA
{
	"UNM":"an"
}
*/

/*MODULES*/
var neo4j     			=   require('neo4j-driver').v1;
var url       			=   require('../url');

/*AUTHENTICATION*/
var driver        		=   neo4j.driver(url.bolt_url, neo4j.auth.basic(url.unm, url.pwd));

/*JSON*/
var SOME_ERR			=	{ success: false, 	message: 'Error In Server '			      };
var SUCCESS 			=	{ success:  true, 	count:1, message: 'You Are Now Registered'};
var INVAL_INFO 			= 	{ success: false,	message: 'Invalid Information Posted'     };

/*FINDS SHORTEST PATH*/
var shortestPath = function(obj,res){
	var db	  = driver.session();

	if (!(obj.UNM)) {res.json(INVAL_INFO); return;}
	
	var unm = obj.UNM;

	var cql = "match (n) where n.UNM STARTS WITH '"+unm+"' return n";

	db.run(cql).then(function(result){

		var node = [];

		for (var i = 0; i < result.records.length; i++) {
			node.push(result.records[i]._fields[0].properties);
		}

		if (node.length>0) {
			var search_result = SUCCESS;
			search_result.message = node;
			search_result.count	  = node.length;
			res.json(search_result);
		}else{
			var no_res = SOME_ERR;
			no_res.message = 'No Result Was Found';
			res.json(no_res);
		}
		

	}).catch(function(err){if (err) {console.log(err); res.json(SOME_ERR); return;}});

};

/*EXPORTS  #############*/
module.exports 	= shortestPath;
