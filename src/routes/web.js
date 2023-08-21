const express = require('express')
const homeController = require('../controllers/homeControlle')
const usercontroller = require('../controllers/usercontroller')
const multer = require('multer')
const path = require('path')
const appRoot  = require('app-root-path')

const route = express.Router()



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,appRoot +  '/src/public/image')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '-' + Math.round(Math.random() * 1E9))
    }
  })
  const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

  let upload = multer({ storage: storage, fileFilter: imageFilter })
  // let multipleupload = multer({ storage: storage, fileFilter:imageFilter })
let initRout = (app) =>{
    route.get('/', homeController.HomePage)
    route.get('/crud', homeController.getCrud)
    route.post('/post-crud', homeController.PostCrud)
    route.get('/get-crud', homeController.displayCrud)
    route.get('/Edit-user/:id', homeController.getEdit)
    route.post('/put-crud', homeController.PutCrud)
    route.post('/delete-user/:id', homeController.getDeleteUser);
    route.get('/upload', homeController.getUpload)
    route.post('/upload-profile-pic',upload.single('profile_pic'), homeController.UploadFile)
    route.get('/pagination', homeController.getPagination)
    // route.post('/upload-multiple-images',multipleupload.array('multiple_images', 10), homeController.MultipleFile)


    route.get('/api/pagination', usercontroller.getUserData)

    route.post('/api/login', usercontroller.getlogin)

    return app.use('/', route)
}

module.exports = initRout