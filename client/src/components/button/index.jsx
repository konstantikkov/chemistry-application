import React from 'react'
import './index.css'

export const Button = ({title, handler, level, size='lg'}) => <div onClick={handler} className={`Button ${level}`}><div className={`Title ${size}`}>{title}</div></div>
