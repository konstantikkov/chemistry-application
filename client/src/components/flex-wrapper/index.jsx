import React from 'react'
import './index.css'

export const FlexWrapper = ({children, direction}) => {
    return(<div className={`FlexWrapper${direction??'Horizontal'}`}>
        {
            children
        }
    </div>)
}