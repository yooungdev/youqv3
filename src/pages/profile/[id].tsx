import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"
import ProfileInfo from "../../components/Profile/ProfileInfo"
import ProfileMenu from "../../components/Profile/ProfileMenu"
import ProfileMenuElements from "../../components/Profile/ProfileMenuElements"
// layouts
import PageContainer from "../../layouts/PageContainer"
import { trpc } from "../../utils/trpc"



const Profile: NextPage = (props) => {
    
    const router = useRouter()

    const profileMutate = trpc.useMutation(['profile.getOne'])

    const id: string | undefined = String(router?.query?.id)
    const input = {
        id: id
    }
    console.log(profileMutate)

    useEffect(() => {
        if (id) {
            try {
                profileMutate.mutate(input)
            } catch (error) {
                
            }
        }
    }, [id])



    return (
        <PageContainer>
            <div className="flex justify-between h-full">
                <div className="h-full w-[100%] lg:w-[490px]">
                    <div className="max-w-[630px] lg:max-w-[330px] mx-auto h-full">
                        <ProfileInfo profile={profileMutate?.data} />
                    </div>
                </div>
                <div className="h-full w-[790px] hidden lg:block">
                    <div className="max-w-[630px] mx-auto h-full">
                        <ProfileMenu />
                        <ProfileMenuElements />
                    </div>
                </div>
            </div>
        </PageContainer>
    )
}

export default Profile