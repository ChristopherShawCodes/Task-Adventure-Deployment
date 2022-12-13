import '../App.css'
import ReactAudioPlayer from 'react-audio-player'
import {useNavigate} from 'react-router-dom'
import sA from '../Sound Track/mp3/Medieval Vol. 2 1.mp3'
import menu from '../assets/start.png'

const Homepage = () => {

    const navigate = useNavigate()
    const handleClick = () =>{
        navigate('/login')
    }



    return (
        <div className='bg-home'>
            <div className='d-flex flex-row justify-content-around w-100' id='menu'>
                <img src={menu} onClick={handleClick}></img>
            </div>
            <ReactAudioPlayer
            src={sA}
            // autoPlay
            />

        </div>
    )
}
export default Homepage