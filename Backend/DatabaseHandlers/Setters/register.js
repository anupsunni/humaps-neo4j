/*
POST DATA
{
    "UNM":"Anup",
    "PHN":"9040664424",
    "CON":[
            {
                "PHN": 7947798184,
                "UNM": "Logan"
            }, .  .  .  .  .  .  .]
*/

/*MODULES*/
var neo4j     =   require('neo4j-driver').v1;
var url       =   require('../url');

/*AUTHENTICATION*/
var driver        =   neo4j.driver(url.bolt_url, neo4j.auth.basic("neo4j", url.pwd));

/*JSON*/
var SOME_ERR			=	{ success: false, 	message: 'Error In Server '			  };
var REGISTERED			=	{ success:  true, 	message: 'You Are Now Registered'	  };
var INVAL_INFO 			= 	{ success: false,	message: 'Invalid Information Posted' };

/*REGISTERS THE USER AND CREATES CONTACTS CLUSTER*/
var register = function(obj,res){
	var db = driver.session();
	if (!(obj.UNM&&obj.PHN&&obj.CON)) {res.json(INVAL_INFO); return;}
	

	var unm = obj.UNM;
	var phn = obj.PHN;
	var con = obj.CON;

	/*VALIDATE ALL THE NUMBERS HERE*/
	var reg_cql = "merge (u:Person{UNM:'"+unm+"' ,PHN:'"+phn+"' }) ";

	/* !!!!!! USE PROMISES IN THE FUTURE FOR PERFORMANCE*/
	for (var i = 0; i < con.length; i++) {
		reg_cql += "merge (k"+i+":Person{UNM:'"+con[i].UNM+"' ,PHN:'"+con[i].PHN+"' }) merge (u)<-[:Knows]->(k"+i+") "
	}

	db.run(reg_cql).then(function(result){
		res.json(REGISTERED);
	}).catch(function(err){if (err) {console.log(err); res.json(SOME_ERR); return;}})


};

/* EXPORTS  ############# */
module.exports 	= register;
