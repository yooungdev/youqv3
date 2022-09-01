"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const react_1 = require("next-auth/react");
const react_2 = require("react");
const helping_1 = require("utils/helping");
// components/UI
const Avatar_1 = __importDefault(require("../UI/Avatar"));
const Button_1 = __importDefault(require("../UI/Button"));
const ProfileInfo = ({ profile }) => {
    var _a, _b;
    const createdAtProfile = new Date(String(profile === null || profile === void 0 ? void 0 : profile.createdAt));
    const { data, status } = (0, react_1.useSession)();
    return (<div className="shadow-standart rounded-[10px] flex flex-col justify-between p-[20px] bg-white">
      <div className="flex w-full">
        <Avatar_1.default height={43} width={43} src={profile === null || profile === void 0 ? void 0 : profile.image} isConfirmed={profile === null || profile === void 0 ? void 0 : profile.isConfirmed} className="rounded-full"/>
        <div className="pl-[10px] font-montserrat flex flex-col leading-[18px] justify-center">
          <span className="text-16px sm:text-[17px] font-semibold">
            {profile === null || profile === void 0 ? void 0 : profile.name}
          </span>
          <span className="text-16px sm:text-[17px] text-[#494949] font-medium">
            {helping_1.level[profile === null || profile === void 0 ? void 0 : profile.level]}
          </span>
        </div>
      </div>
      {status === "authenticated" && ((_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id) && ((_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.id) === (profile === null || profile === void 0 ? void 0 : profile.id) && (<Button_1.default className="w-full hover:bg-[#E4E4FB] text-[#4971FF] font-nunito text-[17px] font-bold py-[3px] px-[6px] cursor-pointer rounded-[10px] bg-[#E8F1FF] border-none outline-none mt-[15px]">
          Редактировать
        </Button_1.default>)}
      <div className="pt-[20px] w-full">
        <span className="text-[16px] font-montserrat font-semibold">
          Информация
        </span>
        <div className="w-full h-[1px] my-[8px] bg-[#e6e6e6]"/>
        <div>
          <div>{helping_1.role[profile === null || profile === void 0 ? void 0 : profile.role]}</div>
          <div>Рейтинг: {profile === null || profile === void 0 ? void 0 : profile.rating}</div>
          <div>С нами с: {(0, moment_1.default)(createdAtProfile).format("LLL")}</div>
        </div>
      </div>
    </div>);
};
exports.default = (0, react_2.memo)(ProfileInfo);
