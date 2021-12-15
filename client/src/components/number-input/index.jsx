import React from 'react'
import './index.css'

export const NumberInput = ({placeholder, state, setState, size}) => {
    const handler = (event) => setState(event.target.value)

    return(
        <input
            type='number'
            className={`NumberInput ${size}`}
            placeholder={placeholder}
            value={state}
            onChange={handler}
        />
    )
}
