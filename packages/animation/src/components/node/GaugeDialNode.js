import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
export default function GaugeDialNode({ data }) {
    const value = Number(data?.value ?? 45);
    const min = Number(data?.min ?? 0);
    const max = Number(data?.max ?? 100);
    const pct = Math.max(0, Math.min(1, (value - min) / (max - min || 1)));
    const angle = -120 + 240 * pct;
    return (_jsxs("div", { style: { width: 120, height: 120, position: "relative" }, children: [_jsxs("svg", { width: "120", height: "120", viewBox: "0 0 120 120", children: [_jsx("circle", { cx: "60", cy: "60", r: "54", fill: "#fff", stroke: "#64748b", strokeWidth: "4" }), _jsx("path", { d: "M60 60 L60 16", stroke: "#334155", strokeWidth: "3", transform: `rotate(${angle} 60 60)` }), _jsx("text", { x: "60", y: "90", textAnchor: "middle", fontSize: "14", fill: "#334155", children: value })] }), _jsx(Handle, { id: "in", type: "target", position: Position.Left, style: port("#1E90FF", { left: -2, top: 60 }) }), _jsx(Handle, { id: "out", type: "source", position: Position.Right, style: port("#0EAD69", { right: -2, top: 60 }) })] }));
}
const port = (bg, extra) => ({
    width: 10,
    height: 10,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...extra,
});
