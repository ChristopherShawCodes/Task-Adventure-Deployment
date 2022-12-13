import {useState} from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import axios from 'axios'



import { Nav, NavItem} from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserCircle, faCirclePlus,faCalendar,faUpRightFromSquare ,faVideoCamera} from '@fortawesome/free-solid-svg-icons';
import './NavBar.css'

import gui from '../GUI/PNG/13Upgrades/button1_yellow.png'





const NavBar = (props) => {
    // const [login,setLoginUser] = useState('')
    const {login,setLoginUser} = props
    const [isHovering, setIsHovering] = useState(false)
    const navigate = useNavigate()


    const handleMouseOver = () =>{
      isHovering(true)
    }

    const handleMouseOut = () =>{
      setIsHovering(false)
    }

    const logOut = () =>{
        axios.get('http://localhost:8000/api/logout',{withCredentials: true})
        .then(result =>{
            setLoginUser(false)
            navigate('/')
        } )
        .catch(err =>{
            console.log(err,"Unable to log out user")
        })
    }


  return (
    <div>
<nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation">        
  <div className="container-fluid">
            <h4 className="navbar-brand" href="#">Task Adventure</h4>
            <nav className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top" role="navigation" id='nav-container'>        
            <Nav className="ml-auto">
          {login? 
          <>
            <NavItem>
              <NavLink to='/' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faHome} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/video' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faVideoCamera} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='allTasks' activeClassName="active" className='nav-link'>
                <FontAwesomeIcon icon={faCalendar}/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='addTask' className='nav-link'>
                <FontAwesomeIcon icon={faCirclePlus}/>
              </NavLink>
            </NavItem>
            <NavItem onClick={logOut} className='nav-link'>
              <FontAwesomeIcon icon={faUpRightFromSquare}/>
            </NavItem>
          </>
            :
          <>
            <NavItem>
              <NavLink to='/' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faHome}/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/login' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faUserCircle} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/video' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faVideoCamera} />
              </NavLink>
            </NavItem>
          </>
          }
            </Nav>
            {login?<div id='adventuring'><p id='gui-text'>on an adventure</p><img src={gui} id='gui'></img></div>: <div id='not-adventuring'><p id='gui-text'>please sign in</p><img src={gui} id='gui'></img></div>}
        </nav>
      </div>
        </nav>
        <nav className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav" role="navigation">
        <div className="container-fluid">
        {login?<div id='bottom-adventuring'><p id='bottom-gui-text'>on an adventure</p><img src={gui} id='bottom-gui'></img></div>: <div id='bottom-not-adventuring'><p id='bottom-gui-text'>please sign in</p><img src={gui} id='bottom-gui'></img></div>}
        <Nav className="ml-auto">
          {login? 
          <>
          <NavItem>
              <NavLink to='/' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faHome}/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/video' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faVideoCamera} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='allTasks' activeClassName="active" className='nav-link'>
                <FontAwesomeIcon icon={faCalendar}/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='addTask' className='nav-link'>
                <FontAwesomeIcon icon={faCirclePlus}/>
              </NavLink>
            </NavItem>
            <NavItem onClick={logOut} className='nav-link'>
              <FontAwesomeIcon icon={faUpRightFromSquare}/>
            </NavItem>
          </>
            
            :
          <>
            <NavItem>
              <NavLink to='/' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faHome}/>
              </NavLink>
            </NavItem>
              <NavItem>
              <NavLink to='/video' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faVideoCamera} />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/login' className='nav-link' activeClassName="active">
                <FontAwesomeIcon icon={faUserCircle} />
              </NavLink>
            </NavItem>
          </>
          }
            </Nav>
        </div>
        </nav>
</div>
  )
}

export default NavBar