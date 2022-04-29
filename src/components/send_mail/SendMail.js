import { Close } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import './SendMail.css'

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from '../../features/mailSlice';
import { db } from '../../firebase/Firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore/lite';

function SendMail() {
    
    const { register, handleSubmit, formState : {errors} } = useForm({});

    const onSubmit = (formData) => {
        console.log(formData);

        addDoc(collection(db, 'emails'),{
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: serverTimestamp()
        });

        dispatch(closeSendMessage()); 
    }

    const dispatch = useDispatch();

    return (
        <div className="sendMail">
            <div className="sendMail__header">
                <h3>New Message</h3>
                <Close className="sendMail__close" onClick={() => dispatch(closeSendMessage())}/>
            </div>

            <form className="sendMail__form" onSubmit={handleSubmit(onSubmit)}>
                <input 
                    type="email" 
                    placeholder='To' 
                    {...register('to', { required: true })}
                />
                {errors.to && <p className='sendMail__error'>Receiver emaiID is required</p>}

                <input 
                    type="text" 
                    placeholder='Subject' 
                    {...register('subject', { required: true })} 
                />
                {errors.subject && <p className='sendMail__error'>Subject of the email is required</p>}
                
                <input 
                    className="sendMail__message" 
                    type="text" 
                    placeholder='Messsage...' 
                    {...register('message', { required: true })}
                />
                {errors.message && <p className='sendMail__error'>Message is required</p>}

                <div className="sendMail__options">
                    <Button
                        className="sendMail__send"
                        variant='contained'
                        color='primary'
                        type='submit'
                        >
                        Send
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail