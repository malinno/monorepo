import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
const OFFSET = 6;
const basePort = (bg) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
});
const portAt = (pos, bg) => {
    const s = basePort(bg);
    switch (pos) {
        case Position.Left:
            return {
                ...s,
                left: OFFSET,
                top: "50%",
                transform: "translate(-50%,-50%)",
            };
        case Position.Right:
            return {
                ...s,
                right: OFFSET,
                top: "50%",
                transform: "translate(50%,-50%)",
            };
        case Position.Top:
            return {
                ...s,
                top: OFFSET,
                left: "50%",
                transform: "translate(-50%,-50%)",
            };
        case Position.Bottom:
            return {
                ...s,
                bottom: OFFSET,
                left: "50%",
                transform: "translate(-50%,50%)",
            };
        default:
            return s;
    }
};
export default function ElbowNode({ data }) {
    const o = data?.orientation || "N";
    const rot = o === "N" ? 0 : o === "E" ? 90 : o === "S" ? 180 : 270;
    const inSide = o === "N"
        ? Position.Left
        : o === "E"
            ? Position.Top
            : o === "S"
                ? Position.Right
                : Position.Bottom;
    const outSide = o === "N"
        ? Position.Top
        : o === "E"
            ? Position.Right
            : o === "S"
                ? Position.Bottom
                : Position.Left;
    return (_jsxs("div", { style: { width: 86, height: 96, position: "relative" }, children: [_jsxs("svg", { width: "86", height: "86", viewBox: "0 0 86 86", style: { transform: `rotate(${rot}deg)` }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "pipeGrad", x1: "0", y1: "0", x2: "1", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#cbd5e1" }), _jsx("stop", { offset: "100%", stopColor: "#94a3b8" })] }), _jsx("filter", { id: "shadow", children: _jsx("feDropShadow", { dx: "0", dy: "1", stdDeviation: "1.5", floodOpacity: "0.25" }) })] }), _jsx("path", { d: "M2 70 V24 a24 24 0 0 1 24-24 H70", fill: "url(#pipeGrad)", stroke: "#334155", strokeWidth: "6", filter: "url(#shadow)" })] }), _jsx(Handle, { id: "in", type: "target", position: inSide, style: portAt(inSide, "#1E90FF") }), _jsx(Handle, { id: "out", type: "source", position: outSide, style: portAt(outSide, "#0EAD69") })] }));
}
