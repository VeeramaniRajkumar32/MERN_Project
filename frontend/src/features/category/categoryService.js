import axios from 'axios';

const API_URL = 'api/category/'

const createCategory = async (categoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }

    const response = await axios.post(API_URL, { text: categoryData }, config);
    console.log(response);
    return response.data;
}

const categoryService = {
    createCategory
}

export default categoryService;