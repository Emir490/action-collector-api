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
            required: true,
            index: true
        },
        sequence: {
            type: String,
            required: true
        },
        video: {
            type: String,
            required: true
        },
        videoUrl: {
            type: String,
            required: true
        },
        isArchived: {
            type: Boolean,
            default: false
        },
        keypoints: [
            {
                pose: {
                    type: [Number],
                    required: true,
                    length: 132
                },
                face: {
                    type: [Number],
                    required: true,
                    length: 1404
                },
                rightHand: {
                    type: [Number],
                    required: true,
                    length: 63
                },
                leftHand: {
                    type: [Number],
                    required: true,
                    length: 63
                }
            }
        ]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const ActionModel = model('actions', ActionSchema);
export default ActionModel;