import cloudinary from '../config/cloudinary.js';
import { asyncHandler, ApiError } from '../utils/helpers.js';

/**
 * @route   POST /api/upload
 * @desc    Upload an image to Cloudinary
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError('No image file provided', 400);
  }

  // Convert buffer to base64 data URI for Cloudinary upload
  const b64 = Buffer.from(req.file.buffer).toString('base64');
  const dataURI = `data:${req.file.mimetype};base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder: 'nexusfund',
    resource_type: 'image',
    transformation: [
      { width: 1200, height: 630, crop: 'limit' },
      { quality: 'auto', fetch_format: 'auto' },
    ],
  });

  res.json({
    success: true,
    url: result.secure_url,
    publicId: result.public_id,
  });
});
