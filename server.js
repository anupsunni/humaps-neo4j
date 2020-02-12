/* MODULE INITIALISATIONS*/
var express 	=	require('express');
var app			= 	express();
var port		=	process.env.port || 7575;
var morgan		=	require('morgan');
var bodyParser	=	require('body-parser');
var path 		= 	require('path');
var router		= 	require('./Backend/Routes/routes');

/* MIDDLEWARE INITIALISATIONS */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended : true} ));
app.use(morgan('dev'));
app.use('/',express.static(__dirname+'/public'));
router(app);

/* NODEJS SERVERS ESTABLISH*/
app.listen(port,function(err){
	if (err) {
		console.log("Error: "+err);
	} else {
		console.log("Humaps Server Running on port: "+port);		
	}
});

app.get("*",function(req,res){
	res.send("Please Install The App");
});





