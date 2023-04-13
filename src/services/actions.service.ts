import multer from "multer";
import { uploadVideo } from "../config/cloudinary";
import { Action } from "../interfaces/action.interface"
import ActionModel from "../models/Action";
import fs from 'fs';
import path from "path"

const getActions = async (action: string) => {
    try {
        const Actions = await ActionModel.find({ action, isArchived: false }).select('-keypoints -isArchived');
        
        return Actions;
    } catch (error) {
        console.log(error);
    }
}

const getArchivedActions = async () => {
    try {
        const actions = await ActionModel.find({ isArchived: true });

        return actions;
    } catch (error) {
        console.log(error);
    }
}

const addAction = async (sign: Action, file: Express.Multer.File) => {
    try {
        const actionCount = await ActionModel.countDocuments({ action: sign.action, isArchived: false });

        if (actionCount >= 30) return { status: 429, content: "Límite alcanzado" }

        if (sign.action == "undefined" || sign.category == "undefined") return { status: 400, content: "Acción inválida" }

        const length = actionCount + 1;

        sign.sequence = `${sign.action}-${length}`;

        const video = await uploadVideo(file, sign.sequence);
    
        if (video) {
            sign.video = video;

            fs.unlink(file.path, (error) => {
                if (error) {
                    console.error(`Error deleting file: ${file.path}`);
                }
            });
        } else {
            const oldFilePath = path.join(__dirname, '..', '..', 'public', 'videos', file.filename);
            const newFilePath = path.join(__dirname, '..', '..', 'public', 'videos', sign.sequence);

            // Rename the file
            fs.renameSync(oldFilePath, `${newFilePath}.webm`);

            const video = `${process.env.BASE_URL}/videos/${sign.sequence}.webm`;

            sign.video = video;
        }

        const action = await ActionModel.create(sign);

        const responseAction = action.toObject();

        delete responseAction.keypoints;
        delete responseAction.isArchived;

        return { status: 200, content: responseAction };
    } catch (error) {
        console.log(error);
        return { status: 500, content: "Internal Server Error" }
    }
}

const removeAction = async (id: string) => {
    try {
        await ActionModel.updateOne({ _id: id }, { $set: { isArchived: true } });

        return {
            msg: "Acción eliminada"
        }
    } catch (error) {
        console.log(error);
    }
}

export { getActions, getArchivedActions, addAction, removeAction }