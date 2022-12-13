import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useNavigate,useParams} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './EditForm.css'

const EditForm = () => {
    const [title,setTitle] = useState('')
    const [priority,setPriority] = useState('')
    const [startDate, setStartDate] = useState('')
    const [description, setDescription] = useState('')
    const [completed,setCompleted] = useState()
    const [points,setPoints] = useState()
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()
    const {id} = useParams()

    const filterPassedTime = (time) =>{
        const currentDate = new Date()
        const selectedDate = new Date(time)

        return currentDate.getTime() < selectedDate.getTime()
    }

    useEffect(() =>{
        axios.get(`http://localhost:8000/api/task/${id}`)
        .then((res) =>{
            setTitle(res.data.title)
            setPriority(res.data.priority)
            setStartDate(res.data.startDate)
            setDescription(res.data.description)
            setCompleted(res.data.completed)
        }).catch((err)=>{
            console.log(`Unable To Edit ${id}`)
            console.log(err)
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/edit/${id}`,{
            title,
            priority,
            startDate,
            description,
            completed
        }).then((res) =>{
            console.log(res)
            setPoints(0)
            setCompleted(false)
            navigate('/allTasks')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }








    return (
        <div className='edit-bg'>
        <div>.</div>
        <div className='card-container'>
        <div className='task-card'>
            <form className='form-group' onSubmit={handleSubmit}>
            <div className='task-selector'>
                <h4 className='what-type'>Want to update your task ?</h4>

                </div>
                <div id='prePopulated'>
                    <select className='input-block' onChange={(e) =>setTitle(e.target.value)} value={title}>
                        <option>Select A Task</option>
                        <option value='WalkDog'>Walk The Dog</option>
                        <option value='FeedFish'>Feed The Fish</option>
                        <option value='Laundry'>Laundry</option>
                    </select>                
                </div>
                <div id='customInput'>
                    <input className='input-block' placeholder="What's Your Task ?" type='text' onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                        {errors.task ? <span className='text-danger' id='validationError'>{errors.task.message}</span> : null}
                </div>
                <select className='input-block' onChange={(e) =>setPriority(e.target.value)} value={priority}>
                <option>Select A Priority</option>
                <option value='High'>High</option>
                <option value='Medium'>Medium</option>
                <option value='Low'>Low</option>
                </select>                
                    {errors.priority ? <span className='text-danger' id='validationError'>{errors.priority.message}</span> : null}
                <DatePicker
                    onChange={(date) => setStartDate(date)}
                    showTimeSelect
                    filterTime={filterPassedTime}
                    className='input-block'
                    dateFormat="MMMM d, yyyy h:mm "
                    placeholderText='Want to update when this task is due?'
                />
                    <input className='input-block' id='updated-time' type='text' value={startDate}></input>
                    {errors.startDate ? <span className='text-danger' id='validationError'>{errors.rating.message}</span> : null}
                <textarea className='text-area'onChange={(e) =>setDescription(e.target.value)} value={description}></textarea>
            <button className='update-button' type='submit'>Update Task</button>
        </form>
        </div>
        </div>
    </div>
)
}

export default EditForm