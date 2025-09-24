import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function CheckValveNode({ data }) {
    const o = data?.orientation || "E";
    const rot = o === "N" ? 0 : o === "E" ? 90 : o === "S" ? 180 : 270;
    const inSide = o === "E"
        ? Position.Left
        : o === "W"
            ? Position.Right
            : o === "N"
                ? Position.Bottom
                : Position.Top;
    const outSide = o === "E"
        ? Position.Right
        : o === "W"
            ? Position.Left
            : o === "N"
                ? Position.Top
                : Position.Bottom;
    return (_jsxs("div", { style: { width: 120, height: 90, position: "relative" }, children: [_jsxs("svg", { width: "120", height: "72", viewBox: "0 0 120 72", style: { transform: `rotate(${rot}deg)` }, children: [_jsx("rect", { x: "8", y: "26", width: "104", height: "20", rx: "10", fill: "#cbd5e1", stroke: "#334155", strokeWidth: "3" }), _jsx("rect", { x: "14", y: "30", width: "92", height: "12", rx: "6", fill: "#e2e8f0" }), _jsx("path", { d: "M52 22 L72 36 L52 50 Z", fill: "#94a3b8", stroke: "#334155" })] }), _jsx(Handle, { id: "in", type: "target", position: inSide, style: portAt(inSide, "#1E90FF") }), _jsx(Handle, { id: "out", type: "source", position: outSide, style: portAt(outSide, "#0EAD69") })] }));
}
const basePort = (bg) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
});
function portAt(pos, bg) {
    const s = basePort(bg);
    switch (pos) {
        case Position.Left:
            return { ...s, left: -2 };
        case Position.Right:
            return { ...s, right: -2 };
        case Position.Top:
            return { ...s, top: -2 };
        case Position.Bottom:
            return { ...s, bottom: -2 };
        default:
            return s;
    }
}
