/*MODULES*/
var neo4j     =   require('neo4j-driver').v1;
var url       =   require('../url');

/*AUTHENTICATION*/
var driver        =   neo4j.driver(url.bolt_url, neo4j.auth.basic(url.unm, url.pwd));



/*CHECKS WHETHER USER IS A MEMBER*/
var check = function(req,res){
	var db = driver.session();
	var cql = 'match (so:Person{name:"Soumya"}), (ma:Person{name:"Mark"}), p = shortestPath((so)-[:Knows*]-(ma)) return so,ma,p';


	db.run(cql).then(function(result){
		var path = [];

		console.log("RECORDS RECORDS START START============================================")
		console.log(result.records[0]._fields[2].segments);
		console.log("RECORDS RECORDS END END============================================")
		var resp = result.records[0]._fields[2].segments;


		path.push(resp[0].start.properties.name,resp[0].end.properties.name)
		for (var i = 1; i < resp.length; i++) {/*
			console.log(result.records[i]._fields[0].properties);
			resp.push(result.records[i]._fields[0].properties);*/
			path.push(resp[i].end.properties.name);
		}
		res.json(path);
	}).catch(function(err){
		console.log(err);
		res.send(err);
	})


};

/*EXPORTS  #############*/
module.exports 	= check;