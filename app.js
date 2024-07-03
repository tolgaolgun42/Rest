import express from 'express';
import dotenv from 'dotenv';
import authRoute from './routes/route'
import sequelize from './config/database';

dotenv.config();

const app=express();
const port=process.env.PORT;

//ejs template engine
app.set("view engine","ejs");
//static files middleware
app.use(express.static("public"));
app.use(express.json());

app.get("/",(req,res)=>{res.render("index")});
app.get("/login",(req,res)=>{res.render("login")});
app.get("/register",(req,res)=>{res.render("register")});
app.get("/resetPassword",(req,res)=>{res.render("resetPassword")});

app.use("/api/auth",authRoute);

sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Application running on port: ${port}`);
    });
});