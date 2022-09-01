"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useOutside = (onClose) => {
    const ref = (0, react_1.useRef)(null);
    const handleClickOutside = (event) => {
        var _a;
        if (ref.current && !((_a = ref.current) === null || _a === void 0 ? void 0 : _a.contains(event.target))) {
            onClose(false);
        }
    };
    (0, react_1.useEffect)(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });
    return { ref };
};
exports.default = useOutside;
