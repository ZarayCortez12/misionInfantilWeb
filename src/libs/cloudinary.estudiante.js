import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
  cloud_name: "dngdztc0m",
  api_key: "629674949981732",
  api_secret: "EMN4L4Jr1ZrCmxzohBjaqehnzaY",
});

export const uploadImage = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
      folder: "Estudiantes",
    });
  };
  
  export const deleteImage = async (public_id) => {
    return await cloudinary.uploader.destroy(public_id);
  };
  
  export const updateImage = async (filePath, public_id) => {
    await cloudinary.uploader.destroy(public_id);
    return await cloudinary.uploader.upload(filePath, {
      folder: "Estudiantes",
    });
  };