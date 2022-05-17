import { Router } from "express";
import multer from "multer";
import fs from 'fs'; 
import { __dirname } from "../utils.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/photos')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now()+ file.originalname)
    },
  });
  
const upload = multer({ storage: storage })
const apiRoutes = Router();

apiRoutes.post('/photos/upload', upload.array('photos', 6), function (req, res) {
  
  try{
    //validación
    return res.redirect('/?sucess=true');
  }catch (error){
    console.log(error);
    return res.redirect('/?sucess=false');
  }
});

apiRoutes.delete('photos/delete/:filename', (req,res)=>{
  let deletePhoto = req.params.filename;
  fs.unlink(`${__dirname}/public/photos/${deletePhoto}`, (error)=>{
    if(error){
      console.log(error);
      return res.send('photo was not deleted');
    }
    return res.send('photo deleted');
  });
});

export default apiRoutes;