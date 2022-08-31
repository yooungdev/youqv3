import { memo } from "react"

const ProfileMenu = () => {
    return (
        <div className="shadow-standart rounded-[10px] flex items-center justify-evenly h-[60px] bg-white">
            <div className="relative h-full">
                <div className="absolute bg-[#4971FF] h-[2px] w-full rounded-[10px]"/>
                <button className="bg-none hover:bg-[#E8F1FF] h-full border-none outline-none text-[#232323] font-semibold font-montserrat text-[17px] cursor-pointer py-[7px] px-[14px]">
                    Ответы
                </button>
            </div>
            <div className="relative h-full ">
                <div className="absolute bg-[#4971FF] h-[2px] w-full rounded-[10px]"/>
                <button className="bg-none h-full hover:bg-[#E8F1FF] border-none outline-none text-[#232323] font-semibold font-montserrat text-[17px] cursor-pointer py-[7px] px-[14px]">
                    Вопросы
                </button>
            </div>
        </div>
    )
}

export default memo(ProfileMenu)