//! 用户模块
const express = require('express');
//!引入数据库连接池
const pool = require('../pool');
//!  1.创建路由器
const router = express.Router();
//!  2.响应
//! 查询用户
router.get('/',(req,res,next)=>{
    //console.log(obj);
    pool.query('select *from cook_books',(err,result)=>{
        if(err){
            //!处理错误(交给下一个中间件)
            next(err);
            return;
        }
        if(result.length==0){
            res.send({code:200,msg:'用户不存在'});
        }else{
            res.send({code:200,msg:'查询成功',data:result});
        }
    });
});
//! 3.导出路由器
module.exports = router;




