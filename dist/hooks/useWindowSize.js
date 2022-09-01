"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useWindowSize = () => {
    const [size, setSize] = (0, react_1.useState)([0, 0]);
    (0, react_1.useLayoutEffect)(() => {
        const updateSize = () => {
            setSize([window.innerWidth, window.innerHeight]);
        };
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
};
exports.default = useWindowSize;
