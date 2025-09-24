import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function FlowMeterNode({ data }) {
    const value = Number(data?.value ?? 0);
    return (_jsxs("div", { style: { width: 140, height: 80, position: "relative" }, children: [_jsxs("svg", { width: "140", height: "80", viewBox: "0 0 140 80", children: [_jsx("rect", { x: "10", y: "22", width: "120", height: "36", rx: "18", fill: "#e5e7eb", stroke: "#64748b", strokeWidth: "3" }), _jsx("text", { x: "70", y: "48", textAnchor: "middle", fontSize: "16", fill: "#334155", children: value })] }), _jsx(Handle, { id: "in", type: "target", position: Position.Left, style: port("#1E90FF", { left: -2, top: 40 }) }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: port("#0EAD69", { right: -2, top: 40 }) })] }));
}
const port = (bg, extra) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...extra,
});
