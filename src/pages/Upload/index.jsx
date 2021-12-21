import { useState } from "react";
import ReactLoading from "react-loading";
import { api } from "../../services/api";
import "./styles.scss";
export const Upload = () => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [lastFileName, setLastFileName] = useState(null);
  const [uploadedImg, setUploadedImg] = useState(null);
  const [isLoading, setIsLoading] = useState({ upload: false, fetch: false })

  const handleImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFile(file);
    const url = URL.createObjectURL(file);
    setImagePreview(url);
  }
  const handleUpload = async () => {
    setIsLoading(prev => ({ ...prev, upload: true }))
    const fileType = file.type.split("/")[1]
    const formData = new FormData();
    formData.append("file", file);
    
    try {


      const response = await api.post(`/files/upload_file?file_format=${fileType}`, formData, {
        //check upload progress
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percent = Math.floor((loaded * 100) / total);
          console.log(`${percent}%`);
        }
      })
      setLastFileName(response.data.file_name)
    }
    catch {
      alert("erro")
    }
    setIsLoading(prev => ({ ...prev, upload: false }))

  }

  const handleFetch = async () => {
    setIsLoading(prev => ({ ...prev, fetch: true }))
    try {
      const response = await api.get(`/files/get_file?key=${lastFileName}`)
      setUploadedImg(response.data.key)
    }
    catch {
      alert("erro")
    }
    setIsLoading(prev => ({ ...prev, fetch: false }))
  }

  return (
    <div className="container">
      <h1>Upload</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button
        className="normalButton"
        disabled={!file}
        onClick={handleUpload}
      >
        {isLoading.upload ?
          <ReactLoading
            type="bubbles"
            color="#fff"
            width={18}
            height={18} /> : 
          "Upload"
      }
      </button>
      <button
        className="invertedButton"
        disabled={!lastFileName}
        onClick={handleFetch}
      >
        {isLoading.fetch ?
          <ReactLoading
            type="bubbles"
            color="#fff"
            width={18}
            height={18} /> : 
          "Fetch"
      }
      </button>
      <div
        className="imagesContainer"
      >
        {imagePreview && (
          <div>
            <h2>Preview</h2>
            <img
              src={imagePreview}
              alt="preview"
            />
          </div>
        )}
        {uploadedImg && (
          <div>
            <h2>Uploaded</h2>
            <img
              src={uploadedImg}
              alt="uploaded"
            />
          </div>
        )}

      </div>
    </div>
  )
}