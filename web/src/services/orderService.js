import apiClient from "./apiClient";

const orderService = {
    placeOrder: async (order) => {
        return await apiClient.post("/order", order)
    },

    getHistory: async () => {
        return await apiClient.get("/order")
    }
}

export default orderService