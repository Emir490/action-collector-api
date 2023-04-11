import { Schema, model } from "mongoose";
import { Action } from "../interfaces/action.interface";

export const ActionSchema = new Schema<Action>(
    {
        category: {
            type: String,
            required: true
        },
        action: {
            type: String,
            required: true
        },
        sequence: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        },
        keypoints: {
            type: [[Number]],
            required: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const ActionModel = model('actions', ActionSchema);
export default ActionModel;