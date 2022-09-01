"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("next-auth/react");
const image_1 = __importDefault(require("next/image"));
//
const loading_gif_1 = __importDefault(require("../utils/gift/loading.gif"));
const AuthWrapper = ({ children }) => {
    const { status } = (0, react_1.useSession)();
    if (status === 'loading') {
        return (<div className="w-full h-full flex flex-col items-center justify-center bg-white">
                <image_1.default height={200} objectFit="contain" src={loading_gif_1.default} alt="loading"/>
            </div>);
    }
    return (<>
            {children}
        </>);
};
exports.default = AuthWrapper;
