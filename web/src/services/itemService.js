import apiClient from "./apiClient"

const itemService = {
    getItemById: async itemId => {
        return await apiClient.get(`/item/${itemId}`)
    },
}

export default itemService