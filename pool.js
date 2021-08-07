//!数据库模块
const mysql = require('mysql');
//!创建数据库连接池
const pool = mysql.createPool({
    // host:'127.0.0.1',
    // port:3306,
    // user:'root',
    // password:'root',
    // database:'cook',

    // host:'r.rdc.sae.sina.com.cn',
    // port:3306,
    // user:'n1y0mjow34n1y0mjow34',
    // password:'x10yyzy04ylmzyj14hwkhi5l2yh20y2mh2zx52wh',
    // database:'app_cookserver',

    host:'209.222.21.54',
    port:3306,
    user:'cook',
    password:'ZFtGp3aJAX6JPKfj',
    database:'cook',

    connectionLimit:15  //默认最大连接15
});
//!导出模块s
module.exports=pool;