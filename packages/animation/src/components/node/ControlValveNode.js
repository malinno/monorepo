import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
const OFFSET = -7;
const CENTER = "50%";
const basePort = (bg) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
});
const portStyle = (pos, bg) => {
    const base = basePort(bg);
    switch (pos) {
        case Position.Left:
            return { ...base, left: OFFSET, top: CENTER, transform: "translate(-50%,-50%)" };
        case Position.Right:
            return { ...base, right: OFFSET, top: CENTER, transform: "translate(50%,-50%)" };
        case Position.Top:
            return { ...base, top: OFFSET, left: CENTER, transform: "translate(-50%,-50%)" };
        case Position.Bottom:
            return { ...base, bottom: OFFSET, left: CENTER, transform: "translate(-50%,50%)" };
        default:
            return base;
    }
};
export default function ControlValveNode({ data }) {
    const o = data?.orientation || "E";
    const open = Math.max(0, Math.min(1, Number(data?.open ?? 1)));
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
    const coverW = 24 * (1 - open) + 0.001;
    return (_jsxs("div", { style: { width: 120, height: 100, position: "relative" }, children: [_jsxs("svg", { width: "120", height: "72", viewBox: "0 0 120 72", style: { transform: `rotate(${rot}deg)` }, children: [_jsx("circle", { cx: "60", cy: "36", r: "22", fill: "#fff", stroke: "#6b7280", strokeWidth: "3" }), _jsx("rect", { x: "48", y: "24", width: "24", height: "24", rx: "3", fill: "#9ca3af", stroke: "#374151" }), _jsx("rect", { x: 48 + coverW, y: "24", width: 24 - coverW, height: "24", rx: "3", fill: "#ffffff", stroke: "#374151" }), _jsx("rect", { x: "8", y: "28", width: "20", height: "16", rx: "4", fill: "#cbd5e1", stroke: "#64748b" }), _jsx("rect", { x: "92", y: "28", width: "20", height: "16", rx: "4", fill: "#cbd5e1", stroke: "#64748b" })] }), _jsx(Handle, { id: "in", type: "target", position: inSide, style: portStyle(inSide, "#1E90FF") }), _jsx(Handle, { id: "out", type: "source", position: outSide, style: portStyle(outSide, "#0EAD69") })] }));
}
