import { ComponentType, lazy, LazyExoticComponent, useEffect, useState } from "react"

function usePreFetchComponent (givenComponent : () => Promise<{default : ComponentType<any>;}>) {
    const [component ,setComponent] = useState<LazyExoticComponent<ComponentType<any>>>();

    useEffect(() => {
        givenComponent();
        const comp = lazy(givenComponent)
        setComponent(comp)
    },[givenComponent])
    // if(component) return component
    return component
}
export default usePreFetchComponent