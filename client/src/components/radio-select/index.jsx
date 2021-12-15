import React, { useState, useCallback } from 'react'
import {Radio} from "./radio";


export const RadioSelect = ({options, selectedOption, setSelectedOption}) => {
    const selectOption = useCallback((key) => {
        setSelectedOption(key)
    },[])

    return(
        <div className='RadioSelect'>
            {
                options.map((option, key) =>
                    <Radio key={key} value={key} isSelected={key === selectedOption} selectOption={selectOption} option={option}/>
                )
            }
    </div>)
}