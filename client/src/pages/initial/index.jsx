import React, {useState, useEffect} from 'react'
import './index.css'

const RandomInterval = () => {
    const randomMs = 150 * Math.random()
    return randomMs < 50 ? 10 : randomMs
}


export const Initial = () => {
    const text_ = 'made by konstantikkov'
    const [text, setText] = useState('')
    useEffect(async ()=>{
        if(text.length < text_.length)
            await setTimeout(()=>setText(prev => prev + text_[prev.length]),RandomInterval())
    }, [text])
    return(
        <div className='InitialScreen'>
            <div className='KurisuGroup'>
                <div className='Kurisu'>

                </div>
                <div className='CodeBack'>
                    <div className='MyName'>
                        <span className='Cursor'>> </span>
                        {text}
                        <span className='BlinkingCursor'>_</span>
                    </div>
                </div>
            </div>
        </div>)
}
