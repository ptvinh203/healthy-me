import apiClient from "./apiClient"

const recommendService = {
    recommend: async () => {
        return await apiClient.get('/item/recommend')
    },
}

export default recommendService