import multer from 'multer'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import cloudinary from '../config/cloudinaryConfig.js'


const storage= new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
       folder:'tankImages',
       allowed_formats: ["jpg", "jpeg", "png", "webp"],
    }
});

const upload= multer({storage:storage});

export default upload;