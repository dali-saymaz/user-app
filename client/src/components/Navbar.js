import React from 'react'
import style from './styles/Navbar.module.css'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {

    const { name, user, setUser } = useAuth();

    const navigate = useNavigate()

    const refresh = () => {
        window.location.reload()
    }

    const handleLogin = () => {
        navigate('/login')
        console.log('handleLogin')
    }
    const handleLogout = () => {

        fetch('http://localhost:5000/auth/logout',
            {
                credentials: 'include'
            }).then(res =>{
                console.log('1',res)
                res.json()})
            .then(res => {
                console.log('logout function', res);
                setUser(res);
            }).catch(err => {
                console.log('logout error', err);
            });

        navigate('/')
    }
    const handleRegister = () => {
        navigate('/register')
        console.log('handleRegister')
    }

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <div onClick={refresh} className={style.leftSide}>
                    <img src={logo} alt="" />
                </div>
                <div className={style.rightSide}>
                    <ul>
                        {
                            user?.email ?
                                <>
                                    <li>{user.first_name} {user.last_name}</li>
                                    <li onClick={handleLogout}>Logout</li>
                                </>
                                :
                                <>
                                    <li onClick={handleLogin}>Login</li>
                                    <li onClick={handleRegister}>Register</li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
