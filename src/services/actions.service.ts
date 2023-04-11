import { uploadVideo } from "../config/cloudinary";
import { Action } from "../interfaces/action.interface"
import ActionModel from "../models/Action";

const getActions = async (action: string) => {
    try {
        const Actions = await ActionModel.find({ action }).select('-keypoints');
        return Actions;
    } catch (error) {
        console.log(error);
    }
}

const addAction = async (sign: Action, file: Buffer) => {
    try {
        const videoUrl = await uploadVideo(file, sign.sequence);

        sign.video = videoUrl;

        const action = await ActionModel.create(sign);

        const responseAction = action.toObject();

        delete responseAction.keypoints;

        return responseAction;
    } catch (error) {
        console.log(error);
    }
}

const removeAction = async (id: string) => {
    try {
        await ActionModel.findByIdAndRemove(id);
        return {
            msg: "Acción eliminada"
        }
    } catch (error) {
        console.log(error);
    }
}

export { getActions, addAction, removeAction }