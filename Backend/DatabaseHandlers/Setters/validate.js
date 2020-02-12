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
var neo4j     	= require('neo4j-driver').v1;
var url       	= require('../url');
const PNF 	  	= require('google-libphonenumber').PhoneNumberFormat;
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

/*AUTHENTICATION*/
var driver        =   neo4j.driver(url.bolt_url, neo4j.auth.basic(url.unm, url.pwd));

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

	// Parse number with country code and keep raw input.
const number = phoneUtil.parseAndKeepRawInput(phn);

console.log('Number: '+phn);
 
// Print the phone's country code.
console.log('CountryCode:  '+number.getCountryCode());
// => 1
 
// Result from isPossibleNumber().
console.log('PossibleNumber:  '+phoneUtil.isPossibleNumber(number));
// => true
 
// Result from isValidNumber().
console.log('isValidNumber:  '+phoneUtil.isValidNumber(number));
// => true
 
// Result from getRegionCodeForNumber().
console.log('getRegionCodeForNumber:  '+phoneUtil.getRegionCodeForNumber(number));
// => US
 
// Format number in the E164 format.
console.log('E164:  '+phoneUtil.format(number, PNF.E164));
// => +12024561414
 
	res.json(number);

};

/* EXPORTS  ############# */
module.exports 	= register;
