import React from 'react'
import './index.css'

export const Title = ({value, size='sm', level}) => <div className={`Title ${size} ${level}`}>{value}</div>