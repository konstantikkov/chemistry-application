import React from 'react'
import {DragItem} from "./drag-item";
import './index.css'

export const DragField = ({items, select, deselect, setMouse, setDragValue, drag, bottle}) => {
    console.log(items)
    return(
        <div className='DragField'>
            {
                Object.entries(items).map(item => <DragItem drag={drag} id={item[0]} isSelected={bottle[item[0]]} setDragValue={setDragValue} setMouse={setMouse} select={select} deselect={deselect} title={item[1].title} type={item[1].type} properties={item[1].properties}/>)
            }
        </div>
    )
}