import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import EmailPassword from './EmailPassword';
import SubmitBtn from './SubmitBtn';

const SignUp = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/');
    }
  })

  const handleCreateAccountBtn = async () => {
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': "application/json"
      }
    })
    result = await result.json();
    if (result) {
      navigate("/");
    }
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));
  }
  return (
    <form className='SignUpContainer' onSubmit={(e) => handleCreateAccountBtn(e)}>
      <h1>Sign Up</h1>
      <div className='form'>
        <p>Already have an account ? <span onClick={() => navigate('/login')}>Login</span> </p>

        <input
          className='input-field'
          type='text'
          placeholder='Name'
          value={name}
          onChange={(e) => setname(e.target.value)}
        >
        </input>

        <EmailPassword setEmail={setEmail} setpassword={setpassword} email={email} password={password} />

        <SubmitBtn text={"Create account"}/>
      </div>
    </form>
  )
}

export default SignUp