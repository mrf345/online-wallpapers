import { applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Shuffle } from './functions/core'

const initialState = {
    backgrounds: [],
    after: '',
    background: undefined,
    index: -1,
    error: false,
    fetching: undefined,
    store: [],
    categories: ['EarthPorn', 'SpacePorn', 'Wallpapers', 'ExposurePorn',
    'SkyPorn', 'FractalPorn', 'ImaginaryTechnology',
    'BridgePorn'],
    refetch: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCHING':
            return {
                ...state,
                fetching: true
            }
        case 'FETCH_ERROR':
            return {
                ...state,
                error: true
            }
        case 'FETCH_SUCCESS':
            return {
                ...state,
                fetching: false,
                error: false,
                backgrounds: action.payload,
                after: action.payload.after
            }
        case 'NEXT_WALL':
            let nextIndex = state.index + 1
            let previousStore = state.store
            let toCheck = state.backgrounds[state.index]
            if (toCheck) previousStore.push(toCheck.data.url)
            let toAdd = action.payload ? { 
                background: state.backgrounds[nextIndex].data.url,
                store: previousStore
            } : {}
            return {
                ...state,
                index: nextIndex,
                fetching: true,
                ...toAdd
            }
        case 'PREVIOUS_WALL':
            let store = state.store
            let previousImage = state.backgrounds.length > 1 ? store.pop() : store[0]
            return {
                ...state,
                background: previousImage,
                store: store
            }
        case 'STOP_FETCHING':
            return {
                ...state,
                fetching: false
            }
        case 'END_STUCK':
            return {
                ...state,
                fetching: true,
                index: -1,
                backgrounds: []
            }
        case 'UPDATE_CATEGORIES':
            return {
                ...state,
                categories: Shuffle(action.payload),
                refetch: true
            }
        case 'END_REFETCH':
            return {
                ...state,
                refetch: false
            }
        default:
            return state
    }
}

const middleWear = applyMiddleware(thunk, logger)
const store = createStore(reducer, middleWear)

export default store