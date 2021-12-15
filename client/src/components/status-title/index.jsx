import React from 'react'
import './index.css'

import {IconLoader} from "../icons";

const style = {
    marginLeft: '12px'
}

export const StatusTitle = ({level, title}) =>
    <div className='StatusTitle'>
        <IconLoader size='md' icon={level=='error'?'cross':'checkmark'}/>
        <h1 style={style} className={level=='error'?'Error':'Success'}>{title}</h1>
    </div>