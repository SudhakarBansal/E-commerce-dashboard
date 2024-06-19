import React, { useState, useEffect } from 'react';
import {SquarePen,SquareCheckBig} from 'lucide-react'

const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [updateEnable, setUpdateEnable] = useState(false);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        let result = await fetch(`http://localhost:5000/fetch-user/${user._id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setEmail(result.email);
        setPassword(result.password);
    };

    const handleClick = async() => {
        await fetch(`http://localhost:5000/update-user/${user._id}`, {
            method: "put",
            body: JSON.stringify({ name, email, password}),
            headers: {
                'Content-Type': "application/json",
                authorization : `bearer ${JSON.parse(localStorage.getItem("token"))}`

            }
        })
        setUpdateEnable(!updateEnable);
    };

    return (
        <div className='profile-container main-content'>
            <div className='profile-picture'>
                <div className='profile-initials'>
                    {name.slice(0, 1).toUpperCase()}
                </div>
            </div>
            <div className='flex-box'>
            <h2>Hello {name}</h2>
            <div className='update-btn' onClick={handleClick}>{updateEnable ? <SquareCheckBig size={20} />:<SquarePen size={20} />}</div>
            </div>
            <div className='profile-details'>
                <div className='profile-item'>
                    <label>Name:</label>
                    {updateEnable ? (
                        <input type='text' className='update-input' value={name} onChange={(e) => setName(e.target.value)} />
                    ) : (
                        <span>{name}</span>
                    )}
                </div>
                <div className='profile-item'>
                    <label>Email:</label>
                    {updateEnable ? (
                        <input type='text' className='update-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                    ) : (
                        <span>{email}</span>
                    )}
                </div>
                <div className='profile-item'>
                    <label>Password:</label>
                    {updateEnable ? (
                        <input type='text' className='update-input' value={password} onChange={(e) => setPassword(e.target.value)} />
                    ) : (
                        <span className='masked-password'>{'*'.repeat(password.length)}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
