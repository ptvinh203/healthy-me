/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const account = getAccountFromSession()

    // useEffect(() => {
    //     if (account && state.account) return
    //     if (account) {
    //         dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data: account })
    //         return
    //     }

    //     const getAccountViaToken = async () => {
    //         try {
    //             const response = await authService.getAccountInfo()
    //             if (response.is_success) {
    //                 dispatch({ type: ReducerCases.SET_ACCOUNT_INFO, data: response.data })
    //                 setAccountToSession(response.data) // Save account to session storage
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     // Check if user is logged in
    //     const token = getTokensFromStorage()
    //     if (token) {
    //         getAccountViaToken()
    //         return
    //     }

    //     // Login user role: TODO
    //     authService.login({ email: 'customer@gmail.com', password: '123456Aa' })
    //         .then(() => {
    //             getAccountViaToken()
    //         })
    // }, [account, state, dispatch])

    return (
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext)