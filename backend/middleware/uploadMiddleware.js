// middleware/multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'rentEasy',
    allowed_formats: ['jpg', 'png', 'jpeg','webp','bmp', 'svg', 'tiff'],
    resource_type: 'image', // optional but clear
    transformation: [{ width: 800, height: 600, crop: 'limit' }],
    public_id: `${Date.now()}-${file.originalname.split('.')[0]}`, // unique public ID
  }),
});

const upload = multer({ storage });

module.exports = upload;
