import { useState } from "react";
import ReactLoading from "react-loading";
import { api } from "../../services/api";
import { Container, Button, Image, ImagesContainer } from "./styles"

export const Upload = () => {
  const [file, setFile] = useState(null)
  const [lastFileName, setLastFileName] = useState(null)
  const [lastFileUrl, setLastFileUrl] = useState(null)
  const [imageUrlPreview, setImageUrlPreview] = useState(null)
  const [isLoading, setIsLoading] = useState({ upload: false, fetch: false })
  const handleUpload = async () => {
    setIsLoading((prev) => ({ prev, upload: true }))
    const fileType = file.type.split('/')[1]
    const data = new FormData()
    data.append('file', file)
    try {
      const response = await api.post(`/files/upload_file?file_format=${fileType}`, data)
      setLastFileName(response.data.file_name)
    }
    catch {
      console.log('error')
    }
    setIsLoading((prev) => ({ prev, upload: false }))

  }

  const handleFetchLastFile = async () => {
    setIsLoading((prev) => ({ prev, fetch: true }))
    try {
      const response = await api.get(`/files/get_file?key=${lastFileName}`)
      setLastFileUrl(response.data.key)
    }
    catch {
      console.log('error')
    }
    setIsLoading((prev) => ({ prev, fetch: false }))
  }
  const handleInputChanges = (event) => {
    const file = event.target.files[0]
    const url = URL.createObjectURL(file)
    setImageUrlPreview(url)
    setFile(file)
    
  }


  return (
    <Container>
      <h1>Upload</h1>
      <input
        type="file"
        onChange={handleInputChanges}
        accept="image/*"
      />
      <Button
        onClick={handleUpload}
        disabled={!file}
      >
        {
          isLoading.upload ?
            <ReactLoading
              type="bubbles"
              color="#fff"
              width={18}
              height={18} /> :
            'Upload'
        }
      </Button>
      <Button
        onClick={handleFetchLastFile}
        disabled={!lastFileName}
        inverted
      >
        {
          isLoading.fetch ?
            <ReactLoading
              type="bubbles"
              color="#fff"
              width={18}
              height={18} /> :
            'Fetch'
        }
      </Button>
      <ImagesContainer>
      {
          imageUrlPreview && (
            <div>
              <h2>Preview</h2>
              <Image src={imageUrlPreview} alt="preview" />
            </div>
          )
        }
        {
          lastFileUrl && (
            <div>
              <h2>Uploaded</h2>
              <Image src={lastFileUrl} alt="uploadad" />
            </div>
          )
        }
      </ImagesContainer>
    </Container>
  );
}