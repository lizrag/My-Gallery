import { Router } from "express";

const publicRoutes = Router();

publicRoutes.get('/', (req,res)=>{
    return res.sendFile('index.html');
})

export default publicRoutes;

