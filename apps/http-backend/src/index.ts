import express from "express"
import  jwt  from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";

import {CreateUserSchema} from "@repo/common/types"
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



app.post('signup',function(req,res){
    
    const data=CreateUserSchema.safeParse(req.body);
    if(!data.success){
        return res.json({
            message:"Incorrect inputs"
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