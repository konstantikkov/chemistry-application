import React from 'react'
import './index.css'

export const TaskCounter = ({current, total}) => <div className='TaskCounter'>{`${current} / ${total}`}</div>
