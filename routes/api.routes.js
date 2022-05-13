import { Router } from "express";
import multer from "multer";
import fs from 'fs'; 

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
    console.log(req.files);
    return;
})
/*
apiRoutes.delete('/delete:filename', ()=>{
  let deletePhoto = req.params.filename;
  fs.unlink(deletePhoto);
  return res.send('Photo deleted');
});
*/


export default apiRoutes;