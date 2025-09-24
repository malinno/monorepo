import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Handle, Position } from "@xyflow/react";
import { useFlowSim } from "@/store/useFlowSim";
const handleStyle = (bg, overrides) => ({
    width: 5,
    height: 5,
    borderRadius: 999,
    background: bg,
    border: "2px solid #334155",
    ...overrides,
});
const ROTATION_MAP = {
    E: 0,
    S: 90,
    W: 180,
    N: 270,
};
const getHandleConfig = (orientation) => {
    switch (orientation) {
        case "W":
            return {
                inPos: Position.Right,
                outPos: Position.Left,
                inStyle: handleStyle("#1E90FF", { right: -1, top: "44%", transform: "translate(50%, -50%)" }),
                outStyle: handleStyle("#0EAD69", { left: -1, top: "44%", transform: "translate(-50%, -50%)" }),
            };
        case "N":
            return {
                inPos: Position.Bottom,
                outPos: Position.Top,
                inStyle: handleStyle("#1E90FF", { bottom: 1, left: "50%", transform: "translate(-50%, 50%)" }),
                outStyle: handleStyle("#0EAD69", { top: -12, left: "50%", transform: "translate(-50%, -50%)" }),
            };
        case "S":
            return {
                inPos: Position.Top,
                outPos: Position.Bottom,
                inStyle: handleStyle("#1E90FF", { top: -10, left: "50%", transform: "translate(-50%, -50%)" }),
                outStyle: handleStyle("#0EAD69", { bottom: 2, left: "50%", transform: "translate(-50%, 50%)" }),
            };
        case "E":
        default:
            return {
                inPos: Position.Left,
                outPos: Position.Right,
                inStyle: handleStyle("#1E90FF", { left: 1, top: "45%", transform: "translate(-50%, -50%)" }),
                outStyle: handleStyle("#0EAD69", { right: 1, top: "45%", transform: "translate(50%, -50%)" }),
            };
    }
};
export default function ValveNode(props) {
    const { data, id } = props;
    const orientation = data?.orientation || "E";
    const isOpen = data?.isOpen ?? true;
    const rot = ROTATION_MAP[orientation] ?? 0;
    const { flowingNodes } = useFlowSim();
    const flowing = id ? flowingNodes.has(id) : false;
    const active = isOpen && flowing;
    const { inPos, outPos, inStyle, outStyle } = getHandleConfig(orientation);
    return (_jsxs("div", { style: { width: 120, height: 110, position: "relative" }, children: [_jsxs("svg", { width: "120", height: "96", viewBox: "0 0 120 96", style: { transform: `rotate(${rot}deg)` }, children: [_jsxs("defs", { children: [_jsxs("linearGradient", { id: "valve-body", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#e2e8f0" }), _jsx("stop", { offset: "100%", stopColor: "#cbd5e1" })] }), _jsxs("linearGradient", { id: "valve-neck", x1: "0", y1: "0", x2: "0", y2: "1", children: [_jsx("stop", { offset: "0%", stopColor: "#d1d5db" }), _jsx("stop", { offset: "100%", stopColor: "#9ca3af" })] }), _jsxs("radialGradient", { id: "valve-wheel", cx: "0.5", cy: "0.5", r: "0.5", children: [_jsx("stop", { offset: "0%", stopColor: "#f1f5f9" }), _jsx("stop", { offset: "70%", stopColor: "#cbd5f5" }), _jsx("stop", { offset: "100%", stopColor: "#64748b" })] })] }), _jsxs("g", { stroke: "#0f172a", strokeWidth: "3", fill: "url(#valve-neck)", children: [_jsx("rect", { x: "2", y: "38", width: "22", height: "20", rx: "8" }), _jsx("rect", { x: "96", y: "38", width: "22", height: "20", rx: "8" })] }), _jsxs("g", { children: [_jsx("rect", { x: "26", y: "32", width: "68", height: "32", rx: "12", fill: "url(#valve-body)", stroke: "#475569", strokeWidth: "3" }), _jsx("rect", { x: "38", y: "38", width: "44", height: "20", rx: "8", fill: "#94a3b8", stroke: "#334155", strokeWidth: "2" }), _jsx("rect", { x: "44", y: "40", width: "32", height: "16", rx: "6", fill: active ? "#22c55e" : "#9ca3af", stroke: "#1e293b", strokeWidth: "1.5" })] }), _jsx("rect", { x: "56", y: "16", width: "8", height: "24", rx: "3", fill: "url(#valve-neck)", stroke: "#475569", strokeWidth: "2" }), _jsxs("g", { transform: "translate(60 14)", children: [_jsx("circle", { r: "12", fill: "url(#valve-wheel)", stroke: "#1e293b", strokeWidth: "2" }), _jsx("circle", { r: "5", fill: "#1f2937" }), _jsxs("g", { stroke: "#1e2937", strokeWidth: "1.6", children: [_jsx("line", { x1: "0", y1: "-10", x2: "0", y2: "10" }), _jsx("line", { x1: "-10", y1: "0", x2: "10", y2: "0" }), _jsx("line", { x1: "-7", y1: "-7", x2: "7", y2: "7" }), _jsx("line", { x1: "-7", y1: "7", x2: "7", y2: "-7" })] })] }), _jsxs("g", { fill: "#1e293b", children: [[0, 1, 2, 3].map((i) => (_jsx("circle", { cx: 14, cy: 42 + i * 6, r: 1.6 }, `l-${i}`))), [0, 1, 2, 3].map((i) => (_jsx("circle", { cx: 106, cy: 42 + i * 6, r: 1.6 }, `r-${i}`)))] })] }), _jsx(Handle, { id: "in", type: "target", position: inPos, style: inStyle }), _jsx(Handle, { id: "out", type: "source", position: outPos, style: outStyle })] }));
}
