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
    videoUrl: string;
    isArchived?: boolean;
    keypoints?: Keypoints[];
}