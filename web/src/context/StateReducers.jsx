import { ReducerCases } from "../constants/ReducerCases"

export const initialState = {
    account: undefined,
    profile: undefined
}

const reducer = (state, action) => {
    switch (action.type) {
        case ReducerCases.SET_ACCOUNT_INFO:
            return {
                ...state,
                account: action.data
            }
        case ReducerCases.SET_PROFILE:
            return {
                ...state,
                profile: action.data
            }
    }
}

export default reducer;