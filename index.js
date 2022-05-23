import express from "express";
import publicRoutes from './routes/public.routes.js';
import apiRoutes from "./routes/api.routes.js";

const app = express();


const PORT = 8080;

app.use(express.static('public'));

//public routes//
app.use('/', publicRoutes);
app.use('/', apiRoutes);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});