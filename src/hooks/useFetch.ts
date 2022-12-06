import { useEffect, useReducer, useRef } from "react"

type State<T> = {
    data?: T,
    error?: Error
}
type Cache<T> = {[url:string]:T}

type Action<T> = {type : "loading"} | {type:"fetched",payload:T} | {type:"error",payload:Error}




function useFetch <T> (url?:string,options?:RequestInit):State<T> {
    
    const cache = useRef<Cache<T>>({})
    
    // whenever component is unmounted which prevent state change
    const cancelRequest = useRef<boolean>(false)
    
    const initialState:State<T> = {
        data:undefined,
        error:undefined,
        
    }
    function fetchReducer (state: State<T>,action:Action<T>):State<T> {
        switch(action.type){
            case "loading":
                return {...state}
            case "fetched":
                return {...state , data: action.payload}
            case "error":
                return { ...state ,error:action.payload}
            default:
                return state
        }
    }

    
    const [state, dispatch] = useReducer(fetchReducer,initialState)
   
    useEffect(() => {
        if(!url) return;
        dispatch({type:"loading"})

        cancelRequest.current = false
        const fetchData = async () => {
            dispatch({type:"loading"});
    
            if(cache.current[url]){
                dispatch({type:"fetched",payload:cache.current[url]})
                return
            }
            try{
                const res = await fetch(url,options)
                if(!res.ok){
                    throw new Error(res.statusText)
                }
                const data = (await res.json()) as T
                cache.current[url] = data
                if(cancelRequest.current) return;
    
                dispatch({type:"fetched",payload:data})
            }
            catch(error){
                if(cancelRequest.current) return;
                dispatch({type:"error",payload:error as Error})
            }
        }

        void fetchData()

        return () => {
            cancelRequest.current = true
        }
    },[url])
    return state
}
export default useFetch