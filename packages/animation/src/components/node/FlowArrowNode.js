import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function FlowArrowNode({ data }) {
    const dir = data?.dir || "E";
    const rot = dir === "N" ? -90 : dir === "E" ? 0 : dir === "S" ? 90 : 180;
    return (_jsxs("div", { style: { width: 120, height: 60, position: "relative" }, children: [_jsxs("svg", { width: "120", height: "60", viewBox: "0 0 120 60", style: { transform: `rotate(${rot}deg)` }, children: [_jsx("rect", { x: "8", y: "20", width: "104", height: "20", rx: "10", fill: "#cbd5e1", stroke: "#334155", strokeWidth: "3" }), _jsx("rect", { x: "14", y: "24", width: "92", height: "12", rx: "6", fill: "#e2e8f0" }), _jsx("path", { d: "M70 16 L98 30 L70 44 Z", fill: "#16a34a", stroke: "#0f172a" })] }), _jsx(Handle, { id: "in", type: "target", position: Position.Left, style: port("#1E90FF", { left: -2, top: 30 }) }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: port("#0EAD69", { right: -2, top: 30 }) })] }));
}
const port = (bg, extra) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...extra,
});
