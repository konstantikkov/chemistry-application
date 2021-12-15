import React from 'react'
import './index.css'
import {Title} from "../title";

export const Task = ({title, items}) => {
    return(
        <div className='Task'>
            <Title value={title} size='lg'/>
            {
                items.map(item => <div className='TaskItem'><Title value={item} size='lg'/></div>)
            }
        </div>
    )
}