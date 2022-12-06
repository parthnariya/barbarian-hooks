import { MutableRefObject, useEffect, useRef, useState } from "react"

function useHover<T> () : [MutableRefObject<T>,boolean] {
    const [isHover, setIsHover] = useState(false)

    const ref:any = useRef<T | null>(null)

    const handleMouseOver = () => setIsHover(true)
    const handleMouseOut = () => setIsHover(false)

    useEffect(() => {
        const node:any = ref.current;
        if(node){
            node.addEventListener("mouseover", handleMouseOver);
            node.addEventListener("mouseout", handleMouseOut);
            return () => {
                node.removeEventListener("mouseover", handleMouseOver);
                node.removeEventListener("mouseout", handleMouseOut);
            }
        }
    },[ref.current])

    return [ref,isHover]
}
export default useHover