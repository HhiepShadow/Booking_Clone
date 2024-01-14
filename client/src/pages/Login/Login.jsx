import { useContext, useState } from 'react';
import './login.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [credentials, setCredentials] = useState({
        userName: undefined,
        password: undefined
    });

    const { user, loading, error, dispatch } = useContext(AuthContext);

    const handleChange = (e) => {
        setCredentials(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }));
    };
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        try {
            const res = await axios.post(`/auth/login`, credentials);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            navigate("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
        }
    }


    return (
        <div className='loginContainer'>
            <input type='text' placeholder='username' id='username' className='loginInput' onChange={handleChange} />
            <input type='password' placeholder='password' id='password' className='loginInput' onChange={handleChange} />
            <button onClick={handleClick} className='loginBtn'>Login</button>
            {error && <span>{error.message}</span>}
        </div>
    )
}

export default Login