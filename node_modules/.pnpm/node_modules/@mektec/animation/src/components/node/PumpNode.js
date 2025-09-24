import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
const PORT_OFFSET = -7;
const CENTER = "50%";
const portStyle = (pos, bg) => {
    const base = {
        width: 10,
        height: 10,
        borderRadius: 999,
        background: bg,
        border: "2px solid #334155",
    };
    switch (pos) {
        case Position.Left:
            return { ...base, left: PORT_OFFSET, top: CENTER, transform: "translate(-50%,-50%)" };
        case Position.Right:
            return { ...base, right: PORT_OFFSET, top: CENTER, transform: "translate(50%,-50%)" };
        case Position.Top:
            return { ...base, top: PORT_OFFSET, left: CENTER, transform: "translate(-50%,-50%)" };
        case Position.Bottom:
            return { ...base, bottom: PORT_OFFSET, left: CENTER, transform: "translate(-50%,50%)" };
        default:
            return base;
    }
};
export default function PumpNode({ data }) {
    const o = data?.orientation || "E";
    const rotX = o === "W" ? -1 : 1;
    const inSide = o === "E" ? Position.Left : Position.Right;
    const outSide = o === "E" ? Position.Right : Position.Left;
    return (_jsxs("div", { style: { width: 140, height: 100, position: "relative" }, children: [_jsxs("svg", { width: "140", height: "86", viewBox: "0 0 140 86", style: { transform: `scaleX(${rotX})` }, children: [_jsx("rect", { x: "12", y: "28", width: "40", height: "30", rx: "6", fill: "#e5e7eb", stroke: "#64748b", strokeWidth: "3" }), _jsx("rect", { x: "50", y: "24", width: "18", height: "38", rx: "4", fill: "#cbd5e1", stroke: "#64748b" }), _jsx("circle", { cx: "92", cy: "43", r: "22", fill: "#e2e8f0", stroke: "#475569", strokeWidth: "3" }), _jsx("g", { transform: "translate(92,43)", children: _jsx("path", { d: "M0,-12 L4,-2 L-4,-2 Z", fill: "#64748b", children: _jsx("animateTransform", { attributeName: "transform", type: "rotate", from: "0", to: "360", dur: "1.2s", repeatCount: "indefinite" }) }) })] }), _jsx(Handle, { id: "in", type: "target", position: inSide, style: portStyle(inSide, "#1E90FF") }), _jsx(Handle, { id: "out", type: "source", position: outSide, style: portStyle(outSide, "#0EAD69") })] }));
}
