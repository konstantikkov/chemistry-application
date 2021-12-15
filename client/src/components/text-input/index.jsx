import React from 'react'
import './index.css'

export const TextInput = ({placeholder, state, setState, size}) => {
    const handler = (event) => setState(event.target.value)

    return(
        <input
            className={`TextInput ${size}`}
            placeholder={placeholder}
            value={state}
            onChange={handler}
        />
    )
}
