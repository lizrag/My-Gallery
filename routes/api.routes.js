import { Router } from "express";
import multer from "multer";
import fs from 'fs';
import { __dirname } from "../utils.js";

const apiRoutes = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/photos')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
})

apiRoutes.get('/photos', (req, res) => {
  const photosStored = fs.readFileSync('photos.txt').toString().split(',');
  const photos = photosStored.fill(image => image);
  return res.send(photos);
});

apiRoutes.post('/photos/upload', upload.array('photos', 6), function (req, res) {
  try {
    const photos = req.files;

    photos.forEach(photo => {
      const data = fs.readFileSync('photos.txt').toString().split(',');
      data.push(photo.filename)
      const newData = data.filter(imgPath => imgPath);
      fs.writeFileSync('photos.txt', newData.toString());
    });

    return res.redirect('/?sucess=true');

  } catch (error) {
    return res.redirect('/?sucess=false');
  }
});

apiRoutes.delete('/photos/delete/:filename', (req, res) => {
  let deletePhoto = req.params.filename;
  fs.unlink(`${__dirname}/public/photos/${deletePhoto}`, (error) => {
    if (error) {
      console.log(error);
      return res.send('photo was not deleted');
    }

    const photosStored = fs.readFileSync('photos.txt').toString().split(',');
    const photoIndex = photosStored.indexOf(deletePhoto);
    photosStored.splice(photoIndex, 1);
    
    return res.send('photo deleted');
  });
});

export default apiRoutes;