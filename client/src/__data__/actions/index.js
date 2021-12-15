import {
    SET_CLIENT_NAME,
    SET_PREV_STAGE,
    SET_NEXT_STAGE,
    SET_STATUS,
    SET_STATISTIC,
    SET_LEVEL,
    SET_ANSWER,
    SET_MODE,
    SET_GAME_END,
    SET_STAGE
} from '../action-types'

export const fetchClientName = (name) => {
    const data = localStorage.getItem('clientName')
    localStorage.setItem('clientName',name ?? "")
    return {type: SET_CLIENT_NAME, clientName: data?.clientName ?? name}
}

export const fetchGameEnd = () => {
    return {type: SET_GAME_END}
}

export const fetchMode = (mode, time, taskNum) =>{
    return({type: SET_MODE, mode, time, taskNum})
}

export const fetchAnswer = (answer) => {
    return({type: SET_ANSWER, answer: answer})
}

export const setLevel = (level, level_num) => {
    return ({type: SET_LEVEL, level: level, level_num: level_num})
}

export const fetchStatus = (status) => {
    return {type: SET_STATUS, status: status}
}

export const fetchStatistic = (statistic) => {
    localStorage.setItem('statistic', JSON.stringify(statistic))
    return {type: SET_STATISTIC, statistic: statistic}
}

export const setStage = (stage) => {
    return ({type: SET_STAGE, stage: stage})
}

export const nextStage = () => {
    return ({type: SET_NEXT_STAGE})
}

export const prevStage = () => {
    return ({type: SET_PREV_STAGE})
}