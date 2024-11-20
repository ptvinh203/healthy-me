import apiClient from "./apiClient";

const restaurantOrderService = {
    getOrders: async (params) => {
        const { page = 0, size = 10, status, fromDate, toDate } = params;
        
        const queryParams = new URLSearchParams();
        queryParams.append('page', page);
        queryParams.append('size', size);
        
        if (status) {
            queryParams.append('status', status);
        }
        if (fromDate) {
            queryParams.append('fromDate', fromDate);
        }
        if (toDate) {
            queryParams.append('toDate', toDate);
        }

        return await apiClient.get(`/v1/restaurant/orders?${queryParams.toString()}`);
    },

    updateOrderStatus: async (orderId, status) => {
        return await apiClient.put(`/v1/restaurant/orders/${orderId}/status`, { status });
    }
};

export default restaurantOrderService; 