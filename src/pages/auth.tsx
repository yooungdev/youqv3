import { ReactNode, useEffect, useState } from "react"
import type { NextPage } from "next"
import Button from "../components/UI/Button"
// layouts
import PageContainer from "../layouts/PageContainer"
import Login from "components/Auth/Login"
import Registration from "components/Auth/Registration"
import { useTypedSelector } from "hooks/useTypedSelector"
import { useRouter } from "next/router"


const Auth: NextPage = () => {

    const [activeTab, setActiveTab] = useState<{
        component: ReactNode,
        name: string
    } | null>(null)


    const { status } = useTypedSelector(state => state.user)

    const router = useRouter()
    
    const LoginC = {
        name: 'Вход', 
        component: <Login toGoRegistration={() => setActiveTab(RegistrationC)} />
    }
    const RegistrationC = {
        name: 'Регистрация', 
        component: <Registration toGoLogin={() => setActiveTab(LoginC)} />
    }

    useEffect(() => {
        if (status === 'authorized') {
            router.push('/')
        }


        setActiveTab(LoginC)
    }, [status])



    return (
        <PageContainer title="Авторизовация - youq.org">
            <div className="w-full h-full flex  items-center justify-center">
                <div className="shadow-standart flex rounded-[10px] w-[630px] p-[12px] sm:p-[20px] bg-white">
                    <div className="w-[50%] hidden sm:flex items-center justify-center flex-col">
                        <span className="font-[900] font-nunito text-[3em] text-[#4971FF]">
                            YouQ
                        </span>
                        <span className="text-[#2e5af9] font-montserrat text-[18px] font-semibold">
                            вопрос - ответ
                        </span>
                    </div>
                    <div className="w-[100%] sm:w-[50%] flex flex-col">
                        <div className="text-[#172b4d] text-[22px] font-montserrat font-semibold">
                            <span>
                                {activeTab?.name}
                            </span>
                        </div>
                        {activeTab?.component}
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}


export default Auth