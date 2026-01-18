import { gameApi } from "./api"
import { useQuery } from "@tanstack/react-query"

export const useGameQuery = (name: string) => {
    const query = useQuery({
        queryKey: ["game", name],
        queryFn: () => gameApi.getGame({ name }),
    })
    return query
}