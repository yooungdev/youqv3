"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
// utils/icons
const plus_svg_1 = __importDefault(require("../utils/svg/plus.svg"));
const user_svg_1 = __importDefault(require("../utils/svg/user.svg"));
const menu_svg_1 = __importDefault(require("../utils/svg/menu.svg"));
const NavbarMobile = ({ session }) => {
    var _a;
    const router = (0, router_1.useRouter)();
    const isUser = () => {
        var _a, _b, _c, _d;
        if ((_b = (_a = session === null || session === void 0 ? void 0 : session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) {
            return `/profile/${(_d = (_c = session === null || session === void 0 ? void 0 : session.data) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id}`;
        }
        return '/auth';
    };
    const getActiveUser = () => {
        var _a, _b;
        if (router.asPath === `/profile/${(_b = (_a = session === null || session === void 0 ? void 0 : session.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id}`) {
            return '#4971FF';
        }
        if (router.pathname === '/auth') {
            return '#4971FF';
        }
        return '#71716e';
    };
    return (<div className="shadow-nav_mob fixed left-[50%] bottom-[10px] z-50 w-[96%] h-[54px] px-[10px] flex items-center justify-around rounded-[10px] bg-white translate-x-[-50%] sm:hidden">
            <div className="h-full flex items-center">
                <button onClick={() => router.push('/')} className="flex flex-col items-center justify-center bg-none border-none rounded">
                    <menu_svg_1.default width={22} height={22} fill={router.pathname === '/' ? '#4971FF' : '#71716e'}/>
                    <span style={{
            color: router.pathname === '/' ? '#4971FF' : '#71716e'
        }} className="text-[14px] font-bold font-nunito leading-4">
                        Главная
                    </span>
                </button>
            </div>
            <div className="h-full flex items-center">
                <button onClick={() => router.push('/ask')} className="border-none hover:shadow-none rounded-[17px] bg-[#4971FF] outline-none cursor-pointer text-white flex items-center justify-center h-[38px] w-[38px] shadow-create">
                    <plus_svg_1.default fill="white" width={28} height={28}/>
                </button>
            </div>
            <div>
                <button className="flex flex-col items-center justify-center bg-none border-none rounded">
                    <user_svg_1.default width={22} height={22} fill={getActiveUser()}/>
                    <span onClick={() => router.push(isUser())} style={{
            color: getActiveUser()
        }} className="text-[14px] font-bold font-nunito leading-4">
                        {((_a = session === null || session === void 0 ? void 0 : session.data) === null || _a === void 0 ? void 0 : _a.user) ? 'Профиль' : 'Войти'}
                    </span>
                </button>
            </div>
        </div>);
};
exports.default = NavbarMobile;
