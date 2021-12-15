import React from 'react'
import './index.css'

export const Block = ({title, description, children, isFlex, shake, mode}) => {
    return(
        <div className={`Block ${shake?'Shake':''} ${mode?'Toxic':'Fire'}`} style={isFlex?{display: 'flex'}:{}}>
            {
                title&&<h1>{title}</h1>
            }
            {
                description&&<p>{description}</p>
            }
            {
                children
            }
        </div>
    )
}