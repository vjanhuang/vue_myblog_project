const express = require("express");
const router = express.Router();
const {connection,genid} = require("../utils/DbUtils");

router.get("/detail",async (req,res)=>{
    let {id} = req.query
    let detail_sql = "SELECT * FROM `blog` WHERE `id` = ?"

    let {error,results} = await connection.async.query(detail_sql,[id])

    if(error){
        res.send({
            code:500,
            msg:"查询失败"
        })
    }else{
        res.send({
            code:200,
            msg:"查询成功",
            results
        })
    }
})

router.get("/search", async (req,res)=>{
    /**
     * keyword 关键字
     * categoryId 分类编号
     * 分页 page 页码 pageSize 分页大小
     */
    let {keyword, categoryId, page, pageSize} = req.query;
    page = page == null ? 1:page;
    pageSize = pageSize == null ? 10:Number(pageSize);
    categoryId = categoryId == null ?0:categoryId;
    keyword = keyword == null ? "" : keyword;

    console.log(keyword)

    let params = []
    let whereSqls = []
    if (categoryId != 0){
        whereSqls.push("`category_id` = ?")
        params.push(categoryId)
    }
    if(keyword != ""){
        whereSqls.push(" (`title` LIKE ? OR `content` LIKE ?)")
        params.push("%"+keyword+"%")
        params.push("%"+keyword+"%")
    }
    let whereSqlStr = ""
    if(whereSqls.length > 0){
        whereSqlStr = "WHERE" + whereSqls.join("AND")
    }
    //查分页数据
    let searchSql = " SELECT `id`,`category_id`,`create_time`,`title`,substring(`content`,1,100) AS `content` FROM `blog` " + whereSqlStr + " ORDER BY `create_time` DESC LIMIT ?,? "
    let searchSqlParams = params.concat([(page-1)*pageSize,pageSize])
    //查询数据总数
    let searchCountSql = "SELECT count(*) AS count FROM `blog`" + whereSqlStr
    let searchCountParams = params
    //分页数据
    let searchResult = await connection.async.query(searchSql,searchSqlParams)
    let countResult = await connection.async.query(searchCountSql,searchCountParams)

    if(searchResult.error == null && countResult.error == null){
        res.send({
            code:200,
            msg:"查询成功",
            data:{
                keyword,
                categoryId,
                page,
                pageSize,
                rows:searchResult.results,
                count:countResult.results[0].count
            }
        })
    }else{
        res.send({
            code:500,
            msg:"查询失败"
        })
    }
})

router.post("/_token/add",async (req,res)=>{
    let {title, categoryId, content} = req.body;
    let id = genid.NextId();
    let create_time = new Date().getTime();

    const insert_sql = "INSERT INTO `blog` (`id`,`title`,`category_id`,`content`,`create_time`) VALUES (?,?,?,?,?)"
    let params = [id,title,categoryId,content,create_time]
    let {error,results} = await connection.async.query(insert_sql,params)

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
    let {id, title, categoryId, content} = req.body;
    let create_time = new Date().getTime();

    const update_sql = "UPDATE `blog` SET `title` = ?, `content` = ?, `category_id` = ? WHERE `id` = ?"
    let params = [title,content,categoryId,id]
    let {error,results} = await connection.async.query(update_sql,params)

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

    const delete_sql = "DELETE FROM `blog` WHERE `id` = ?";
    let {error,results} = await connection.async.query(delete_sql,[id]);

    if(error){
        res.send({
            code:500,
            msg:"删除失败"
        })
    }else{
        res.send({
            code:200,
            msg:"删除成功"
        })
    }
})

module.exports = router