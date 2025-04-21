// utils/queryClient.ts
import { queryClient } from './main' // Your configured query client

export async function executeQuery(queryKey, queryFn) {
    // Check cache first
    const cachedData = queryClient.getQueryData(queryKey)
    if (cachedData) return cachedData

    // Fetch if not in cache
    return queryClient.fetchQuery({
        queryKey,
        queryFn
    })
}