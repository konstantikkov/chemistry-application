import React, { useEffect, useRef } from 'react'
import './index.css'

export const Timer = ({ time, setTime, interval = 1000, handler = () => {}}) => {
    const timerRef = useRef(null)
    useEffect(() => {
        console.log(123)
        timerRef.current = setInterval(()=>{
            setTime(prev => prev - 1)
        }, interval)
    }, [])

    useEffect(()=>{
        if(time === 0){
            console.log('clear')
            clearInterval(timerRef.current)
            handler()
        }
    }, [time])

    return(
        <div className='Timer'>
            {`${Math.floor((time / 3600) % 60)} : ${Math.floor((time / 60) % 60)} : ${Math.floor(time % 60)}`}
        </div>
    )
}