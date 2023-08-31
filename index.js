const express = require('express');
const app=express();
const port=8080;
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const methodOverride = require('method-override');
app.use(methodOverride("_method"));



app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));




let data=[
    {
        id: uuidv4(),
        username :"abhishek",
        tweet: "this is my first tweet"
    },
    {
        id: uuidv4(),
        username :"abhi",
        tweet: "this is my second tweet"
    }

]

app.get("/home",(req,res)=>{
    res.render("index.ejs",{data});
})
app.get("/home/newtweet",(req,res)=>{
    res.render("newtweet.ejs");
})
app.post("/home",(req,res)=>{
    let {username,tweet}=req.body;
    let id=uuidv4();
    data.push({id,username,tweet});
    console.log(username);
    res.redirect("/home");
})
app.get("/home/:id",(req,res)=>{
    let {id}=req.params;
    let post = data.find((p)=>id===p.id);
   res.render("profile.ejs",{post});
})
app.get("/home/:id/update",(req,res)=>{
    let {id}=req.params;
    let post = data.find((p)=>id===p.id);
   res.render("update.ejs",{post});
})
app.patch("/home/:id",(req,res)=>{
    let {id}=req.params;
    let newtweet=req.body.tweet;
    let post = data.find((p)=>id===p.id);
    post.tweet=newtweet;    
    console.log(post);
    res.redirect("/home");

})
app.delete("/home/:id",(req,res)=>{
    let {id}=req.params;
     data = data.filter((p)=>id!==p.id);
    res.redirect("/home");
})




app.listen(port,()=>{
    console.log("Server Live");
})