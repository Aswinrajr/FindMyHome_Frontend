import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

const resourceType = "image";

export const uploadCloudinary = async (file) => {
  console.log("Selected file:", file); 
  console.log("File type:", file.type); 

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "provider_images");

  try {
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData
    );
    console.log("Cloudinary Response:", data); 

    return { url: data?.secure_url, format: data.format };
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};
