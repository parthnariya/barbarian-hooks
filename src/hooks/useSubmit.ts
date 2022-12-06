import { useState } from "react"

function useSubmit(submitFunction : Function):[() => Promise<void>,Error|null,boolean]{
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<Error | null>(null)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            setError(null)
            await submitFunction()
        }catch(error){
            setError(error as Error)
        }finally{
            setLoading(false)
        };
    }

    return [handleSubmit,error,loading]

}
export default useSubmit