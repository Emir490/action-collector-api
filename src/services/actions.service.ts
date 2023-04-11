import { uploadVideo } from "../config/cloudinary";
import { Action } from "../interfaces/action.interface"
import ActionModel from "../models/Action";

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

const addAction = async (sign: Action, file: Buffer) => {
    try {
        const actionCount = await ActionModel.countDocuments({ action: sign.action, isArchived: false });

        if (actionCount >= 30) return { status: 429, content: "Límite alcanzado" }

        if (sign.action == "undefined" || sign.category == "undefined") return { status: 400, content: "Acción inválida" }

        const length = actionCount + 1;

        sign.sequence = `${sign.action}-${length}`

        const videoUrl = await uploadVideo(file, sign.sequence);

        sign.video = videoUrl;

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