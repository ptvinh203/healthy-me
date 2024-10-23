import apiClient from './apiClient';

const customerService = {
    getCustomerInfo: async (accountId) => {
        try {
            const response = await apiClient.get(`/customer/${accountId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching customer info:', error);
        }
    },

    updateHealthGoal: async (id, healthGoal) => {
        try {
            const response = await apiClient.put(`/customer/${id}/health-goal`, { healthGoal });
            return response.data;
        } catch (error) {
            console.error('Error updating health goal:', error);
            throw error;
        }
    },
};

export default customerService;

