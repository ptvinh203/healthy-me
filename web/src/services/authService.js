import { saveTokensToStorage } from "../utils/storageUtils"
import apiClient from "./apiClient"

const authService = {
    login: async credentials => {
        try {
            const response = await apiClient.post('/auth/login', credentials)
            if (response.is_success) {
                saveTokensToStorage(response.data.access_token) // Save the token to local storage
                return response
            }
        } catch (error) {
            console.log(error)
        }
    },

    getAccountInfo: async () => apiClient.get('/auth/me')
}

export default authService