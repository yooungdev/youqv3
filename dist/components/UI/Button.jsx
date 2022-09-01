"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Button = ({ children, onClick, className, type, disabled }) => {
    return (<button disabled={disabled} className={className} onClick={onClick} type={type}>
            {children}
        </button>);
};
exports.default = Button;
