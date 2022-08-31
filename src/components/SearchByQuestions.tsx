import { useRouter } from "next/router";
import { useState } from "react";
//  utils/svg
import Search from "../utils/svg/search.svg";
// components/UI
import Button from "./UI/Button";






const SearchByQuestions = () => {
    const [isFocus, setIsFocus] = useState(false)


    const router = useRouter()

  return (
    <div className="shadow-standart rounded-[10px] hidden sm:flex max-w-[630px] mx-auto bg-white p-[14px]">
      <div className="flex w-full">
        <div className={`${isFocus ? 'border-[#4971FF]' : 'border-neutral-300'} border-[1px] rounded-[10px] w-[420px] flex items-center p-[10px]`}>
          <Search fill='gray' width={20} />
          <input 
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            className="ml-[10px] border-none text-[16px] font-semibold font-montserrat outline-none w-full h-full"
            placeholder="Search by questions..."
            type="text" 
          />
        </div>
        <Button 
          onClick={() => router.push('/ask')}
          className=" border-none outline-none rounded-[10px] bg-none px-[20px] ml-[10px] text-[18px] font-nunito text-[#4971FF] font-bold hover:bg-[#DEEBFF]">
          Задать вопрос
        </Button>
      </div>
    </div>
  );
};

export default SearchByQuestions;
