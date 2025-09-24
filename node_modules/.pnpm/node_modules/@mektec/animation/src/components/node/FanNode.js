import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function FanNode({ data }) {
    const speed = Math.max(0, Math.min(2, Number(data?.speed ?? 1)));
    return (_jsxs("div", { style: { width: 140, height: 120, position: "relative" }, children: [_jsxs("svg", { width: "140", height: "120", viewBox: "0 0 140 120", children: [_jsx("circle", { cx: "70", cy: "60", r: "30", fill: "#e5e7eb", stroke: "#64748b", strokeWidth: "3" }), _jsx("g", { transform: "translate(70,60)", children: _jsx("g", { children: _jsx("path", { d: "M0,-24 L8,-8 L-8,-8 Z", fill: "#94a3b8", children: _jsx("animateTransform", { attributeName: "transform", type: "rotate", from: "0", to: "360", dur: "${1.2 / Math.max(speed,0.1)}s", repeatCount: "indefinite" }) }) }) }), _jsx("rect", { x: "20", y: "48", width: "100", height: "24", rx: "12", fill: "#cbd5e1", stroke: "#334155", strokeWidth: "3" }), _jsx("rect", { x: "26", y: "52", width: "88", height: "16", rx: "8", fill: "#e2e8f0" })] }), _jsx(Handle, { id: "in", type: "target", position: Position.Left, style: port("#1E90FF", { left: -2, top: 60 }) }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: port("#0EAD69", { right: -2, top: 60 }) })] }));
}
const port = (bg, extra) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...extra,
});
