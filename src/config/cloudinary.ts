import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadVideo = async (fileBuffer: Buffer, name: string): Promise<string> => {
    try {
        const result = await cloudinary.v2.uploader.upload(`data:video/mp4;base64,${fileBuffer.toString('base64')}`, { resource_type: 'video', format: 'mp4', public_id: name });
        return result.secure_url;
    } catch (error) {
        throw new Error('Failed to upload video');
    }
}