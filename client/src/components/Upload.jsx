import React, {useState} from 'react'
import { useDropzone } from 'react-dropzone';
import ReactPlayer from 'react-player';

const Upload = ({video, data, setData}) => {
    
    const [previewSource, setPreviewSource] = useState(''); 
      
    
    const onDrop = (acceptedFiles) => {
        console.log("Accepted Files",acceptedFiles);
        const file = acceptedFiles[0];
        previewFile(file);
        setData({
            ...data,
            [video ? "video" : "thumbnail"]: file
        });
    }
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: !video
        ? { "image/*": [".jpeg", ".jpg", ".png"] }
        : { "video/*": [".mp4",".mpeg",".avi"] },
    })
    
    const previewFile = (file) => {
        // console.log(file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
        }
    }

  return (
        <div>
            {
            previewSource ? (
                <div>
                {
                    video ? (
                        <ReactPlayer
                            url={previewSource}
                            width={400}
                        />
                    ) : (
                    <img src={previewSource} alt='previewSrc' />
                    )
                }
                </div>
            ) : (
                <div
                {...getRootProps()}
                className='h-96 w-96 border-2 border-gray-300 border-dashed rounded-lg grid place-content-center'
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here...</p>
                        ) : (
                        <p>Drag and drop some files here, or click to select files</p>
                    )}

                </div>
            )
            }
        </div>
    
  )
}

export default Upload