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
    updateHealthGoal: async (accountId, healthGoal) => {
        try {
            const response = await apiClient.put(`/customer/${accountId}/health-goal`, { healthGoal })
            return response.data
        } catch (error) {
            console.error('Error updating health goal:', error)
            throw error;
        }
    },
    updateActivityIndex: async (accountId, activityIndex) => {
        try {
            const response = await apiClient.put(`/customer/${accountId}/activity-index/${activityIndex}`)
            return response.data
        } catch (error) {
            console.error('Error updating activity index:', error)
            throw error
        }
    },
    getCustomerAddress: async () => {
        try {
            const response = await apiClient.get(`/customer/address`)
            return response.data
        } catch (error) {
            console.error('Error updating activity index:', error)
            throw error
        }
    },
    updateCustomerAddress: async (customerAddress) => {
        try {
            const response = await apiClient.put('/customer/address', customerAddress)
            return response.data
        } catch (error) {
            console.error('Error updating customer address:', error)
        }
    }
};

export default customerService;

