let btn = document.getElementById("btn");
let demo = document.getElementById("demo");
window.alert("please run express server for the files index.js,tableempty.js,fetch_api.js,delete_api.js,edit_api.js")
//emptying the table on dom content loaded
window.addEventListener("DOMContentLoaded",async()=>{
  let response = await fetch("http://localhost:3009")
  let table_empty_response = await response.json();
  console.log(table_empty_response);
})
// Event listener for submitting todo list data
btn.addEventListener("click", async () => {
    let todo_value = document.getElementById("todo_value").value.trim();
    //checking if there is any value entered or not 
    if (!todo_value) {
        alert("Please enter a task.");
        return;
    }
    //sending data to backend i.e is index.js
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo: todo_value })
    };

    try {
        const response = await fetch("http://localhost:3005/todo", requestOptions);
        const result = await response.json();
        // console.log(result);
        alert("Task added successfully!");
        document.getElementById("todo_value").value = "";
        //calling the get_data function so that the store data in database can be displayed
        await get_data();
    } catch (error) {
        console.error("Error submitting task:", error);
    }
});

// Fetch and display todo list data
async function get_data() {
    try {
        //calling api to data from database
        const response = await fetch("http://localhost:3006/get_data");
        const api_data = await response.json();
        // console.log(api_data.data["info"]);

        demo.innerHTML = ""; // Clear previous content
        
        api_data.data["info"].forEach(element => {
            const card = document.createElement("div");
            card.id = "card"
            const todo_task = document.createElement("h3");
            const delete_todo = document.createElement("button");
            delete_todo.className = "delete_todo";
            const edit = document.createElement("button");
            edit.className = "edit"
            delete_todo.textContent = "Delete";
            edit.textContent = "Edit";
            todo_task.innerHTML = `Task to do is: ${element.task}`;

            card.append(todo_task, delete_todo, edit);
            demo.append(card);
            //delete data in database also in forntend on clicking delete button
            delete_todo.addEventListener("click",async()=>{
                //sending data to delete_api.js
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id:element.id})
                };
            
                try {
                    const response = await fetch("http://localhost:3007", requestOptions);
                    const result = await response.json();
                    // console.log(result);
                    alert("Task deleted successfully!");
                    card.innerHTML = '';
                } catch (error) {
                    console.error("Error submitting task:", error);
                }
            })
            //editing the todo list value on clicking the edit button
            edit.addEventListener("click",async()=>{
                //sending data to delete_api.js
                update_value = prompt("Edit task description: ");
                const requestOptions = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id:element.id,
                        task_update_value:update_value
                    })
                };
            
                try {
                    const response = await fetch("http://localhost:3001", requestOptions);
                    const result = await response.json();
                    // console.log(result);
                    alert("Task updated successfully!");
                    todo_task.innerHTML=`Task to do is: ${update_value}`
                } catch (error) {
                    console.error("Error submitting task:", error);
                }
            })
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
} 
