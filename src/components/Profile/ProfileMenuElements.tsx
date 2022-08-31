import { memo } from "react"

const ProfileMenuElements = () => {
    return (
        <div className="grid grid-cols-1 gap-[15px] divide-y shadow-standart rounded-[10px] mt-[20px] lg:mt-[40px] p-[20px] bg-white">
            <ProfileMenuElement />
            <ProfileMenuElement />
            <ProfileMenuElement />
            <ProfileMenuElement />
        </div>
    )
}
export default memo(ProfileMenuElements)



type ProfileMenuElementProps = {
    element?: any
}


const ProfileMenuElement = memo(({
    element
}: ProfileMenuElementProps) => {
    return (
        <div className="pt-[15px] first:pt-0">
            <div className="flex justify-center flex-col text-[15px] sm:text-[16px] font-montserrat">
                <div>
                    <span className="hidden sm:inline text-[#7f7f7f]">
                        time
                    </span>
                    <span className="ml-[10px] text-[#494949]">
                        item
                    </span>
                    <span className="ml-[10px] text-[#494949]">
                        class
                    </span>
                </div>
                <p className="block sm:hidden text-[#7f7f7f]">
                    time
                </p>
            </div>
            <div className="p-[1px]">
                <p style={{
                    overflowWrap: 'anywhere',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    display: '-webkit-box',
                    cursor: 'pointer',
                }} className="font-medium font-montserrat text-[16px] sm:text-[18px] leading-[22px] hover:underline">
                    asdasdsadsa
                </p>
            </div>
        </div>
    )
})