import apiClient from "./apiClient"

const shoppingCartService = {
    getShoppingCarts: async () => {
        return await apiClient.get("/cart")
    },
    addShoppingCart: async (cart) => {
        return await apiClient.post("/cart", cart)
    },
    deleteShoppingCart: async (id) => {
        return await apiClient.delete(`/cart/${id}`)
    },
    updateShoppingCart: async (id, cart) => {
        return await apiClient.patch(`/cart/${id}`, cart)
    },
    getShoppingCartById: async (id) => {
        return await apiClient.get(`/cart/${id}`)
    }
}

export default shoppingCartService