"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//
const head_1 = __importDefault(require("next/head"));
// components
const Navbar_1 = __importDefault(require("../components/Navbar"));
const NavbarMobile_1 = __importDefault(require("../components/NavbarMobile"));
const PageContainer = ({ children, title = 'Вопросы и ответы на школьные задачки онлайн - youq.org', description = 'Решаем домашнее задание вместе' }) => {
    return (<div className="relative h-full">
            <head_1.default>
                <title>{title}</title>
                <meta name="title" content={title}/>
                <meta name="description" content={description}/>
                <link rel="icon" href="/favicon.svg"/>
            </head_1.default>
            <Navbar_1.default />
            <div className="py-[70px] px-[10px] h-full max-w-[1200px] m-auto sm:pt-[80px] sm:px-0">
                {children}
            </div>
            <NavbarMobile_1.default />
        </div>);
};
exports.default = PageContainer;
