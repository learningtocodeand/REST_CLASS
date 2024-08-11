const express=require("express");
const app = express();
const port=8080;
const path=require("path");
const {v4 : uuidv4}=require('uuid');


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

app.set("view engine","ejs");
app.set("views" , path.join(__dirname,"views"));

let posts=[
    {
        id:uuidv4(),
        username: "monica",
        content : "The only way to do great work is to love what you do."
    },
    {
        id:uuidv4(),
        username: "nisha",
        content : "Success is not final, failure is not fatal: It is the courage to continue that counts."
    },
    {
        id:uuidv4(),
        username: "lara",
        content : "In the end, we only regret the chances we didn’t take."
    }
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    //console.log(req.body);
    let {username,content} = req.body;
    let newid=uuidv4();
    posts.push({newid,username , content});
    //res.send("working.....");
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    //console.log(id);
    let post=posts.find((p) => id ===p.id);
    //console.log(post);
    res.render("show.ejs",{post});
});


app.listen(port,()=>{
    console.log("listenening to port : 8080");
});

