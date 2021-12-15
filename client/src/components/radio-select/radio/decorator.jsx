import React from 'react'
import './decorator.css'


export const RadioDecorator = ({isSelected}) =>
    <div className='RadioDecoratorOuter'>
        <div className={`RadioDecorator RadioDecorator${isSelected? 'Selected': 'NonSelected'}`}>
        </div>
    </div>