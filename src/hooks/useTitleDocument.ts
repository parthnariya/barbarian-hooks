import useIsoMorphicLayoutEffect from "./useIsoMorphicLayoutEffect"

function useTitleDocument (title : string) {
    useIsoMorphicLayoutEffect(() => {
        window.document.title = title
    },[title])
}
export default useTitleDocument
