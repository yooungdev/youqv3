"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//
const router_1 = require("next/router");
// components/UI
const Avatar_1 = __importDefault(require("./UI/Avatar"));
const Button_1 = __importDefault(require("./UI/Button"));
const moment_1 = __importDefault(require("moment"));
const helping_1 = require("utils/helping");
const QuestionItem = ({ question }) => {
    var _a, _b, _c, _d;
    const router = (0, router_1.useRouter)();
    const createdAtQuestionItem = new Date(String(question === null || question === void 0 ? void 0 : question.createdAt));
    return (<div className="w-full rounded-[10px] shadow-standart p-[20px] mt-[25px] first:mt-0 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar_1.default onClick={() => router.push(`/profile/${question === null || question === void 0 ? void 0 : question.authorId}`)} width={35} height={35} isConfirmed={(_a = question === null || question === void 0 ? void 0 : question.author) === null || _a === void 0 ? void 0 : _a.isConfirmed} src={(_b = question === null || question === void 0 ? void 0 : question.author) === null || _b === void 0 ? void 0 : _b.image} className="rounded-full cursor-pointer"/>
          <div className="flex flex-col justify-center  text-[15px] sm:text-[16px] pl-[7px] font-montserrat">
            <span className="text-[#232323] leading-[16px] font-semibold">
              {helping_1.itemsOptionsObject[question === null || question === void 0 ? void 0 : question.item]}
            </span>
            <div className="text-[#494949] leading-[16px] font-medium">
              <span>{(0, moment_1.default)(createdAtQuestionItem).fromNow()}</span>
            </div>
          </div>
        </div>
        <div className="text-[18px] font-bold font-nunito text-[#636777] p-[8px] flex items-center justify-center rounded-[8px] bg-[#ebebeb]">
          <span className="leading-none">{question === null || question === void 0 ? void 0 : question.rating}</span>
        </div>
      </div>
      <div className="py-[13px]">
        <p onClick={() => router.push(`/question/${question === null || question === void 0 ? void 0 : question.id}`)} style={{
            overflowWrap: "anywhere",
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            fontFamily: "sans-serif",
            fontWeight: 500,
            cursor: "pointer",
            // fontSize: 18
        }} className="text-[16px] sm:text-[18px] leading-[22px] hover:underline">
          {question === null || question === void 0 ? void 0 : question.text}
        </p>
      </div>
      <div className="flex items-end justify-between">
        <div>
          {((_c = question === null || question === void 0 ? void 0 : question.answers) === null || _c === void 0 ? void 0 : _c.length) > 0 && (<span className="text-[16px] sm:text-[17px] font-nunito font-semibold">
              Ответов: {(_d = question === null || question === void 0 ? void 0 : question.answers) === null || _d === void 0 ? void 0 : _d.length}
            </span>)}
        </div>
        <div>
          <Button_1.default onClick={() => router.push(`/question/${question === null || question === void 0 ? void 0 : question.id}`)} className="rounded-[10px] text-[#4971FF] border border-[#4971FF] bg-none outline-none cursor-pointer py-[3px] px-[6px] text-[16px] sm:py-[3px] sm:px-[10px] sm:text-[17px] font-nunito font-bold hover:text-white hover:bg-[#4971FF]">
            Ответить
          </Button_1.default>
        </div>
      </div>
    </div>);
};
exports.default = (0, react_1.memo)(QuestionItem);
