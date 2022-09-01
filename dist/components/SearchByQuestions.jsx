"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
//  utils/svg
const search_svg_1 = __importDefault(require("../utils/svg/search.svg"));
// components/UI
const Button_1 = __importDefault(require("./UI/Button"));
const SearchByQuestions = () => {
    const [isFocus, setIsFocus] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    return (<div className="shadow-standart rounded-[10px] hidden sm:flex max-w-[630px] mx-auto bg-white p-[14px]">
      <div className="flex w-full">
        <div className={`${isFocus ? 'border-[#4971FF]' : 'border-neutral-300'} border-[1px] rounded-[10px] w-[420px] flex items-center p-[10px]`}>
          <search_svg_1.default fill='gray' width={20}/>
          <input onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} className="ml-[10px] border-none text-[16px] font-semibold font-montserrat outline-none w-full h-full" placeholder="Search by questions..." type="text"/>
        </div>
        <Button_1.default onClick={() => router.push('/ask')} className=" border-none outline-none rounded-[10px] bg-none px-[20px] ml-[10px] text-[18px] font-nunito text-[#4971FF] font-bold hover:bg-[#DEEBFF]">
          Задать вопрос
        </Button_1.default>
      </div>
    </div>);
};
exports.default = SearchByQuestions;
