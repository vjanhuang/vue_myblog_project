const express = require("express");
const router = express.Router();
const {connection,genid} = require('../utils/DbUtils');
const {v4:uuidv4} = require("uuid");

router.post("/login", async (req,res)=>{
    let {account,password} = req.body;
    let {error,results} = await connection.async.query("SELECT * FROM `admin` WHERE `account`=? AND `password`=?",[account,password]);
    if(!results.length){
        res.send({
            code:500,
            msg:"登录失败"
        })
    }else{
        let login_token = uuidv4();
        let update_token_sql = "UPDATE `admin` SET `token`=? where `id`=?";
        await connection.async.query(update_token_sql,[login_token,results[0].id]);
        let admin_info = results[0];
        admin_info.token = login_token;
        admin_info.password = "";
        res.send({
            code:200,
            msg:"登录成功",
            data:admin_info
        })
    }
})

module.exports = router;