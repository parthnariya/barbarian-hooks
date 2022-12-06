import { useRef } from "react"

function useIsFirstTimeRender ():boolean {
    const isFirst = useRef(true)

    if(isFirst.current){
        isFirst.current = false
        return true
    }
    return isFirst.current
}
export default useIsFirstTimeRender