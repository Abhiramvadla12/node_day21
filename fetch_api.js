const express = require("express");
const app = express();
const conn = require("./database.js");
const cors = require("cors");
app.use(cors());
app.get("/get_data",(req,res)=>{
    // res.send("api working");
    sql_data_retrive = `select * from todo_list`;
    conn.query(sql_data_retrive,(err,info)=>{
        if (err) {
            return res.status(400).send({ message: err.message });
        }
        res.send({
            status:200,
            message:"data entered successfully",
        data:{
            info
        }
    });
    })
})
 
let port = 3006;

app.listen(port,()=>{
    console.log(`your server has started at http://localhost:${port}`);
})