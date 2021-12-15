import React, {useState, useCallback, useEffect} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {GridWrapper} from "../../components/grid-wrapper";
import {GridCell} from "../../components/grid-wrapper/grid-cell";
import {Block} from "../../components/block";
import {Button} from "../../components/button";
import Scene from "../../components/workspace-flask";
import {DragField} from "../../components/drag-field";
import {DropField} from "../../components/drag-field/drop-field";
import {Task} from "../../components/task";
import {fetchAnswer, fetchStatistic, fetchStatus} from "../../__data__/actions";
import {getLevel, getStatistic} from "../../__data__/selectors";

import './index.css'

const style = {
    gridTemplateColumns: '60% 40%',
    gridTemplateRows: '15% 70% 15%'
}

const LevelScreen = ({ status, score, level, setFlag, next, statistic }) => {
    const dispatch = useDispatch()
    const [bottle, setBottle] = useState({})
    const [error, setError_] = useState(false)
    const [hover, setHover] = useState(false)
    const [drag, setDrag] = useState(false)
    const [dragValue, setDragValue] = useState(false)
    const [mouse, setMouse_] = useState({x: 0, y: 0})
    const setMouse = useCallback((x , y) => {
            setMouse_({x, y})
    },[])
    console.log(bottle)

    const setError = () => {
        setFlag(false)
        setTimeout(()=>{
            dispatch(fetchStatus('error'))
            statistic.error++
            statistic.score+=level.pointsFail
            statistic.last = level.pointsFail
            localStorage.setItem('statistic', JSON.stringify(statistic))
            dispatch(fetchStatistic(statistic))
            next()
        },1000)
    }

    const setSuccess = () => {
        setFlag(false)
        setTimeout(()=>{
            dispatch(fetchStatus('success'))
            localStorage.setItem('statistic', JSON.stringify(statistic))
            statistic.success++
            statistic.last = level.pointsSuccess
            statistic.score+=level.pointsSuccess
            dispatch(fetchStatistic(statistic))
            next()
        },1000)
    }

    const mixHandler = () => {
        if(!error){
            dispatch(fetchAnswer(bottle))
            let flag = true
            if(level.success.length === Object.keys(bottle).length){
                level.success.forEach((item)=>{
                    if(!bottle[item]){
                        flag = false
                    }
                })
            }
            else{
                flag=false
            }
            if(flag){
                setSuccess()
            }
            else{
                setError()
            }
        }
    }

    useEffect(() => {
        level.errors.forEach((error) => {
            let flag = true
            for(let i = 0; i < error.length; i++){
                if(!bottle[error[i]]){
                    flag = false
                    break;
                }
            }
            if(flag){
                setError_(true)
                setTimeout(()=>{
                    setError()
                }, 3000)
            }
        })
    },[bottle])

    useEffect(()=>{
        console.log(hover, dragValue)
        if(!drag && !error){
            if(hover){
                if(dragValue && !bottle[dragValue]){
                    setBottle({...bottle, [dragValue]: level.components[dragValue]})
                    setDragValue(false)
                }
            }
            else if(!drag && dragValue){
                let temp = Object.assign({}, bottle)
                delete temp[dragValue]
                setBottle(temp)
                setDragValue(false)
            }
        }
    }, [drag])

    const deselect = useCallback(()=>{
        setDrag(false)
    }, [])

    return(
        <GridWrapper style={style}>
            <GridCell style={{gridColumnStart: 1, gridColumnEnd: 3}}>
                <Block isFlex={true}>
                    <Task title={level.task.title} items={level.task.items}/>
                </Block>
            </GridCell>
            <Block title='Компоненты'>
                <DragField
                    bottle={bottle}
                    setMouse={setMouse}
                    select={setDrag}
                    setDragValue={setDragValue}
                    deselect={deselect}
                    drag={dragValue}
                    items={level.components}/>
            </Block>
            <GridCell style={{gridRowStart: 2, gridRowEnd: 4, gridColumnStart: 2}}>
                <Block title='Результат' shake={error}>
                    <DropField mouse={mouse} drag={drag} setHoverFlag={setHover} >
                        <Scene
                            props={{
                                layers: Object.values(bottle)
                            }}/>
                    </DropField>
                </Block>
            </GridCell>
            <Button title='Перемешать' handler={mixHandler}/>
        </GridWrapper>
    )
}

const mapStateToProps = (state, props) => {
    console.log(state)
    return({
        level: getLevel(state),
        statistic: getStatistic(state)
    })
}


export default connect(mapStateToProps)(LevelScreen)