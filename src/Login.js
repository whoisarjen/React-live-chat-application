import { useState } from 'react'
import { useNavigate } from 'react-router'
import './styles/Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [login, setLogin] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        window.localStorage.setItem('token', login)
        navigate('/chat')
    }

    return (
        <div className="login">
            <div/>
            <form className="loginForm">
                <label>What's your name?</label>
                <input value={login} onChange={ (e) => setLogin(e.target.value) }></input>
                <button onClick={handleSubmit}>Join</button>
            </form>
            <div/>
        </div>
    );
}
 
export default Login;