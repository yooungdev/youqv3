import { useEffect, useRef } from "react"




const useOutside = (onClose: (bol: boolean) => void) => {
    const ref = useRef(null)

    const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target.event)) {
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