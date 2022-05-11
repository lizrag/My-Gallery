import { Router } from "express";
import multer from "multer";


const upload= multer();
const apiRoutes = Router();

apiRoutes.post('/photos/upload', upload.array('photos', 6), function (req, res) {

})

apiRoutes.delete('/delete', ()=>{

});

export default apiRoutes;