const express = require("express");
const router = express.Router();
const {connection,genid} = require('../utils/DbUtils');

router.post("/_token/add",async (req,res)=>{
    let {name} = req.body;
    const insert_sql = "INSERT INTO `category` (`id`,`name`) VALUES (?,?)";
    let {error,results} = await connection.async.query(insert_sql,[genid.NextId(),name])

    if(error){
        res.send({
            code:500,
            msg:"添加失败"
        })
    }else{
        res.send({
            code:200,
            msg:"添加成功"
        })
    }
})

router.put("/_token/update",async (req,res)=>{
    let {id,name} = req.body;
    const update_sql = "UPDATE `category` SET `name` = ? WHERE `id` = ?";
    let {error,results} = await connection.async.query(update_sql,[name, id])
    if(error){
        res.send({
            code:500,
            msg:"修改失败"
        })
    }else{
        res.send({
            code:200,
            msg:"修改成功"
        })
    }
})

router.delete("/_token/delete",async (req,res)=>{
    let id = req.query.id;
    const delete_sql = "DELETE FROM `category` WHERE `id` = ?";
    let {error,results} = await connection.async.query(delete_sql,[id])

    if(error){
        res.send({
            code:500,
            msg:"删除失败"
        })
    }else{
        res.send({
            code:200,
            msg:"修改成功"
        })
    }
})

router.get("/list",async (req,res)=>{
    let id = req.query.id;
    const select_sql = "SELECT * FROM `category`";
    let {error,results} = await connection.async.query(select_sql,[])

    if(error){
        res.send({
            code:500,
            msg:"获取失败"
        })
    }else{
        res.send({
            code:200,
            msg:"获取成功",
            data:results
        })
    }
})

module.exports = router;