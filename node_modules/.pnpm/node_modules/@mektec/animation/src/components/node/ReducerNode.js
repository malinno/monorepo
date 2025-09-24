import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function ReducerNode({ data }) {
    return (_jsxs("div", { style: { width: 160, height: 80, position: "relative" }, children: [_jsxs("svg", { width: "160", height: "80", viewBox: "0 0 160 80", children: [_jsx("path", { d: "M16 26 H96 L140 40 L96 54 H16 Z", fill: "#cbd5e1", stroke: "#334155", strokeWidth: "3" }), _jsx("path", { d: "M22 30 H96 L130 40 L96 50 H22 Z", fill: "#e2e8f0" })] }), _jsx(Handle, { id: "in", type: "target", position: Position.Left, style: port("#1E90FF", { left: -2, top: 40 }) }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: port("#0EAD69", { right: -2, top: 40 }) })] }));
}
const port = (bg, extra) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...extra,
});
