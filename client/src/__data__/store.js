import { createStore as createReduxStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import thunkMiddleware from 'redux-thunk'

import * as appReducers from './reducers'

export const createReducer = (reducers= {}) => combineReducers({
    form: formReducer,
    ...reducers,
    ...appReducers
})

export const createStore = () => {
    const reducer = createReducer()
    const composedEnhancer = compose(
        applyMiddleware(thunkMiddleware)
    )
    return createReduxStore(reducer, composedEnhancer)
}
export default createStore()