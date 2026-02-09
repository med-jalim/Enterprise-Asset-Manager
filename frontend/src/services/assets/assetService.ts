import api from './../api';
import type { AssetFormValues } from "@/types/assets/assetsTypes";

export const assetService = {
    getAssets: async () => {
        try {
            const response = await api.get('/assets');  
            return response.data;
        } catch (error) {
            console.error('Error fetching assets:', error);
            throw error;
        }
    },

    createAsset: async (assetData: AssetFormValues) => {
        try {
            const response = await api.post('/assets', assetData);  
            return response.data;
        } catch (error) {
            console.error('Error creating asset:', error);
            throw error;
        }
    }
};