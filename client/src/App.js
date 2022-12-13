import './App.css';
import Canvas from './Components/Game/Canvas';
import Form from './Components/Form';
import DisplayAll from './Components/DisplayAll';
import OneTask from './Components/oneTask'
import NavBar from './Components/NavBar';
import Register from './Components/Register';
import Login from './Components/Login';
import Homepage from './Components/HomePage';
import EditForm from './Components/EditForm';
import {useState} from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Video from './Components/Video/Video';
import Credits from './Components/Credits/Credits';



function App() {

  // const [user,setLoginUser] = useState({})
  // const [login,setLoginUser] = useState({})
  const [login,setLoginUser] = useState(false)
  const [taskList,setTaskList] = useState([])
  const [user,setUser] = useState({})
  const [points,setPoints] = useState('')
  
  
  const canvasHeight = 576
  const canvasWidth = 1024



  const draw = (context) => {
    context.fillStyle = "#000000"
    context.fillRect(0, 0, canvasWidth, canvasHeight)

    context.fillStyle = "red"
    context.fillRect(0, 0, 50, 50)
}



  return (
    <div className="App">
        <BrowserRouter>
        <NavBar login={login} setLoginUser={setLoginUser}/>
            <Routes>
                <Route path='/register' element={<Register/>}/>
                <Route path='/video' element={<Video/>}/>
                <Route path='/credits' element={<Credits/>}/>
                <Route path='/login' element={<Login setLoginUser={setLoginUser}/>}/>
                <Route path='/game' element={<Canvas draw={draw} canvasHeight={canvasHeight} canvasWidth={canvasWidth} />}/>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/allTasks' element={<DisplayAll list={taskList} setList={setTaskList} points={points}/>}  />
                <Route path='/addTask' element={<Form setList={setTaskList}/>}/>
                <Route path='/edit/:id' element={<EditForm setPoints={setPoints} />}/>
                <Route path='/oneTask/:id' element={<OneTask/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
