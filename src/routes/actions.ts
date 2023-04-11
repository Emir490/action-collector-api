import { Router } from "express";
import { deleteAction, index, postAction } from "../controllers/actions";
import multer from "multer";

const router = Router();
const upload = multer()

router.get('/:action', index);
router.post('/', upload.single('file'), postAction);
router.patch('/:id', deleteAction);

export { router }