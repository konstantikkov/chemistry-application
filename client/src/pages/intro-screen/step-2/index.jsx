import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Block} from "../../../components/block";
import {GridWrapper} from "../../../components/grid-wrapper";
import {GridCell} from "../../../components/grid-wrapper/grid-cell";
import {ImageLoader} from "../../../components/image-loader";
import {Button} from "../../../components/button";
import {getImage} from "../../../assets";
import {getClientName} from "../../../__data__/selectors";
import {RadioSelect} from "../../../components/radio-select";
import {Title} from "../../../components/title";
import {NumberInput} from "../../../components/number-input";
import {FlexWrapper} from "../../../components/flex-wrapper";
import {TimeInput} from "../../../components/time-input";
import {fetchMode, fetchStatistic} from "../../../__data__/actions";
import './index.css'


const style = {
    gridTemplateColumns: '30% 70%',
    gridTemplateRows: '80% 20%'
}

export const Step2 = ({next, setFlag}) => {
    const dispatch = useDispatch()

    const clientName = useSelector(getClientName)

    const [mode, setMode] = useState(0)
    const [time, setTime] = useState('00:10')
    const [taskNumber, setTaskNumber] = useState(10)



    const handler = () => {
        setFlag(false)
        const time_ = Number(time.substr(0, 2)) * 3600 + Number(time.substr(3, 2)) * 60
        console.log(mode, time_, taskNumber)
        dispatch(fetchMode(mode, time_, Number(taskNumber)))
        dispatch(fetchStatistic({"score":0,"success":0,"error":0,"last":0}))
        setTimeout(()=>{
            next()
        }, 1000)
    }

    const options =
        [
            [
                <div>Ограничение по времени</div>,
                <TimeInput state={time} setState={setTime}/>
            ],
            [
                <div>Ограничение по количеству заданий</div>,
                <NumberInput state={taskNumber} setState={setTaskNumber}/>
            ],
            <div>Бесконечный режим игры</div>
        ]

    return(
        <React.Fragment>
            <GridWrapper style={style}>
                <GridCell style={{gridRowStart: 1, gridRowEnd: 3}}>
                    <Block>
                        <ImageLoader image={getImage('kurisu_smile')}/>
                    </Block>
                </GridCell>
                <Block title={`А вот и лабратория, ${clientName}!`} description={`Ну что же, сегодня у нас урок по эксперементам с неорганической химией! Вы ее все уже знаете, так что надеюсь, вы не спалите школу:)
             Кто может нам продемонстрировать, как протекают реакции на доске? О может ${clientName} сейчас покажет?`}>
                    <Title value={'Выберите режим игры:'} size='lg'/>
                    <RadioSelect selectedOption={mode} setSelectedOption={setMode} options={options} />
                </Block>
                <Button title={'Начать'} handler={handler}/>
            </GridWrapper>
        </React.Fragment>
    )
}

