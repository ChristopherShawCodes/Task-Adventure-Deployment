import ReactPlayer from "react-player"
import {useState} from 'react'
import {NavLink} from 'react-router-dom'
import './Video.css'
import Vid from './video.mp4'
import Img from './video-bg.gif'

const Video = () => {


  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const onLoadedData = () => {
    setIsVideoLoaded(true);
  }

  const handleEnd = () =>{
    const end = document.querySelector('.end-button')
    const cont = document.querySelector('.continue')
    end.style.visibility = 'visible'
    cont.style.visibility = 'visible'
}


  return (
    <div className="video-bg">
      <div className="container-fluid mx-auto">
        <img
          src={Img}
          className="video-thumb tiny"
          alt="thumb"
          style={{ opacity: isVideoLoaded ? 0 : 1 }}
        />
        <div style={{ opacity: isVideoLoaded ? 1 : 0 }}>
          <ReactPlayer
            url={Vid}
            playing={true}
            width = '50%'
            height = '50%'
            controls={true}
            className = 'react-player'
            volume={0.3}
            muted={false}
            onEnded= {handleEnd}
            playsinline={true}
            onReady={onLoadedData}
          />
        </div>
      </div>
      <NavLink to='/allTasks'><button className="end-button"></button></NavLink>
      <p className="continue">continue</p>
    </div>
  );
}


export default Video