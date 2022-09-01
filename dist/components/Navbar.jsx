"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
//
const link_1 = __importDefault(require("next/link"));
const router_1 = require("next/router");
// components/UI
const Avatar_1 = __importDefault(require("./UI/Avatar"));
const Button_1 = __importDefault(require("./UI/Button"));
const useOutside_1 = __importDefault(require("../hooks/useOutside"));
const react_2 = require("next-auth/react");
const helping_1 = require("utils/helping");
// utils/svg
// import Plus from '../utils/svg/plus.svg'
const Navbar = ({}) => {
    var _a, _b, _c, _d;
    const [isDropdownUser, setIsDropdownUser] = (0, react_1.useState)(false);
    const router = (0, router_1.useRouter)();
    const { data, status } = (0, react_2.useSession)();
    const handleSignIn = () => {
        router.push('/auth');
    };
    const handleSignOut = async () => {
        try {
            await (0, react_2.signOut)();
        }
        catch (error) {
        }
    };
    const { ref } = (0, useOutside_1.default)(setIsDropdownUser);
    return (<div className="flex items-center justify-between h-[50px] sm:h-[60px] py-[10px] px-[20px] w-full bg-white fixed z-50 shadow-nav">
            <span className="font-nunito hidden sm:block font-black text-4xl text-[#4971FF]">
                <link_1.default href="/">
                    YouQ
                </link_1.default>
            </span>
            {/* <button>
            <Plus fill="white" width={28} height={28}  />
        </button> */}
            {status === 'authenticated' ? (<div ref={ref} className="relative hidden sm:block">
                    <div onClick={() => setIsDropdownUser(prev => !prev)} style={{
                backgroundColor: isDropdownUser ? '#DEEBFF' : undefined
            }} className="rounded-[10px] hover:bg-[#DEEBFF] cursor-pointer flex items-center py-[7px] px-[10px]">
                        <Avatar_1.default src={(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.image} width={32} height={32} isConfirmed={(_b = data === null || data === void 0 ? void 0 : data.user) === null || _b === void 0 ? void 0 : _b.isConfirmed} className="rounded-[50%]"/>
                        <div className="flex ml-[10px] font-montserrat flex-col justify-center leading-[16px] text-[16px]">
                            <span className="font-semibold text-[#232323]">
                                {(_c = data === null || data === void 0 ? void 0 : data.user) === null || _c === void 0 ? void 0 : _c.name}
                            </span>
                            <span className="text-[#494949] font-medium">
                                {helping_1.level[(_d = data === null || data === void 0 ? void 0 : data.user) === null || _d === void 0 ? void 0 : _d.level]}
                            </span>
                        </div>
                    </div>

                    <DropdownUser isShow={isDropdownUser}>
                        <div className="w-full flex flex-col">
                            <Button_1.default onClick={() => { var _a; return router.push(`/profile/${(_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id}`); }} className="flex items-center rounded-[10px] py-[7px] px-[14px] bg-none outline-none border-none cursor-pointer text-[#232323] text-[16px] font-montserrat font-semibold hover:bg-[#F3F4FF]">
                                <span className="ml-[10px]">
                                    Мой профиль
                                </span>
                            </Button_1.default>
                            <Button_1.default onClick={handleSignOut} className="flex items-center rounded-[10px] py-[7px] px-[14px] bg-none outline-none border-none cursor-pointer text-[#232323] text-[16px] font-montserrat font-semibold hover:bg-[#F3F4FF]">
                                <span className="ml-[10px]">
                                    Выход
                                </span>
                            </Button_1.default>
                        </div>
                    </DropdownUser>
                </div>) : (<button onClick={handleSignIn} className="bg-[#4971FF] hidden sm:block border-none cursor-pointer rounded-[17px] hover:bg-[#2851E4] font-bold font-nunito text-[20px] text-white h-auto py-[5px] px-[17px]">
                    Войти
                </button>)}
        </div>);
};
const DropdownUser = ({ isShow, children, className }) => {
    return (<div style={{
            display: isShow ? 'block' : 'none'
        }} className={`${className} absolute top-[60px] right-0 shadow-dropdown rounded-[8px] min-w-[220px] h-auto p-[8px] bg-white`}>
            {children}
        </div>);
};
exports.default = Navbar;
