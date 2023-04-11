interface Keypoints {
    pose: number[],
    face: number[],
    leftHand: number[],
    rightHand: number[]
}

export interface Action {
    category: string;
    action: string;
    sequence: string;
    video: string;
    isArchived?: boolean;
    keypoints?: Keypoints[];
}