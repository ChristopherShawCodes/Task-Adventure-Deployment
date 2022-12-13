import {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './Register.css'



const Register = () => {
    const [user,setUser] = useState({
        username:"",
        email:"",
        password: "",
        points: ""
    })

    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [points,setPoints] = useState('')
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()




    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/register',{
        username,
        email,
        password,
        points,
    },{withCredentials: true})
    .then((res) =>{
        setUser({...user,[username]:e.target.value})
        console.log(res,"this might have worked")
        setPoints(0)
        navigate('/login')
    }).catch((err)=>{
        // console.log(err.response.data.errors)
        // setErrors(err.response.data.errors)
        // console.log(username.message)
    })
}





    return (
<div className='bg-register'>
    <div>.</div>
        <form onSubmit={handleSubmit} id='registration-form'>
                <div className="form-group ">
                    <input 
                        type="text" 
                        id="create-account-name" 
                        className='form-control mx-auto'
                        name="username" 
                        value={username}
                        required= {true}
                        onChange={(e) =>setUsername(e.target.value)} 
                        placeholder="FullName"/>
                    {errors.username ? <span className='text-danger' id='validationError'>{errors.username.message}</span> : null}
                    <input 
                        type="text" 
                        id="create-account-first-name" 
                        className='form-control mx-auto'
                        name="email" 
                        value={email} 
                        onChange={(e) =>setEmail(e.target.value)}
                        required= {true}
                        placeholder="Email"/>
                    {errors.email ? <span className='text-danger' id='validationError'>{errors.email.message}</span> : null}
                    <input 
                        type="password" 
                        id="create-account-email" 
                        className='form-control mx-auto'
                        name="password" 
                        value={password}
                        required= {true}
                        onChange={(e) =>setPassword(e.target.value)}    
                        placeholder="password"/>
                    {errors.password ? <span className='text-danger' id='validationError'>{errors.password.message}</span> : null}
                    <button type="submit" className='form-control mx-auto' id='go'>Register</button>
                    <div id='sign-in'>
                        Already have an account ?
                        <a href="/login" target="_blank">
                        Sign in
                        </a>
                    </div>
                </div>
        </form>
</div>
    )
}

export default Register