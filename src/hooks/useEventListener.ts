import  { RefObject, useCallback, useEffect, useRef } from "react";

//isSSR will detect wether the application uses the SSR or not
export const isSSR : boolean = !(typeof window !== "undefined" && window.document?.createElement)

//pass refs and extendable elements and it will return the element for us.
export function getRefElement (element?:RefObject<Element>|Window ):Element |Window| undefined | null {
    if(element && "current" in element  ) {
        return element.current
    }
    return element
} 

interface UseEventListener {
    type:keyof WindowEventMap;
    listener : EventListener;
    element?:RefObject<Element> |Window;
    options?:AddEventListenerOptions
}

function useEventListener ({
    type,
    listener,
    element = isSSR ? undefined : window,
    options
}:UseEventListener):void {
    
    const savedListener = useRef<EventListener>()
    
    useEffect(() => {
        savedListener.current = listener
    },[listener])

    const handleEventListener = useCallback((event:Event) => {
        savedListener.current?.(event);
    },[])

    useEffect(() => {
        const target = getRefElement(element);
        target?.addEventListener(type,handleEventListener,options)

        return () => target?.removeEventListener(type,handleEventListener)
    },[type,element,options,handleEventListener])
    

}
export default useEventListener