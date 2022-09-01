"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
// components/UI
const Avatar_1 = __importDefault(require("../UI/Avatar"));
const QuestionQAComment = ({ comment }) => {
    var _a, _b;
    const router = (0, router_1.useRouter)();
    return (<div className='flex items-center justify-between mt-[15px]'>
            <Avatar_1.default onClick={() => router.push(`/profile/${comment === null || comment === void 0 ? void 0 : comment.authorId}`)} src={(_a = comment === null || comment === void 0 ? void 0 : comment.author) === null || _a === void 0 ? void 0 : _a.image} width={30} height={30} isConfirmed={(_b = comment === null || comment === void 0 ? void 0 : comment.author) === null || _b === void 0 ? void 0 : _b.isConfirmed} className="cursor-pointer rounded-full"/>
            <p style={{
            overflowWrap: 'anywhere'
        }} className=" w-[93%] text-[18px]">
                {comment === null || comment === void 0 ? void 0 : comment.text}
            </p>
        </div>);
};
exports.default = QuestionQAComment;
