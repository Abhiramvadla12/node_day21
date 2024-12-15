
const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const conn = require("./database.js");

app.post("/",(req,res)=>{
    console.log(req.body.id);
    console.log(req.body);
    let {id} = req.body;
    sql_record_delete = `delete from  todo_list where id= ?`;
    conn.query(sql_record_delete,[id],(err,info)=>{
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        res.send({
            status:200,
            message:"table emptyed",
        data:{
            info
        }
    });
    })
})
 
let port = 3007;

app.listen(port,()=>{
    console.log(`your server has started at http://localhost:${port}`);
})