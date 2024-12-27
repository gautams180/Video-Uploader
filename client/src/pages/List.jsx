import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const List = () => {

  const [videos, setVideos] = useState([]);

  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get(`${BASE_URL}/api/v1/getVideos`);

      console.log(response);

      setVideos(response.data.videos);
    }
    fetchVideos();
  },[BASE_URL]);


  return (
    <div className='p-10 bg-[#e9eaec] h-screen'>
      <h1 className='text-4xl mb-3 text-[#0d47a1] font-medium my-10'>List of Videos</h1>

      <div className='w-[70%] bg-white p-5 rounded-3xl'>
        {
          videos.length ? (
            <div className="flex flex-col gap-2 bg-[#e9eaec]">
              {
                videos.map(video => (
                  <div className="h-20 flex items-center gap-10 bg-white cursor-pointer" key={video._id} onClick={() => navigate("/video", { state: {videoUrl: video.videoUrl} })}>

                    <div>
                      <img src={video.thumbnailUrl} height={90} width={90} alt='thumbnail' />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <h3 className='text-[#6c757d]'><span className='text-black text-lg font-semibold'>Title: </span> {video.title}</h3>
                      <h3 className='text-[#6c757d]'><span className='text-black text-lg font-semibold'>Description: </span> {video.description}</h3>
                    </div>
                    {/* <video controls>
                      <source src={video.videoUrl} type="video/mp4" />
                    </video> */}
                  </div>
                ))
              }
            </div>
          ) : (
            <h1>Loading...</h1>
          )
        }
      </div>
      

    </div>
  )
}

export default List