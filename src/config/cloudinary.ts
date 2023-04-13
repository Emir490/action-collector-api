import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadVideo = async (file: Express.Multer.File, name: string): Promise<string | null> => {
    try {
        const result = await cloudinary.v2.uploader.upload(file.path, { resource_type: 'video', public_id: name });
        return result.secure_url
    } catch (error) {
        console.error(error);
        return null;
    }
}