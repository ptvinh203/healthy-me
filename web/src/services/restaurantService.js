import apiClient from "./apiClient"

const restaurantService = {
    getWaitingList: async () => {
        try {
            const data = await apiClient.get("/restaurant/waitings");
            return data;
        } catch (error) {
            console.log("error while fetching waiting list", error);
            throw new error;
        }
    },
    approve: async (id) => {
        try {
            const data = await apiClient.put(`/restaurant/approve?id=${id}`);
            return data;
        } catch (error) {
            console.log("error while fetching waiting list", error);
            throw new error;
        }
    },
    reject: async (id) => {
        try {
            const data = await apiClient.put(`/restaurant/reject?id=${id}`)
            return data;
        } catch (error) {
            console.log("error while fetching waiting list", error);
            throw new error;
        }
    },
    addMeal: async credentials => {
        const response = await apiClient.post("/item/add", credentials)
        if (response.is_success) {
            return response
        }
        else {
            throw new Error("Thêm món thất bại")
        }
    },
    uploadMealPicture: async credentials => {
        const response = await apiClient.post("/item/uploadImage", credentials)
        if (response.is_success) {
            return response
        }
        else {
            throw new Error("Tải ảnh lên thất bại")
        }
    },
}
export default restaurantService;