
import {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Login.css'


const Login = ({setLoginUser}) => {
    const navigate = useNavigate()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [user,setUser] = useState({})
    const [points,setPoints] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login',{
            email,
            password,
            points
        },{withCredentials: true}).then((res) =>{
            console.log(res)
            setLoginUser(true)
            setUser(user => [...user,res.data])
            navigate('/video')
        }).catch((err)=>{
            err = new Error()
        })
    }


    return (
    <div className='bg-login'>
        <div>.</div>
        <form onSubmit={handleSubmit} className="form-inline mx-auto col-6" id='login-form'>
            <div className="form-group">
                <input 
                    className='form-control'
                    type="email" 
                    name="email"
                    id='email-input'
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
            </div>
            <div className="form-group">
                <input 
                    className='form-control'
                    type="password" 
                    name="password" 
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required/>
            </div>
            <small id="passwordHelpInline" class="text-muted"></small>
            <button type='submit' className='form-control' id='go'>Login</button>
            <p className="text" id='create-account'> Don't have an account? <a href="/register" id='create-link'>Create Account</a></p>
        </form>

    </div>
    )
}

export default Login