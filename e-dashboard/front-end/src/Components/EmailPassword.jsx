import React, {useState} from 'react'
import {Eye,EyeOff} from 'lucide-react'

const EmailPassword = ({setEmail,setpassword,email,password}) => {
    const [eyeEnable, setEyeEnable] = useState(false);
    
    return (
        <>
            <input
                className='input-field'
                type='email'
                placeholder='Email Address'
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            >
            </input>

            <div className="pass-field">
                <input
                    className='input-field'
                    type={(!eyeEnable) ? 'password' : 'text'}
                    required
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                >
                </input>
                <div className='show-password' onClick={() => setEyeEnable(!eyeEnable)}>
                    {(eyeEnable) ? <Eye size={21} /> :
                        <EyeOff size={21} />}
                </div>
            </div>
        </>
    )
}

export default EmailPassword