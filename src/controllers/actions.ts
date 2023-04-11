import { Request, Response } from "express";
import { handleHttp } from "../utils/error.handle";
import { addAction, getActions, removeAction } from "../services/actions.service";

const index = async ({ params }: Request, res: Response) => {
    try {
        const { action } = params;
        const responseActions = await getActions(action);

        res.send(responseActions);
    } catch (error) {
        handleHttp(res, "ERROR_GET_ACTIONS");
    }
}

const postAction = async (req: Request, res: Response) => {
    try {
        const file = req.file;
        req.body.keypoints = JSON.parse(req.body.keypoints);
        
        if (!file) {
            return res.status(400).json({ message: "Error uploading file" });
        }

        const responseAction = await addAction(req.body, file.buffer);

        res.send(responseAction);
    } catch (error) {
        handleHttp(res, "ERROR_POST_ACTION");
    }
}

const deleteAction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const response = await removeAction(id);

        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

export { index, postAction, deleteAction }