const mysql = require("mysql");
const GenId = require('../utils/SnowFlake');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'joker123',
    database : 'blog_sqlite'
});
connection.async = {};
connection.async.query = (sql, params) => {
    return new Promise((resolve,reject)=>{
        connection.query(sql,params,(error,results,fields)=>{
            resolve({error,results})
        })
    })
};

const genid = new GenId({WorkerId:1});

module.exports = {connection,genid};
