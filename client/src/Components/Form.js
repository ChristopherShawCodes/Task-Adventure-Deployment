import axios from 'axios'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import './Form.css'

const Form = (props) => {

    const {setList} = props


    const [title,setTitle] = useState('')
    const [priority,setPriority] = useState('')
    const [startDate, setStartDate] = useState('')
    const [description, setDescription] = useState('')
    const [completed,setCompleted] = useState()
    const [points,setPoints] = useState('')
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const filterPassedTime = (time) =>{
        const currentDate = new Date()
        const selectedDate = new Date(time)
        return currentDate.getTime() < selectedDate.getTime()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/addTask',{
            title,
            priority,
            startDate,
            description,
            points,
            completed
        },{withCredentials: true})
            .then((res) =>{
            console.log(res)
            setList(list => [...list,res.data])
            setPoints(50)
            setCompleted(false)
            navigate('/allTasks')
        }).catch((err)=>{
            console.log(err)
            setErrors(err.response.data.errors)
        })
    }

    
    
    const handleQuickTask = () =>{
        const quick = document.getElementById('quickTask')
        quick.style.backgroundColor = '#FAB42C'

        const c = document.getElementById('customTask')
        c.style.backgroundColor = '#FFF'
        
        
        var prePopulated = document.getElementById('prePopulated')
        prePopulated.style.display = 'block'
        
        var custom = document.getElementById('customInput')
        custom.style.display = 'none'
        
        var addButton = document.getElementById('addButton')
        addButton.style.backgroundColor = '#D0DBC2'
    }
    
    const handleStandardTask = () =>{
        const c = document.getElementById('customTask')
        c.style.backgroundColor = '#FAB42C'
        
        const quick = document.getElementById('quickTask')
        quick.style.backgroundColor = '#FFF'

        var prePopulated = document.getElementById('prePopulated')
        prePopulated.style.display = 'none'

        var custom = document.getElementById('customInput')
        custom.style.display = 'block'

        var addButton = document.getElementById('addButton')
        addButton.style.backgroundColor = '#DEEEFE'
    }




    return (
        <div className='form-bg'>
        <div>.</div>
        <div className='card-container-form'>
            <div className='task-card'>
                <form className='form-group' onSubmit={handleSubmit}>
                <div className='task-selector'>
                <h4 className='what-type'>What type of task would you like to create?</h4>
                    <div  id='quickTask' onClick={handleQuickTask}>Quick</div>
                    <div id='customTask' onClick={handleStandardTask}>Custom</div>
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

                    </div>
                        <select className='input-block' onChange={(e) =>setPriority(e.target.value)} value={priority}>
                            <option>Select A Priority</option>
                            <option value='High'>High</option>
                            <option value='Medium'>Medium</option>
                            <option value='Low'>Low</option>
                        </select>                
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        showTimeSelect
                        filterTime={filterPassedTime}
                        className='input-block'
                        dateFormat="MMMM d, yyyy h:mm "
                        placeholderText='What day should the task be completed on?'
                    />

                    <textarea placeholder='Task description' className='input-block' onChange={(e) =>setDescription(e.target.value)} value={description}></textarea>
                    <button className='add-button' type='submit'>Add Task</button>
                </form>
                </div>
            </div>
        </div>
)
}

export default Form