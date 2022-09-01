"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rating_up_svg_1 = __importDefault(require("../../utils/svg/rating_up.svg"));
const rating_down_svg_1 = __importDefault(require("../../utils/svg/rating_down.svg"));
const react_1 = require("react");
const QuestionRating = () => {
    const [isHoverUp, setIsHoverUp] = (0, react_1.useState)(false);
    const [isHoverDown, setIsHoverDown] = (0, react_1.useState)(false);
    return (<div className="flex bg-[#f5f5f5] mt-[15px] rounded-[20px] py-[7px] px-[16px]">
            <button onMouseEnter={() => setIsHoverUp(true)} onMouseLeave={() => setIsHoverUp(false)}>
                <rating_up_svg_1.default fill={isHoverUp ? '#4971FF' : '#86a8fc'} height={19} width={19}/>
            </button>
            <div className="mx-[12px] h-full w-[2px] bg-[#E5E5E5]"/>
            <button onMouseEnter={() => setIsHoverDown(true)} onMouseLeave={() => setIsHoverDown(false)}>
                <rating_down_svg_1.default fill={isHoverDown ? 'red' : '#636466'} height={19} width={19}/>
            </button>
        </div>);
};
exports.default = QuestionRating;
