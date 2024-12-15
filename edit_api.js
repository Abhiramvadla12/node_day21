
const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const conn = require("./database.js");

app.post("/",(req,res)=>{
    console.log(req.body);
    let {id,task_update_value} = req.body;
    sql_record_update = `update todo_list set task= ? where id= ?`;
    conn.query(sql_record_update,[task_update_value,id],(err,info)=>{
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        res.send({
            status:200,
            message:"table updated",
        data:{
            info
        }
    });
    })
})
 
let port = 3001;

app.listen(port,()=>{
    console.log(`your server has started at http://localhost:${port}`);
})