/*
REQ OBJ
{
	"STA":"9278794500",
	"END":"9468421975"
}

RES OBJ
{
    "success": true,
    "count": 5,
    "duration": "25ms",
    "message": [
        {
            "UNM": "Mabel",
            "PHN": "7745883386"
        },
        {
            "UNM": "Holly",
            "PHN": "8596894475"
        },
		......
    ]
}

*/

/*MODULES*/
var neo4j     			=   require('neo4j-driver').v1;
var url       			=   require('../url');

/*AUTHENTICATION*/
var driver        		=   neo4j.driver(url.bolt_url, neo4j.auth.basic(url.unm, url.pwd));

/*JSON*/
var SOME_ERR			=	{ success: false, 	message: 'No Alternatives Found'	      				};
var SUCCESS 			=	{ success:  true, 	count:1,  duration:0, message: 'You Are Now Registered'	};
var INVAL_INFO 			= 	{ success: false,	message: 'Invalid Information Posted'     				};


/*FINDS ALTERNATE*/
var alter = function(obj,res){
	var db	  = driver.session();

	if (!(obj.STA&&obj.END)) {res.json(INVAL_INFO); return;}
	
	var start = obj.STA;
	var end	  = obj.END;

	var cql = "match (s:Person{PHN:'"+start+"'}), (e:Person{PHN:'"+end+"'}), p = allShortestPaths((s)-[:Knows*]-(e)) return s,e,p";

	var t0 = new Date().getTime();;
	
	db.run(cql).then(function(result){
		var path = [];		//PATH STORES DIFFERENT TRACKS

		for (var i = 0; i < result.records.length; i++) {
				var segment = result.records[i]._fields[2].segments;
				path.push(segment[1].start.properties);
		}

		var reg_json 		=   SUCCESS;
		reg_json.message 	= 	path;
		reg_json.count		=	path.length;
		reg_json.duration 	= 	((new Date().getTime()) - t0)+'ms';
		
		if (reg_json.count>0) {
			res.json(reg_json);
		}else{
			res.json(SOME_ERR);
		}
		

	}).catch(function(err){if (err) {console.log(err); res.json(SOME_ERR); return;}});

};

/*EXPORTS  #############*/
module.exports 	= alter;
