import { useEffect, useRef } from "react"
import useIsoMorphicLayoutEffect from "./useIsoMorphicLayoutEffect"

function useTimeout (callback : () => void,delay:number|undefined) {
    const savedCallback = useRef(callback)

    useIsoMorphicLayoutEffect(() => {
        savedCallback.current = callback
    },[callback])

    useEffect(() => {
        if(!delay && delay !== 0) return

        const timer = setTimeout(() => savedCallback.current(),delay)

        return () => clearTimeout(timer)
    },[delay])

}
export default useTimeout