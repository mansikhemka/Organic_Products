/**
 * Created by mansikhemka on 10/10/16.
 */


const express = require('express');
const router= express.Router();

const mysql = require('mysql');


var getConnection = () => {
    var connection = mysql.createConnection({
        host     : 'localhost',
        user : 'finley',
        password : 'some_pass',
        database : 'newdatabase'
    });
    connection.connect();
    return connection;
}



const products=[];

let queryS = 'Select * FROM shop';
var connection = getConnection();
connection.query(queryS, (err,results)=>{
    if(err) throw err;
    for(var i=0;i< results.length; i++){
        console.log("sno: "+results[i].sno+","+" price:"+results[i].price );
        products.push({sno: results[i].sno, price:results[i].price })
    }

})

router.get('/',(req, res)=>{
    res.render('page1',{products: products});
})

module.exports = router;
connection.end();

