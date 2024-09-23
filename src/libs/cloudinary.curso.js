import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: "dngdztc0m",
  api_key: "629674949981732",
  api_secret: "EMN4L4Jr1ZrCmxzohBjaqehnzaY",
});

export const uploadFile = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "Cursos",           // Carpeta de destino en Cloudinary
    resource_type: "raw",       // Asegurarse de que los archivos se suben como documentos no multimedia
  });
};

export const deleteFile = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id, {
    resource_type: "raw",       // Asegurarse de que se está eliminando un archivo "raw"
  });
};

export const updateFile = async (filePath, public_id) => {
  await cloudinary.uploader.destroy(public_id, { resource_type: "raw" });
  return await cloudinary.uploader.upload(filePath, {
    folder: "Cursos",
    resource_type: "raw",       // Asegurarse de que los archivos se suben como documentos no multimedia
  });
};
