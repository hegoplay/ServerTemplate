import express from 'express'
import cors from 'cors'

import { checkUser,createUser,deleteUser,getUser, udpateUser} from './database.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get("/users", async(req,res) =>{
    const {username, password} = req.query      ;
    const check = await checkUser(username,password);
    res.send(check);
})

app.get("/users/:username", async(req,res) =>{
    const username = req.params.username;
    const check = await getUser(username);
    res.send(check);
});

app.put("/users/:username", async(req,res) =>{
    const username = req.params.username;
    const {password} = req.body;
    const check = await udpateUser(username,password);
    res.send(check);
});

app.delete("/users/:username", async(req,res) =>{
    const username = req.params.username;
    const check = await deleteUser(username);
    res.send(check);
});

app.post("/users", async(req,res) =>{
    const {username, password,imgUri} = req.body;
    const check = await createUser(username,password,imgUri);
    res.send(check);
})

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500),send('Loi dau do!')
})

app.listen(8880, ()=>{
    console.log("Server is running on port 8880")
})