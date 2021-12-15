import React from 'react'
import './index.css'

export const TimeInput = ({placeholder, state, setState, size}) => {
    const handler = (event) => setState(event.target.value)

    return(
        <input
            className={`TimeInput ${size}`}
            placeholder={placeholder}
            step={60}
            type='time'
            value={state}
            onChange={handler}
        />
    )
}
