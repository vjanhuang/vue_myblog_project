const express = require("express");
const router = express.Router();
const fs = require("fs")
const {connection,genid} = require("../utils/DbUtils");

router.post("/rich_editor_upload",async (req,res)=>{
    if(!req.files){
        res.send({
            "error":1,
            "message":"失败信息"
        })
        return;
    }
    let files = req.files;
    let ret_files = [];

    for(let file of files){
        let file_ext = file.originalname.substring(file.originalname.lastIndexOf(".")+1)
        let file_name = genid.NextId()+"."+file_ext
        //修改名字加移动文件,cwd程序允许路径
        fs.renameSync(process.cwd()+"/public/upload/temp/"+file.filename,
                      process.cwd()+"/public/upload/"+file_name)
        ret_files.push("/upload/"+file_name);
    }
    res.send({
        "errno":0,
        "data":{
            "url":ret_files[0]
        }
    })
})

module.exports = router;