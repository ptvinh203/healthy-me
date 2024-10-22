import apiClient from './apiClient';

const customerService = {
  getCustomerInfo: async (id) => {
    try {
      const response = await apiClient.get(`/v1/customer?id=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching customer info:', error);
      throw error;
    }
  },

  updateHealthGoal: async (id, healthGoal) => {
    try {
      const response = await apiClient.put(`/v1/customer/${id}/health-goal`, { healthGoal });
      return response.data;
    } catch (error) {
      console.error('Error updating health goal:', error);
      throw error;
    }
  },
};

export default customerService;

