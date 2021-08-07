//! 用户模块
const express = require('express');
//!引入数据库连接池
const pool = require('../pool');
//!  1.创建路由器
const router = express.Router();
//!  2.响应
//! 用户注册
router.post('/reg',(req,res,next)=>{
    //!得到数据对象body
    let obj = req.body;
    //!执行sql语句
    pool.query('insert into cook_users set ?',[obj],(err,result)=>{
        if(err) {
            //!处理错误
            next(err);
            return;
        }
        res.send({code:200,msg:'注册成功'});
        console.log(obj);
    });
});
//! 用户登录
router.post('/log',(req,res,next)=>{
    //!得到数据对象body
    let obj = req.body;
    if(!obj.uname){
        res.send({code:401,msg:'用户名不能为空！'});
        return;
    }else if(!obj.upwd){
        res.send({code:402,msg:'密码不能为空！'});
        return;
    }
    pool.query('select *from cook_users where uname=? and upwd=?',[obj.uname,obj.upwd],(err,result)=>{
        //console.log(result);
        if(err) {
            //!处理错误(交给下一个中间件)
            next(err);
            return;
        }
        //查询不到则result 为空数组  长度为0
        if(result.length!=0){
            res.send({code:200,msg:'登陆成功'});
            console.log(result);
        }else{
            res.send({code:401,msg:'用户名或密码错误'});
        }
    });
    
});
//! 修改用户信息
router.put('/',(req,res,next)=>{
    //!得到数据对象body
    let obj = req.body;
    //传递uid、email、phone、user_name、gender
    // if(!obj.uid){
    //     res.send({code:401,msg:'id不能为空！'});
    //     return;
    // }else if(!obj.email){
    //     res.send({code:402,msg:'邮箱不能为空！'});
    //     return;
    // }else if(!obj.phone){
    //     res.send({code:403,msg:'手机号不能为空！'});
    //     return;
    // }else if(!obj.user_name){
    //     res.send({code:404,msg:'用户名不能为空！'});
    //     return;
    // }else if(!obj.gender){
    //     res.send({code:405,msg:'性别不能为空！'});
    //     return;
    // }
    let i = 400;
    //!优化 循环遍历
    for(let k in obj){
        i++;
        if(!obj[k]){
            console.log(obj[k]);
            res.send({code:i,msg:k+'不能为空！'});
            return;
        }
    }
    pool.query('update xz_user set ? where uid=?',[obj,obj.uid],(err,result)=>{
        if(err) {
            //!处理错误(交给下一个中间件)
            next(err);
            return;
        }
        res.send({code:200,msg:'修改成功'});
        console.log(obj);
    });
});
//! 删除用户
router.delete('/:uid',(req,res,next)=>{
    //!得到数据
    let obj = req.params;
    if(!obj.uid){
        res.send({code:401,msg:'uid不能为空'})
        return;
    }
    pool.query('delete from xz_user where uid=?',[obj.uid],(err,result)=>{
        if(err) {
            //!处理错误(交给下一个中间件)
            next(err);
            return;
        }
        if(result.affectedRows==0){
            res.send({code:402,msg:'删除失败，用户不存在！'});
        }else{
            res.send({code:200,msg:'删除成功'});
        }
    });

});
//! 查询用户
router.get('/:uid',(req,res,next)=>{
    let obj = req.params;
    //console.log(obj);
    pool.query('select *from xz_user where uid=?',[obj.uid],(err,result)=>{
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
//! 分页显示
router.get('/',(req,res,next)=>{
    let obj = req.query;
    console.log(obj);
    if(!obj.pno) obj.pno = 1;
    if(!obj.count) obj.count = 5;
    let start = (obj.pno-1)*obj.count;
    let size = parseInt(obj.count);
    pool.query('select uid,uname,email,phone from xz_user limit ?,?',[start,size],(err,result)=>{
        if(err){
          next(err);
          return;
        }
        console.log(result);
        //查询的结果是数组，把数组响应给浏览器端
        res.send({code: 200,msg: '查找成功',data: result});
    });

});
//! 3.导出路由器
module.exports = router;




