import { useEffect, useRef } from "react"




const useOutside = (onClose: (bol: boolean) => void) => {
    const ref: any = useRef(null)

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current?.contains(event.target)) {
            onClose(false)
        }
    }


    useEffect(() => {
        document.addEventListener('click', handleClickOutside)


        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })

    return { ref }
}


export default useOutside