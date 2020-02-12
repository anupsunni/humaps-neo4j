/*MODULES*/
var auth = require('../../auth_db');

/*PARAMETERS*/
var HOST 		= auth.HOST;
var HTTP_PORT 	= auth.HTTP_PORT;
var HTTPS_PORT 	= auth.HTTPS_PORT;
var BOLT_PORT 	= auth.BOLT_PORT;

/*USERNAME PASSWORD*/
var USNM 		= auth.UNM;
var PASS 		= auth.PWD;

/*URL*/
var http_url 	= 'http://'+USNM+':'+PASS+'@'+HOST+':'+HTTP_PORT+'';
var https_url 	= 'https://'+USNM+':'+PASS+'@'+HOST+':'+HTTPS_PORT+'';
var bolt_url 	= 'bolt://'+HOST+':'+BOLT_PORT;

/*EXPORTS ################*/
module.exports.unm 			= USNM;
module.exports.pwd 			= PASS;
module.exports.http_url 	= http_url;
module.exports.https_url 	= https_url;
module.exports.bolt_url 	= bolt_url;
