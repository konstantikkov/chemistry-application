import * as types from '../action-types'
import {nextLevel} from "../../levels";

const defaultState = {
    stage: localStorage.getItem('clientName')?1:0,
    clientName: localStorage.getItem('clientName')??'',
    level_num: 1,
    gameEnd: false,
    mode: -1,
    time: 0,
    taskNum: 0,
    level: {},
    answer: {},
    statistic: JSON.parse(localStorage.getItem('statistic'))??{
        score: 0,
        success: 0,
        error: 0,
        last: 0
    }
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.SET_CLIENT_NAME:
            return {
                ...state,
                clientName: action.clientName
            }
        case types.SET_ANSWER:
            return {
                ...state,
                answer: action.answer
            }
        case types.SET_GAME_END:
            return {
                ...state,
                gameEnd: !state.gameEnd
            }
        case types.SET_STAGE:
            return {
                ...state,
                stage: action.stage
            }
        case types.SET_MODE:
            return {
                ...state,
                mode: action.mode,
                time: action.time,
                taskNum: action.taskNum
            }
        case types.SET_STATISTIC:
            return {
                ...state,
                statistic: action.statistic
            }
        case types.SET_LEVEL:
                return {
                    ...state,
                    level: action.level,
                    level_num: action.level_num
                }
        case types.SET_PREV_STAGE:
            return {
                ...state,
                stage: state.stage - 1
            }
        case types.SET_NEXT_STAGE:
            return {
                ...state,
                stage: state.stage + 1
            }
        case types.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        default:
            return state
    }
}