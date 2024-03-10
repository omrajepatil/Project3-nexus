import express from "express";
import mongoose from "mongoose";
import User from "./model/script.js";
import bodyParser from "body-parser"
import MongoClient from "mongodb";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";


const app=express();
const port=3000;
app.use(express.json());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// const currentDir = path.dirname(fileURLToPath(import.meta.url));

await mongoose.connect('mongodb://127.0.0.1:27017/book');

app.set('view engine', 'ejs');




app.get("/",async(req,res)=>{
     res.render("index.ejs");

    // try {
    //   const feedback = await User.find(comment);
    //   res.render('index.ejs', { feedback });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send('Internal Server Error');
    // }
  
});

app.get("/sign",(req,res)=>{
    res.render("login.ejs");
})

app.post("/sign",async (req,res)=>{
    try{
        const data = new  User(req.body);
        await data.save();
        res.redirect('/');
    }catch(error){
        console.error("Error storing user data:", error);
        res.status(500).send("Internal Server Error");
    }
})


app.post("/login", async (req, res) => {

const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      // User is registered, redirect to the main page
      res.redirect('/');
    } else {
      // User not found or incorrect credentials, handle accordingly
      // res.send('Invalid email or password');
      res.redirect("/sign");
      
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal Server Error");
  }
});




app.post("/Submit",async (req,res)=>{
    try{
        const data=new User(req.body);
        console.log(data);
        const save=await data.save();
      
        res.redirect("/");
        // alert("Data send Sucessfull");
        
    }catch(error){
        console.error("Error storing user data:", error);
        res.status(500).send("Internal Server Error");
    }
})

app.post("/contact-form",async (req,res)=>{
  try{
      // const data=new User(req.body);
      // console.log(data);
      // const save=await data.save();

      const data = new User(req.body);
      res.redirect('/');
      
  }catch(error){
      console.error("Error storing user data:", error);
      res.status(500).send("Internal Server Error");
  }
})

app.listen(port,()=>{
    console.log("server connected");
});