import { saveTokensToStorage } from "../utils/storageUtils"
import apiClient from "./apiClient"

const authService = {
    login: async credentials => {
        const response = await apiClient.post('/auth/login', credentials)
        if (response.is_success) {
            saveTokensToStorage(response.data.access_token) // Save the token to local storage
            return response
        }
    },

    register: async credentials => {
        const response = await apiClient.post("/auth/register", credentials)
        if (response.is_success) {
            return response
        }
        else {
            throw new Error("Đăng kí thất bại")
        }
    },

    registerRestaurant: async credentials => {
        const response = await apiClient.post("/auth/register-restaurant", credentials)
        if (response.is_success) {
            return response
        }
        else {
            throw new Error("Đăng kí thất bại")
        }
    },

    getAccountInfo: async () => apiClient.get('/auth/me')




}

export default authService