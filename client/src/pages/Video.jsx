import React from 'react'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player';


const Video = () => {
    const location = useLocation();

    const url = location.state?.videoUrl;

    // console.log("URL",url);

  return (
    <div className='h-screen bg-[#e9eaec] p-10'>

        <div>
            <h1 className='text-4xl mb-3 text-[#0d47a1] font-medium'>Video</h1>

            <div>
                <ReactPlayer
                    url={url}
                    width={600}
                    height={400}
                    playing={true}
                    loop={true}
                />
            </div>
        </div>

    </div>
  )
}

export default Video