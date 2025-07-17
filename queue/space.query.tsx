import { initSpace} from "../core/002.space"

import { useQuery } from "@tanstack/react-query"

export function useInitSpace() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/space/space/init')
            if (!response.ok) {
                alert('Network response was not ok : /api/space/space/init ')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initSpace']
    })
}

export function useTestSpace() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/space/space/test')
            if (!response.ok) {
                alert('Network response was not ok for /api/space/space/test')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['testSpace']
    })
}

