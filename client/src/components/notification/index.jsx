import React, {useEffect} from 'react'
import './index.css'

export const Notification = ({text, mode, setAlert}) => {
    useEffect(()=>{
        setTimeout(()=>{
            setAlert(-1)
        }, 5000)
    },[])
    return(
        <div className='Notification'>
            <div className={`Notification${mode}`} />
            <div className='NotificationText'>
                {text}
            </div>
        </div>
    )
}
