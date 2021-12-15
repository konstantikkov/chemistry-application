import React, { useState, useEffect } from 'react'
import {CSSTransition} from "react-transition-group";

import { connect, useDispatch } from 'react-redux'
import Step1 from './intro-screen/step-1'
import { Step2 } from './intro-screen/step-2'
import {MainContainer} from "../components/main-container";
import {Background} from "../components/background";
import {fetchGameEnd, fetchMode, nextStage, prevStage, setLevel, setStage} from "../__data__/actions";
import {StatusScreen} from "./status-screen";
import LevelScreen from "./level-screen";
import {Notification} from "../components/notification";
import {nextLevel} from "../levels";
import {Timer} from "../components/timer";
import {TaskCounter} from "../components/task-counter";


const Workflow = ({stage, prev, next, status, level_prev, mode, time_, taskNum_, gameEnd}) => {
    const [refresh, setRefresh] = useState(false)
    const [flag, setFlag] = useState(false)
    const [background, setBackground] = useState('Intro')
    const [alert, setAlert] = useState(false)

    const [time, setTime] = useState(0)
    const [taskNum, setTaskNum] = useState(0)

    const dispatch = useDispatch()
    const stages =
        [
            <Step1 next={next} setFlag={setFlag}/>,
            <Step2 next={next} setFlag={setFlag}/>,
            <LevelScreen setFlag={setFlag} next={next}/>,
            <StatusScreen prev={prev} setFlag={setFlag}/>
        ]

    useEffect(()=>{
        const {level, level_num} = nextLevel(level_prev)
        dispatch(setLevel(level, level_num))
    }, [])

    useEffect(() => {
        if(stage === 2){
            const {level, level_num} = nextLevel(level_prev)
            dispatch(setLevel(level, level_num))
        }
        setFlag(true)

        if(stage === 1){
            setBackground('Work')
        }

        if(mode === 1 && stage === 3){
            setTaskNum(prev => prev + 1)
        }

        setAlert(stage)
    }, [stage, refresh])


    useEffect(() => {
        if(mode === 0){
            setTime(time_)
        }
    }, [mode])

    useEffect(() => {
        if(!gameEnd){
            setTaskNum(0)
            setTime(0)
            dispatch(fetchMode(-1, 0,0))
        }
    }, [gameEnd])

    useEffect(()=>{

        if(mode === 1 && taskNum === taskNum_){
            dispatch(fetchGameEnd())
        }
        else if(mode === 0 && time===0){
            dispatch(fetchGameEnd())
            setFlag(false)
            setTimeout(()=>{
                if(stage === 3){
                    setRefresh(!refresh)
                }
                else{
                    dispatch(setStage(3))
                }
            }, 1000)
        }
    }, [time, taskNum])

    return(
            <Background theme={background}>
                <CSSTransition
                    in={flag}
                    unmountOnExit
                    timeout={1000}
                    classNames={'MainContainer'}
                >
                    <MainContainer>
                        {stages[stage]}
                    </MainContainer>
                </CSSTransition>
                <CSSTransition
                    in={alert===2}
                    unmountOnExit
                    timeout={1000}
                    classNames={'Notification'}
                >
                    <Notification
                        mode='Info'
                        text='Перетащите элементы в пробирках в поле "результат". Чтобы узнать результат - нажмите кнопку "Перемешать".'
                        setAlert={setAlert}
                    />
                </CSSTransition>
                <CSSTransition
                    in={alert===3 && status ==='error'}
                    unmountOnExit
                    timeout={1000}
                    classNames={'Notification'}
                >
                    <Notification
                        mode='Question'
                        text='Вы получили не тот результат или смешали элементы, которые вызывают опасную реакцию'
                        setAlert={setAlert}
                    />
                </CSSTransition>
                <CSSTransition
                    in={alert===3 && status !=='error'}
                    unmountOnExit
                    timeout={1000}
                    classNames={'Notification'}
                >
                    <Notification
                        mode='Info'
                        text='Отлично! Ты молодец!'
                        setAlert={setAlert}
                    />
                </CSSTransition>
                {(mode === 0 && (stage === 2 || stage === 3) && !gameEnd) && <Timer time={time} setTime={setTime}/>}
                {(mode === 1 && (stage === 2 ||stage === 3) && !gameEnd) && <TaskCounter current={taskNum} total={taskNum_}/>}
            </Background>
    )
}


const mapStateToProps = (state, props) => ({
    clientId: state.default?.clientId,
    clientName: state.default?.clientName,
    stage: state.default.stage,
    status: state.default.status,
    time_: state.default.time,
    taskNum_: state.default.taskNum,
    level_prev: state.default.level_num,
    mode: state.default.mode,
    gameEnd: state.default.gameEnd
})

const mapDispatchToProps = (dispatch) => ({
    next: () => dispatch(nextStage()),
    prev: () => dispatch(prevStage())
})

export default connect(mapStateToProps, mapDispatchToProps)(Workflow)