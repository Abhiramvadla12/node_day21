const express = require("express");
const app = express();
app.use(express.json())
const cors = require("cors");
app.use(cors());
const conn = require("./database.js");
//creating a table 
const initDB = () => {
    const sqlCreate = `CREATE TABLE IF NOT EXISTS todo_list (
        id INT AUTO_INCREMENT PRIMARY KEY,
        task varchar(299)
    )`;
    conn.query(sqlCreate, (err) => {
        if (err) console.error("Table creation error:", err.message);
        else console.log("Table ready");
    });
};

initDB();
app.post("/todo",(req,res)=>{
    console.log(req.body);
    console.log(req.body.todo)
    const sqlInsert = `INSERT INTO todo_list (task) VALUES (?)`;

        conn.query(sqlInsert, [req.body.todo], (err, info) => {
            if (err) {
                return res.status(400).send({ message: err.message });
            }
            res.send({
                status:200,
                message:"data entered successfully",
            data:{
                info
            }
        })
    });
})
 let port = 3005;

 app.listen(port,()=>{
    console.log(`server has started at http://localhost:${port}`);
 })