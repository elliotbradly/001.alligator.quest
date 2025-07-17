import { useQuery } from "@tanstack/react-query"

export function useInitClock() {

    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/time/clock/init')
            if (!response.ok) {
                alert('Network response was not ok')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initClock']
    })
}


export function useTestTime() {

    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/time/time/test')
            if (!response.ok) {
                alert('Network response was not ok for testing time')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['testTime']
    })
}

