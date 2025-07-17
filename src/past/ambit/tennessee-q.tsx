import {open} from "../Tennessee"
import { useQuery } from "@tanstack/react-query"

export function useTennessee (){
    return useQuery( {
        queryFn: async ()=> open(1),
        queryKey: ['tennessee']

    })
}