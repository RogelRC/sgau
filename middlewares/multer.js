import multer from 'multer';
import path from 'path';

// Configuración de multer para guardar archivos en la carpeta 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
        const username = req.user.username; // Asegúrate de tener el nombre de usuario en req.user
        const fileExtension = path.extname(file.originalname);
        const filename = `${timestamp}-${username}${fileExtension}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

export default upload;
