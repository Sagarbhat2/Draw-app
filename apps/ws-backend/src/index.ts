import {WebSocketServer} from "ws"
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";

const wss=new WebSocketServer({port:8080});
wss.on('message',function connection(ws,request){   // rewuest will help us to get the url details on which url connection is establishing

    const url=request.url;   // ws://localhost5656?token09898
    if(!url){
        return;
    }

    const queryParams=new URLSearchParams(url.split('?')[1]);  // [ws://localhost5656,"token32r3r32"]
    const token=queryParams.get('token') || "";
    const decode=jwt.verify(token,JWT_SECRET)


    if(!decode || !(decode as JwtPayload).userId){
        ws.close();
        return;
    }


    ws.on('message',function message(){
        ws.send('pong')
    });
});


