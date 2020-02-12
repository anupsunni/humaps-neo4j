/*SETTER METHODS*/
var register		= require('../DatabaseHandlers/Setters/register');
var validate		= require('../DatabaseHandlers/Setters/validate');

/*GETTER METHODS*/
var check 			= require('../DatabaseHandlers/Getters/check');
var path 			= require('../DatabaseHandlers/Getters/path');
var search			= require('../DatabaseHandlers/Getters/search');
var alter			= require('../DatabaseHandlers/Getters/alter');

/*ROUTER OBJECT*/
var router = function(routes){
		
	/* FOR USER REGISTRATION*/
	routes.post('/register',function(req,res)	{ register(req.body,res); 		});

	/* FOR USER VALIDATION*/
	routes.post('/validate',function(req,res)	{ validate(req.body,res); 		});

	/*GETS SHORTEST PATH*/
	routes.post('/path',function(req,res)		{ path(req.body,res); 			});

	/*SEARCHES USERS*/
	routes.post('/search',function(req,res)		{ search(req.body,res); 		});

	/*SEARCHES ALTERNATE USERS*/
	routes.post('/alter',function(req,res)		{ alter(req.body,res); 			});

}


/*EXPORT #############*/
module.exports = router;