import itemService from './itemService';

export const searchItems = async (value, setSearchResults, setIsLoading) => {
    if (value) {
        setIsLoading(true);
        try {
            const res = await itemService.getItemByNameOrIngredients(value);
            setSearchResults(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
};