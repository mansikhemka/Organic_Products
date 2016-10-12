/**
 * Created by mansikhemka on 09/10/16.
 */

const mysql = require('mysql');

var getConnection = ()=>
{
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'finley',
        password: 'some_pass',
        database: 'newdatabase'
    })
    connection.connect();
    return connection;
}

module.exports = {
    fetchprice: (dish, cb)=> {

        var connection = getConnection();
        let queryS = 'select price from shop where sno="'+dish+'"';

        connection.query(queryS, (err, result, fields)=>{
            if(err) throw err;
            //
            cb(result);
            console.log(result[0]);
        })
        connection.end();
    },


    saver: (item, cost, cb)=>{
        var connection = getConnection();
        let querySt='INSERT INTO shop VALUES ("'+item+'", '+cost+' )';
        connection.query(querySt, (err, result, fields)=>{
            if(err) throw err;

            cb(result);
        })
        connection.end();
    },

    showing: (cb)=>{
        var connection = getConnection();
        let queryS = 'select * from shop;';

        connection.query(queryS, (err, result, fields)=>{
            if(err) throw err;
            //
            cb(result);
            console.log(result[0]);
        })
        connection.end();
    }

}




