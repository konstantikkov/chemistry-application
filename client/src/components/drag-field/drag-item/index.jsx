import React, { useState } from 'react'
import Draggable from 'react-draggable';
import './index.css'

import DragFlask from "../drag-flask";

export const DragItem = ({ id, title, type, properties, select, deselect, setMouse, setDragValue, drag, isSelected }) => {
    const [visible, setVisible] = useState(true)
    if(isSelected && visible){
        setVisible(false)
    }
    if(!isSelected && !visible){
        setVisible(true)
    }
    console.log(properties)
    return(
        <Draggable
            onStart={() => {
                select(true)
                setDragValue(id)
                setVisible(true)
        }}
            onStop={() =>{
                select(false)
                setVisible(false)
        }}
        >
            <div className='DragItem Block' onTouchMove={(event) => {
                console.log(event)
                if(drag === id){
                    setMouse(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
                }
            }}
                 onMouseMove={(event) => {
                console.log(event)
                if(drag === id){
                    setMouse(event.clientX, event.clientY)
                }
            }}>
                <div className='DragItemTitle'>{title}</div>
                {
                    visible && <DragFlask props={{type_:type, color: properties.color, opacity: properties.opacity}} />
                }
            </div>
        </Draggable>
    )
}

// import React, { useState } from 'react'
// import Scene from "../../workspace-flask";
// import {Block} from "../../block";
//
// export const DragItem = ({title, }) => {
//     const [visible, setVisible] = useState(false)
//
//     return(
//         <div draggable="true" on onDragStart={()=>{setVisible(true)}} onDragEnd={()=>setVisible(false)}>
//             <div>говно</div>
//             {
//                 visible&&                 <Scene props={{
//                     layers: [
//                         {
//                             color: 0xffffff,
//                             opacity: 0.6
//                         },
//                         {
//                             color: 0x0000FF,
//                             opacity: 0.7
//                         },
//                         {
//                             color: 0xffffff,
//                             opacity: 0.6
//                         }
//                     ]
//                 }}/>
//             }
//         </div>
//     )
// }