"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const Button_1 = __importDefault(require("../components/UI/Button"));
// layouts
const PageContainer_1 = __importDefault(require("../layouts/PageContainer"));
const Auth = () => {
    const handleSignIn = async () => {
        try {
            await (0, react_1.signIn)();
        }
        catch (e) {
        }
    };
    return (<PageContainer_1.default title="Авторизовация - youq.org">
            <div className="w-full h-full flex  items-center justify-center">
                <div className="shadow-standart flex rounded-[10px] w-[700px] p-[12px] sm:p-[20px] bg-white">
                    <div className="w-[50%] hidden sm:flex items-center justify-center flex-col">
                        <span className="font-[900] font-nunito text-[3em] text-[#4971FF]">
                            YouQ
                        </span>
                        <span className="text-[#2e5af9] font-montserrat text-[18px] font-semibold">
                            вопрос - ответ
                        </span>
                    </div>
                    <div className="w-[100%] sm:w-[50%] flex flex-col">
                        <div className="text-[#172b4d] text-[22px] font-montserrat font-semibold">
                            <span>
                                Авторизация
                            </span>
                        </div>
                        <form className="p-[10px] w-full flex flex-col">
                            <input />
                            <input />
                            <Button_1.default onClick={handleSignIn} 
    // type="submit"
    className="border-none outline-none cursor-pointer py-[5px] px-[10px] mt-[20px] font-semibold text-white text-[16px] rounded-[10px] bg-[#2684ff] hover:bg-[#4971FF]">
                                Войти
                            </Button_1.default>
                        </form>
                    </div>
                </div>
            </div>
        </PageContainer_1.default>);
};
exports.default = Auth;
