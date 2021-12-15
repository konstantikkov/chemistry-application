import React, { useState, useEffect, useRef } from 'react'
import './index.css'

export const DropField = ({mouse, setHoverFlag, drag, children}) => {
    const ref = useRef();
    const [rect, setRect] = useState()
    const [flag, setFlag] = useState(false)
    useEffect(() => {
        setRect(ref.current.getBoundingClientRect())
    }, [drag])

    const hover = () => {
        setHoverFlag(true)
        setFlag(true)
    }
    const outHover = () => {
        setHoverFlag(false)
        setFlag(false)
    }
    useEffect(() => {
        if(drag){
            if( mouse?.x < rect?.right
                && mouse?.x > rect?.left
                && mouse?.y > rect?.top
                && mouse?.y < rect?.bottom){
                console.log(33333)
                hover()
            }
            else{
                outHover(mouse)
                console.log(22222222)
            }
        }
    }, [drag, mouse])

    return(<div className='DropField' ref={ref}>
        {children}
    </div>)
}