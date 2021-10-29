import { useRef, useEffect, useState } from 'react'

export const useDetectOutsideClick = (init = false) => {
    const ref = useRef()
    const [visiable, setvisiable] = useState(init)
    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (visiable && ref.current && !ref.current.contains(e.target)) {
                setvisiable(init)
            }
        }
        document.addEventListener("click", checkIfClickedOutside)
        return () => {
            document.removeEventListener("click", checkIfClickedOutside)
        }
    }, [visiable])
    return { visiable, setvisiable, ref }
}