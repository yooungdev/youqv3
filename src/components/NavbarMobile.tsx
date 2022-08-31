import { useRouter } from "next/router"
// utils/icons
import Plus from '../utils/svg/plus.svg'
import User from '../utils/svg/user.svg'
import Menu from '../utils/svg/menu.svg'


type NavbarMobileProps = {
    session?: any
}

const NavbarMobile = ({ 
    session
}: NavbarMobileProps) => {


    const router = useRouter()


    const isUser = () => {
        if (session?.data?.user?.id) {
            return `/profile/${session?.data?.user?.id}`
        }

        return '/auth'
    }

    const getActiveUser = () => {
        if (router.asPath === `/profile/${session?.data?.user?.id}`) {
            return '#4971FF'
        }

        if (router.pathname === '/auth') {
            return '#4971FF'
        }

        return '#71716e'
    }

    return (
        <div className="shadow-nav_mob fixed left-[50%] bottom-[10px] z-50 w-[96%] h-[54px] px-[10px] flex items-center justify-around rounded-[10px] bg-white translate-x-[-50%] sm:hidden">
            <div className="h-full flex items-center">
                <button 
                    onClick={() => router.push('/')}
                    className="flex flex-col items-center justify-center bg-none border-none rounded"
                >
                    <Menu
                        width={22}
                        height={22}
                        fill={
                            router.pathname === '/' ? '#4971FF' : '#71716e'
                        }
                    />
                    <span style={{
                        color: router.pathname === '/' ? '#4971FF' : '#71716e'
                    }} className="text-[14px] font-bold font-nunito leading-4">
                        Главная
                    </span>
                </button>
            </div>
            <div className="h-full flex items-center">
                <button 
                    onClick={() => router.push('/ask')}
                    className="border-none hover:shadow-none rounded-[17px] bg-[#4971FF] outline-none cursor-pointer text-white flex items-center justify-center h-[38px] w-[38px] shadow-create"
                >
                    <Plus fill="white" width={28} height={28} />
                </button>
            </div>
            <div>
                <button className="flex flex-col items-center justify-center bg-none border-none rounded">
                    <User
                        width={22}
                        height={22}
                        fill={getActiveUser()}
                    />
                    <span onClick={() => router.push(isUser())}
                    style={{
                        color: getActiveUser()
                    }} className="text-[14px] font-bold font-nunito leading-4">
                        {session?.data?.user ? 'Профиль' : 'Войти'}
                    </span>
                </button>
            </div>
        </div>
    )
}


export default NavbarMobile