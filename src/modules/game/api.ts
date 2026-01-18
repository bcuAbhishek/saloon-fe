import { apiClient } from "@/lib/api/client";

export const gameApi = {
    getGame: async (params: { name: string }) => {
        const response = await apiClient.get("/game" , {params});
        return response.data;
    },
}   