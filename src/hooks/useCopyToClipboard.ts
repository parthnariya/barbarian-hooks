import { useState } from "react";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>;
function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy : CopyFn = async text => {
    if(!navigator?.clipboard){
        console.warn("clipboard is not available")
        return false
    }
    try{
        await navigator.clipboard.writeText(text)
        setCopiedText(text)
        return true
    }catch(error){
        console.warn('copy failed',error)
        setCopiedText(null)
        return false
    }
  }
  return [copiedText,copy]
}
export default useCopyToClipboard;
