import {
    REQUEST_TEAM_DATA,
    RESPONSE_TEAM_DATA,
    REQUEST_TEAM_DATA_FAILURE,
} from 'actions/teamActions'

const STATE_NOT_REQUESTED = 'STATE_NOT_REQUESTED'
const STATE_LOADING = 'STATE_LOADING'
const STATE_READY = 'STATE_READY'

const initialState = {
    dataState: STATE_NOT_REQUESTED,
    data: [],
}

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
    case REQUEST_TEAM_DATA:
        return Object.assign(
            {},
            state,
            {
                dataState: STATE_LOADING,
                data: [],
            }
        )
    case RESPONSE_TEAM_DATA:
        return Object.assign(
            {},
            state,
            {
                dataState: STATE_READY,
                data: action.data,
            }
        )
    case REQUEST_TEAM_DATA_FAILURE:
        return Object.assign(
            {},
            state,
            {
                dataState: STATE_READY,
                data: [],
            }
        )
    default:
        return state
    }
}

export default teamReducer
