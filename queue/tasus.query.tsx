import { useQuery } from "@tanstack/react-query"

export function useInitTasus() {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/tasus/init')
            if (!response.ok) {
                alert('Network response was not ok : useInitTasus ')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['initTasus']
    })
}

export function useOpenTasus(idx) {
    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/tasus/open?idx=' + idx)
            if (!response.ok) {
                alert('Network response was not ok : useOpenTasus ')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        queryKey: ['openTasus']
    })
}


export function useUpdateTasus() {

    return useQuery({
        queryFn: async () => {

            const queryString = window.location.search;
            const urlParams = new URLSearchParams(queryString);

            const hasIDX = urlParams.has('idx');
            const hasSRC = urlParams.has('src');

            let idxParm = ''
            let srcParm = ''

            if (hasIDX == false) idxParm = '000'
            else {
                idxParm = urlParams.get('idx');
            }

            if (hasSRC == false) srcParm = ''
            else {
                srcParm = urlParams.get('src');
            }

            const response = await fetch('/api/tasus/update?idx=' + idxParm + '&src=' + srcParm)
            if (!response.ok) {
                alert('Network response was not ok : useUpdateTasus ')
                //throw new Error('Network response was not ok')
            }

            const currentUrl = window.location.href;
            const urlObject = new URL(currentUrl);
            const baseUrl = urlObject.origin + '/tasus/play?idx=' + idxParm + '&src=';
            window.history.replaceState({}, '', baseUrl);

            return response.json()

        },
        refetchInterval: 1500,
        staleTime: 1500,
        queryKey: ['updateTasus']
    })
}

export function useWriteTasus(idx, src, pwr) {

    if (src == null) src = ''

    return useQuery({
        queryFn: async () => {

            const response = await fetch('/api/tasus/write?idx=' + idx + '&src=' + src)
            if (!response.ok) {
                alert('Network response was not ok : useWriteTasus ')
                //throw new Error('Network response was not ok')
            }
            return response.json()

        },
        enabled: pwr,
        queryKey: ['writeTasus']
    })
}

