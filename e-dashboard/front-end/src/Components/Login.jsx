import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmailPassword from './EmailPassword';
import SubmitBtn from './SubmitBtn';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [errorEnable, setErrorEnable] = useState(false);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/");
        } else {
            setTimeout(() => {
                setErrorEnable(false);
            }, 3000);
            setErrorEnable(true);
            setEmail('');
            setpassword('')
        }

    }

    return (
        <div className='LoginContainer main-content'>
            <h1>Log In</h1>
            <form className='form' onSubmit={(e) => handleLogin(e)} >
                <p>Create a new account ? <span onClick={() => navigate('/signup')}>Sign Up</span> </p>

                <EmailPassword setEmail={setEmail} setpassword={setpassword} email={email} password={password}/>

                {(errorEnable) &&
                    <p className='error'>please enter valid details</p>
                }
                <SubmitBtn text={"Login"}/>
            </form>
        </div>
    )
}

export default Login