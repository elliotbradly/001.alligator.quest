import { useQuery } from "@tanstack/react-query"

export function useInitFunfoot() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/funfoot/init')
            if (!response.ok) {
                alert('Network response was not ok : useInitFunfoot ')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initFunfoot']
    })
}

export function useOpenFunfoot(idx) {

    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/funfoot/open?idx=' + idx)
            if (!response.ok) {
                alert('Network response was not ok : ' + useOpenFunfoot )
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['openFunfoot']
    })
}

export function useNewFunfoot(idx) {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/funfoot/new?idx=' + idx)
            if (!response.ok) {
                throw new Error('Network response was not ok : ' + useNewFunfoot)
            }
            return response.json()

        },
        queryKey: ['newFunfoot']
    })
}


export function useReadFunfoot(idx) {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/funfoot/read?idx=' + idx )
            if (!response.ok) {
                throw new Error('Network response was not ok : ' + useNewFunfoot)
            }
            return response.json()

        },
        queryKey: ['readFunfoot'],
        refetchInterval: 3000,
        staleTime: 3000
    })
}

export function useWriteFunfoot(idx) {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/0kwierdo/funfoot/write?idx=' + idx)
            if (!response.ok) {
                throw new Error('Network response was not ok : ' + useNewFunfoot)
            }
            return response.json()

        },
        queryKey: ['writeFunfoot'],
        refetchInterval: 4000,
        staleTime: 4000
    })
}
