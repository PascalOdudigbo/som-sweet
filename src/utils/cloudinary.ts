export function handleImageFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
    setSelectedImageFile: React.Dispatch<React.SetStateAction<File | null>>
  ) {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImageFile(file);
    }
  }
  
  export async function uploadImageToCloudinary(file: File): Promise<{ url: string; publicId: string } | null> {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME!);
    data.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);
    data.append('folder', 'sum_sweet_products');
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: 'POST', body: data }
      );
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
      const result = await response.json();
      return { url: result.secure_url, publicId: result.public_id };
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  }
  
  export async function deleteCloudinaryImage(publicId: string): Promise<boolean> {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = generateSignature(timestamp, publicId, process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET!);
  
    const formData = new FormData();
    formData.append('public_id', publicId);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
    formData.append('timestamp', timestamp);
    formData.append('signature', signature);
  
    try {
      const response = await fetch(url, { method: 'POST', body: formData });
      return response.ok;
    } catch (error) {
      console.error('Error deleting image from Cloudinary:', error);
      return false;
    }
  }
  
  function generateSignature(timestamp: string, publicId: string, apiSecret: string): string {
    const crypto = require('crypto');
    const toSign = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    return crypto.createHash('sha1').update(toSign).digest('hex');
  }
  