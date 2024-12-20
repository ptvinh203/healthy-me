import apiClient from "./apiClient"

const itemService = {
    getItemById: async itemId => {
        return await apiClient.get(`/item/${itemId}`)
    },
    getLowCalorieItems: async () => {
        return await apiClient.get(`/item/landing`)
    },
    getItemByNameOrIngredients: async (keyword) => {
        return await apiClient.get(`/item/search`, {
            params: { keyword }
        })
    },
    getItemByTypeAndRestaurant: async (type) => {
        return await apiClient.get(`/item/listFood`, {
            params: { type },
        });
    },
}

export default itemService