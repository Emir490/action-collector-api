import { Router } from "express";
import { deleteAction, index, postAction } from "../controllers/actions";
import multer from "multer";

const storage = multer.diskStorage({
    destination: 'public/videos',
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });

upload.single('file');

const router = Router();

router.get('/:action', index);
router.post('/', upload.single('file'), postAction);
router.patch('/:id', deleteAction);

export { router }