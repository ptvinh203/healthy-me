import apiClient from "./apiClient";

const orderService = {
    placeOrder: async (order) => {
        return await apiClient.post("/order", order)
    },
}

export default orderService