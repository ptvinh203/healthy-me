import apiClient from './apiClient'

const uploadCertificateService = {

    uploadCertificate: async credentials => {
        try {
            const response = await apiClient.post('/auth/uploadCertificate', credentials, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            console.log(response)
            if (response.is_success) {
                return response
            }
        } catch (error) {
            console.error('Error uploading certificate:', error);
            throw error;
        }


    },
}
export default uploadCertificateService;