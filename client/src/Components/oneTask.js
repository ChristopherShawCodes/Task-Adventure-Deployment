import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {NavLink} from 'react-router-dom'
import {useParams,useNavigate,Link} from 'react-router-dom'
import trashCan from '../Static/ExportedIcons/Icon_Trash.png'
import editIcon from '../Static/ExportedIcons/Icon_Write.png'
import completedIcon from '../Static/ExportedIcons/Icon_Check.png'
import todoIcon from '../Static/ExportedIcons/Icon_Clock.png'
import completedModule from '../assets/complete-module.png'
import plus from '../GUI/PNG/17Icons/yellow/+_yellow.png'
import check from '../GUI/PNG/17Icons/yellow/check_mark_yellow.png'
import './oneTask.css'




import ReactAudioPlayer from 'react-audio-player'
import sA from '../Sound Track/mp3/Medieval Vol. 2 1.mp3'




const OneTask = (props) => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [task,setTask] = useState({})
    const [completed,setCompleted] = useState(false)
    const [points,setPoints] = useState(50)
    const [icon,setIcon] = useState({})
    
    const oneCard = document.querySelector('.one-card')
    const settings = document.querySelector('.settings')
    const audio = document.querySelector('.audio-player')
    const close = document.querySelector('.close')
    const complete = document.querySelector('.completed-module')
    const end = document.querySelector('.one-end-button')
    const cont = document.querySelector('.continue')
    const post = document.querySelector('.post')
    const credits = document.querySelector('.credits')


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



    useEffect(() =>{
        //Server --> Routes --> Get One 
        axios.get(`http://localhost:8000/api/task/${id}`)
        .then((res)=>{
            setTask(res.data)
            setIcon(todoIcon)
        }).catch((err)=>{
            console.log(err)
        })
    },[])


      const handleCompleted = (e) =>{
        const result = points + 50
        const done = true
        setPoints({result})
        setCompleted({done})
        setIcon(completedIcon)
        oneCard.style.backgroundColor = '#535635'
        complete.style.transform = 'translateX(2%)'
        post.style.visibility = 'visible'
        end.style.visibility = 'visible'
        console.log('task completed?' + " " + done)
        console.log('rewarded' + " " + points + "" + ' points to player.')
      }


    const handleDelete = (id) =>{
        //Server --> Routes --> Delete 
        axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then((res)=>{
            navigate('/allTasks')
            console.log(`Deleted ${task.title} from DB`)
        }).catch((err)=>{
            console.log(`Unable to delete ${task.title}`)
            console.log(err)
        })
    }


  return (
    <div className='oneTask-bg'>
    <img  src={completedModule} className='completed-module' alt='completed?'></img>
      <div className='one-card'>
        <div className="card-header">
          <p>{task.title}</p>
        </div>
        <div className='card-body' id='cardBody'>
        <div>
        <label className='label-a'>Task Priority</label>
            <p> {task.priority}</p>
        <label className='label-b'>Due Date</label>
            <p> {task.startDate}</p>
        <label className='label-c'>Description</label>
            <p>{task.description}</p>
          </div>   
          <div className='card-icons'>
            <img src={icon} alt='todoIcon' className='todo-icon' disabled={true} onClick={handleCompleted}/>
              <Link to={`/edit/${task._id}`}>
                <img src={editIcon} className='edit-icon' alt='editIcon'/>
              </Link>
              <img src={trashCan} className='trash-can' alt='trashCan' onClick={(e)=> handleDelete(task._id)}/>
        </div>
        </div>
        <div className='card-footer col-12' id='oneFooter'>
      </div>
    </div>
    <div className='post'>
      <p><img src={check} alt='check'></img>Task marked completed</p>
      <br/>
      <p><img src={plus} alt='plus'></img> 50 points toward next level</p>
    </div>
    <div className='credits'>
        <Link to='/credits' className='nav-link' id='credit-link'></Link>
    </div>
    <NavLink to='/allTasks' className="one-end-button"></NavLink>
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

export default OneTask