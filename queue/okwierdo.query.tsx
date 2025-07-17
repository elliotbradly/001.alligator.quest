import { useQuery } from "@tanstack/react-query"

export function useInitOkwierdo() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/okwierdo/init')
            if (!response.ok) {
                alert('Network response was not ok')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initFictiq']
    })
}

export function useOpenOkwierdo() {

    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/okwierdo/open/')
            if (!response.ok) {
                alert('Network response was not ok')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['openFictiq']
    })
}

export function useUpdateOkweirdo() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/okwierdo/update/')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['updateFictiq'],
        refetchInterval: 3000,
        staleTime: 3000
    })
}



export function useInitGlopink() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/glopink/init')
            if (!response.ok) {
                alert('Network response was not ok for glopink init')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initGlopink']
    })
}

export function useTestGlopink() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/glopink/test')
            if (!response.ok) {
                alert('Network response was not ok for glopink test')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['testGlopink']
    })
}



export function useWriteGlopink() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/glopink/write')
            if (!response.ok) {
                alert('Network response was not ok for glopink write')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['writeGlopink']
    })
}



export function useReadGlopink() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/glopink/read?idx=glop00')
            if (!response.ok) {
                alert('Network response was not ok for glopink read')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['readGlopink']
    })
}