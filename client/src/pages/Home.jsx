import React, { useState } from 'react'
import Upload from '../components/Upload'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const [data, setData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    video: null
  })

  const [uploadProgress, setUploadProgress] = useState(0);

  const {title, description, thumbnail, video} = data;

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
    // console.log(data);

  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log("video",video);

    const formData = new FormData();
    formData.append("title",title);
    formData.append("description",description);
    formData.append("thumbnail",thumbnail);
    formData.append("video",video);

    // console.log("formData",formData);


    setUploadProgress(0);
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress =  progressEvent.total 
          ? Math.round((progressEvent.loaded * 100) / progressEvent.total) 
          : 0; 
          setUploadProgress(progress);
        },
      });


      console.log("UPLOAD RESPONSE.........",response);

      setUploadProgress(100);
      navigate("/list")
    }
    catch(error) {
      console.log("Error while uploading data.......",error);
      setUploadProgress(0);
    }
    
  }


  return (
    <div className='h-screen p-5 bg-[#e9eaec] overflow-hidden'>

      <div className='w-[70%] mx-auto grid grid-cols-2 place-items-center justify-center items-center gap-x-5'>
        <button onClick={() => navigate("/list")} className='w-32 h-10 px-3 py-1 bg-[#1565c0] rounded-md text-white'>
          Go to list
        </button>
        <form
          onSubmit={handleSubmit}
            className='w-[600px] h-[600px] overflow-scroll no-scrollbar bg-white text-black box-border p-8 rounded-3xl'
          >
            <div className='w-full flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-4xl mb-3 text-[#0d47a1] font-medium'>Upload Video</h1>

                    
                </div>
    
                <div className='flex flex-col gap-3'>
                  <label htmlFor='title' className='text-lg font-semibold'>Title</label>
                  <input 
                    name='title'
                    type='text'
                    placeholder='Enter Title'
                    maxLength={50}
                    onChange={handleChange}
                    className='bg-[#e9ecef] border-none rounded-md p-2'
                  />
                </div>
 
                <div className='flex flex-col gap-3'>
                  <label htmlFor='desc' className='text-lg font-semibold'>Description</label>
                  <input 
                    name='description'
                    type='text'
                    placeholder='Enter Description'
                    maxLength={200}
                    onChange={handleChange}
                    className='bg-[#e9ecef] border-none rounded-md p-2'
                  />
                </div>

                <div className='flex flex-col gap-3'>

                  {/* thumbnail */}
                  <div>
                    <p className='text-lg font-semibold'>Upload thumbnail</p>
                    <Upload 
                      video={false}
                      data={data}
                      setData={setData}
                    />
                  </div>

                  {/* video */}
                  <div>
                    <p className='text-lg font-semibold'>Upload Video</p>
                    <Upload 
                      video={true}
                      data={data}
                      setData={setData}
                    />
                  </div>
                </div>

                <div>
                  <button 
                    type='submit' 
                    className='px-3 py-1 bg-[#1565c0] rounded-md text-white'
                  >
                    Save
                  </button>

                  {
                    uploadProgress !== 100 && uploadProgress > 0 && (
                      <p className='text-[#1565c0]'>Progress: {uploadProgress} %</p>
                    )
                  }
                  {
                    uploadProgress === 100 && (
                      <p className='text-[#2b9348]'>Uploaded successfully!!</p>
                    )
                  }
                </div>
                
            </div>
    
          </form>
      </div>
        
    </div>
  )
}

export default Home