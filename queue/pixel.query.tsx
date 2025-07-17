import { useQuery } from "@tanstack/react-query"



export function useInitPixel() {
    
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/pixel/pixel/init/')
            if (!response.ok) {
                alert( 'Network response was not ok')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initPixel']
    })
}




export function useOpenColor() {
    
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/pixel/color/open/')
            if (!response.ok) {
                alert( 'Network response was not ok')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['openColor']
    })
}


export function useSelectColor() {

    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/pixel/color/select/')
            if (!response.ok) {
                alert( 'Network response was not ok')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['selectColor']
    })
}
