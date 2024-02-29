import axios from "axios";
import { useState } from "react";

const SampleAddRooms = () => {
    const providerRoute = import.meta.env.VITE_PROVIDER_ROUTE;
    const [files, setFiles] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        files.forEach(file => {
            formData.append('images', file);
        });

        try {
            const response = await axios.post(`${providerRoute}/rooms/addrooms`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
    };

    return (
        <div className="container px-6 mx-auto grid" style={{ width: '50%', marginTop: '5%', fontSize: '1.2rem' }}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="px-4 py-4 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 p-5 ">
                    <div className="col-xl-6">
                        <label className="block mt-4 text-sm">
                            <input type="file" className="" onChange={handleFileChange} name="images" id="images" accept="image/*" multiple />
                        </label>
                    </div>
                    <div className="flex space-x-2">
                        {files.map((file, index) => (
                            <img key={index} src={URL.createObjectURL(file)} alt={`Image ${index + 1}`} className="max-w-xs max-h-xs" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SampleAddRooms;
