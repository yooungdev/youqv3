import { useSession } from "next-auth/react"
import { ReactNode } from "react"
import Image from 'next/image'
//
import loading from '../utils/gift/loading.gif'



type AuthWrapperProps = {
    children: ReactNode
}

const AuthWrapper = ({
    children
}: AuthWrapperProps) => {

    const { status } = useSession()

    if (status === 'loading') {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-white">
                <Image 
                    height={200}
                    objectFit="contain"
                    src={loading} 
                    alt="loading"
                />
            </div>
        )
    }


    return (
        <>
            {children}
        </>
    )
}

export default AuthWrapper