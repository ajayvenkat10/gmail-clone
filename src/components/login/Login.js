import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { authentication, provider } from '../../firebase/Firebase';
import './Login.css'

function Login() {

    const dispatch = useDispatch();

    const signIn = () => {
        signInWithPopup(authentication, provider)
        .then(({user}) => {
            dispatch(
                login(
                    {
                        displayName: user.displayName,
                        email: user.email,
                        photoUrl: user.photoURL,

                    }
                )
            )
        }).catch((error) => alert(error.message));
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://cdn.vox-cdn.com/thumbor/Tbqi3ZF9Qz0fTJIUvkgQe3FdN0k=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg"
                    alt="Google Logo" />
                <Button onClick={signIn} variant="contained" color='primary'>Login</Button>
            </div>
        </div>
    )
}

export default Login