import express from "express"
import  jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {CreateUserSchema} from "@repo/common/types"
import { Prismaclient } from "@repo/db/client"; 
const app=express();


app.post('signin',function(req,res){
    const username=req.body.data;
    const passowrd=req.body.data;

    const userId=1;
   const token= jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        token
    })
})  



app.post('signup', async function(req,res){
    
    const parsedData=CreateUserSchema.safeParse(req.body);
    console.log(parsedData)
    if(!parsedData.success){
        return res.json({
            message:"Incorrect inputs"
        })
    }
      try {
        await Prismaclient.user.create({
        data:{
            name:parsedData.data.name,
            email:parsedData.data.email,
            password:parsedData.data.password
        }
       })
       res.json({
        message:"User stored"
       })
      } catch (error) {
        res.status(411).json({
            message:"User already exists with the email"
        })
      }

    res.json({
        message:"signup room"
    })
})

app.post("/room", middleware,function(req,res){
    res.json({
        message:"room123"
    })
})


app.listen(3001)