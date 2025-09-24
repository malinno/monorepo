import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function TempSensorNode({ data }) {
    const value = Number(data?.value ?? 25);
    return (_jsxs("div", { style: { width: 120, height: 80, position: "relative" }, children: [_jsxs("svg", { width: "120", height: "80", viewBox: "0 0 120 80", children: [_jsx("rect", { x: "18", y: "18", width: "84", height: "44", rx: "10", fill: "#fff", stroke: "#64748b", strokeWidth: "3" }), _jsx("circle", { cx: "36", cy: "56", r: "10", fill: "#94a3b8", stroke: "#334155" }), _jsx("rect", { x: "34", y: "24", width: "4", height: "28", rx: "2", fill: "#94a3b8" }), _jsxs("text", { x: "70", y: "47", textAnchor: "middle", fontSize: "16", fill: "#334155", children: [value, "\u00B0C"] })] }), _jsx(Handle, { id: "in", type: "target", position: Position.Left, style: port("#1E90FF", { left: -2, top: 40 }) }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: port("#0EAD69", { right: -2, top: 40 }) })] }));
}
const port = (bg, extra) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...extra,
});
