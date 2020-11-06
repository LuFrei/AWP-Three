import {createStore, applyMiddleware, combineReducers} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

//TYPE

//ACTIONS

//initialState
const initialState = {
  objects: []
}

//REDUCER
const reducer = (state = initialState, action) => {
  switch(action.type){
    default:
      return state;
  }
}

//STORE
export default createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))