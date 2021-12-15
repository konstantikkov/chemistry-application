import React, { useState, useEffect } from 'react'
import {RadioDecorator} from "./decorator";
import {RadioValue} from "./value";
import './index.css'

export const Radio = ({value, isSelected, selectOption, option }) =>
        <div className='Radio' onClick={() => selectOption(value)}>
            <RadioDecorator isSelected={isSelected}/>
            <RadioValue>
                {option}
            </RadioValue>
        </div>