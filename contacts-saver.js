/*MODULES*/
var neo4j     =   require('neo4j-driver').v1;
var url       =   require('./Backend/DatabaseHandlers/url');
var request   =   require('request');

/*AUTHENTICATION*/
var neoDriver        =   neo4j.driver(url.bolt_url, neo4j.auth.basic("neo4j", url.pwd));

/*JSON*/
var SOME_ERR			=	{ success: false, 	message: 'Error In Server '			  };
var REGISTERED			=	{ success:  true, 	message: 'You Are Now Registered'	  };
var INVAL_INFO 			= 	{ success: false,	message: 'Invalid Information Posted' };

var saveToNeo4j = function (UNM, PHN, CON, cb) {
    let t0 = new Date().getTime();
    console.log("Saving User... ", PHN, UNM, CON.length);

    let db = neoDriver.session();
    if (!(UNM&&PHN&&CON)) {cb(INVAL_INFO); return;}

    let phn = PHN.split("'").join("");
    let con = CON;
    let unm = UNM.split("'").join("");

    /*VALIDATE ALL THE NUMBERS HERE*/
    let reg_cql = " merge (u:Person{PHN:'"+phn+"' }) SET u.UNM='"+unm+"'";

    /* !!!!!! USE PROMISES IN THE FUTURE FOR PERFORMANCE */
    /* for (let i = 0; i < con.length; i++) {
        con[i].UNM = con[i].UNM.split("'").join("");
        con[i].PHN = con[i].PHN.split("'").join("");
        reg_cql += "merge (k"+i+":Person{PHN:'"+con[i].PHN+"'}) SET k"+i+".UNM='"+con[i].UNM+"'  merge (u)<-[:Knows]->(k"+i+") "
    }

    db.run(reg_cql).then(function(result){
        let t1 = new Date().getTime();
        if (cb) cb("Saved: "+PHN+" "+UNM+" Total:"+CON.length+" || Duration: "+ (t1 - t0) + " ms "+" || ms/node: "+Math.round((t1 - t0)/(CON.length))+" ms");
    }).catch(function(err){if (err) {console.log(err); if (cb) cb();}})*/

    var count = 0;
    con.forEach(function (data) {
        data.UNM = data.UNM.split("'").join("");
        data.PHN = data.PHN.split("'").join("");
        reg_cql =  "merge (u:Person{PHN:'"+phn+"' }) SET u.UNM='"+unm+"'"+"merge (k:Person{PHN:'"+data.PHN+"'}) SET k.UNM='"+data.UNM+"'  merge (u)<-[:Knows]->(k) ";
        db.run(reg_cql).then(function(result){
            let t1 = new Date().getTime();
            if (++count==CON.length) if (cb) db.close(function () {
                cb("Saved: "+PHN+" "+UNM+" Total:"+CON.length+" || Duration: "+ (t1 - t0) + " ms "+" || ms/node: "+Math.round((t1 - t0)/(CON.length))+" ms");
            });
            // if (count%25==0) console.log("Saved: "+count);
        }).catch(function(err){if (err) {console.log(err); if (cb) cb();}})
    })
};

var contactFetcher = function () {
    const formData = {  "sql":"select PHN, STUDENT_NME AS UNM, COUNT(*) AS CONTACT_COUNT FROM ucb, STUDENT_TB WHERE CHAR_LENGTH(STUDENT_PHN) > 9 AND ID>15 AND PHN LIKE CONCAT('%',STUDENT_PHN,'%') GROUP BY PHN ORDER BY CONTACT_COUNT" };

    request.post(
        {
            url: 'https://9trghn2hhh.execute-api.ap-south-1.amazonaws.com/stage_testing/clavimatemainexecuter',
            form: JSON.stringify(formData)
        },
        function (err, httpResponse, body) {
            // console.log(JSON.parse(body));
            var userList = JSON.parse(body);
            var ctr = 0;
            userList.forEach(function (data) {
                // if (++ctr>1) return;
                let formData = {  "sql":"SELECT CPH as PHN, UNM FROM ucb WHERE PHN='"+data.PHN+"'" };
                request.post({
                        url: 'https://9trghn2hhh.execute-api.ap-south-1.amazonaws.com/stage_testing/clavimatemainexecuter',
                        form: JSON.stringify(formData)
                    },
                    function (err, httpResponse, body) {
                        saveToNeo4j(data.UNM, data.PHN, JSON.parse(body), function (result) {
                            console.log(result);
                        })
                    }
                );
            });
        }
    );
};

contactFetcher();