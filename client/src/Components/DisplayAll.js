import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'


import ReactAudioPlayer from 'react-audio-player'
import sA from '../Sound Track/mp3/Medieval Vol. 2 1.mp3'


import './DisplayAll.css'
import speed from  '../GUI/PNG/17Icons/yellow/speed_yellow.png'
import complete from '../assets/complete.png'
import notComplete from '../assets/not-complete.png'








const DisplayAll = (props) => {


    // const [list,setList] = useState([])
    const {list,setList} = props
    const [completed,setCompleted] = useState(true)
    const [points,setPoints] = useState('')
    const [user,setUser] = useState({})
    
    const settings = document.querySelector('.settings')
    const audio = document.querySelector('.audio-player')
    const close = document.querySelector('.close')
    const credits = document.querySelector('.credits')
    

    useEffect(() =>{
        axios.get('http://localhost:8000/api/allTasks',{withCredentials:true})
        .then((res) =>{
        console.log(res)
        setList(res.data)
        }).catch(err => console.log(err))
    },[])

    const handleSettings = () =>{
        settings.style.visibility = 'hidden'
        credits.style.visibility = 'visible'
        audio.style.visibility = 'visible'
        close.style.visibility = 'visible'
    }

    const handleClose = () =>{
        settings.style.visibility = 'visible'
        audio.style.visibility = 'hidden'
        close.style.visibility = 'hidden'
        credits.style.visibility = 'hidden'
    }



  return (
    <div className='tasks-bg'>
    <div>.</div>
    {
        list.map((task) =>(
            <div className='card' >
                <div className='card-header'>
                    <h1 className='task-title'>{task.title}</h1>
                </div>
                <div className='card-body'>
                    <label>Task Priority</label>
                        <p> {task.priority}</p>
                    <label>Due Date</label>
                        <p> {task.startDate}</p>
                    <label>Description</label>
                        <p>{task.description}</p>
                </div>
                <div className='card-footer'>
                    <p className='name'>{task.user?.username}</p>
                    <Link to={`/oneTask/${task._id}`} className='view-task'><img src={speed} alt='speed' className='speed'></img></Link>
                </div>
            </div>
        ))
    }
    <div className='credits'>
        <Link to='/credits' className='nav-link' id='credit-link'></Link>
    </div>
    <ReactAudioPlayer
            src={sA}
            autoPlay
            controls
            volume={0.2}
            className='audio-player'
            />
    <p className='close' onClick={handleClose}>X</p>
    <div className='settings' onClick={handleSettings}></div>
    </div>
  )
}

export default DisplayAll