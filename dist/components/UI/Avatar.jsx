"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("next/image"));
// utils/svg
const confirmed_svg_1 = __importDefault(require("../../utils/svg/confirmed.svg"));
const Avatar = ({ src, width = 20, height = 20, isConfirmed = false, className = "", onClick, }) => {
    return (<div style={{
            height,
            width,
        }} className="relative" onClick={onClick}>
      <image_1.default src={src !== null && src !== void 0 ? src : "https://s3.timeweb.com/cg16553-youq/avatar.svg"} alt="avatar" width={width} height={height} className={className}/>
      {isConfirmed && (<div className="absolute bottom-0 right-[-2px] bg-white rounded-full">
          <confirmed_svg_1.default width={15} fill="#4971FF"/>
        </div>)}
    </div>);
};
exports.default = Avatar;
