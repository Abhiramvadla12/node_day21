const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const conn = require("./database.js");

app.get("/",(req,res)=>{
    sql_table_truncate = `truncate table todo_list`;
    conn.query(sql_table_truncate,(err,info)=>{
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
 
let port = 3009;

app.listen(port,()=>{
    console.log(`your server has started at http://localhost:${port}`);
})