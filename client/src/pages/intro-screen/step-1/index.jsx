import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import {Block} from "../../../components/block";
import {GridWrapper} from "../../../components/grid-wrapper";
import {GridCell} from "../../../components/grid-wrapper/grid-cell";
import {ImageLoader} from "../../../components/image-loader";
import {Button} from "../../../components/button";
import {getImage} from "../../../assets";
import {TextInput} from "../../../components/text-input";
import {fetchClientName} from "../../../__data__/actions";


const style = {
    gridTemplateColumns: '30% 70%',
    gridTemplateRows: '80% 20%'
}

const Step1 = ({next, setFlag}) => {
    const [name, setName] = useState('')
    const dispatch = useDispatch()
    const submitName = () => {
        setFlag(false)
        setTimeout(()=>{
            dispatch(fetchClientName(name))
            next()
        }, 1000)
    }

    return(
        <GridWrapper style={style}>
            <GridCell style={{gridRowStart: 1, gridRowEnd: 3}}>
                <Block>
                    <ImageLoader image={getImage('kurisu_smile')}/>
                </Block>
            </GridCell>
            <Block title={'Привет, ты новенький?'} description={`Сейчас у нас урок химии и мы перходим в лабораторию. Будет очень интересно! Представься классу, чтобы приступить к занятию.`}>
                <TextInput placeholder='Как тебя зовут?' size='md' state={name} setState={setName}></TextInput>
            </Block>
            <Button handler={submitName} title={'Продолжить'}/>
        </GridWrapper>
    )
}

export default Step1