export interface Action {
    category: string;
    action: string;
    sequence: string;
    video: string;
    keypoints?: number[][];
}