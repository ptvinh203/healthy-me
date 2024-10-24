import apiClient from "./apiClient"

const itemService = {
    getItemById: async itemId => {
        return await apiClient.get(`/item/${itemId}`)
    },
    getLowCalorieItems: async () => {
        return await apiClient.get(`/item/landing`)
    }
}

export default itemService