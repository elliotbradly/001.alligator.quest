import { useQuery } from "@tanstack/react-query"

export function useInitGlops() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/glops/init')
            if (!response.ok) {
                alert('Network response was not ok : useInitGlops ')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initGlops']
    })
}

